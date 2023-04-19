import React, { useEffect, useState } from "react";
// import 'bootstrap/dist/css/bootstrap.css';

// import "./App.css";
import * as XLSX from "xlsx";
import axios from "axios";

function App() {

  // const [filePath, setFilePath] = useState("")

  const [items, setItems] = useState([]); //excel sheet data
  const [team, setTeam] = useState(""); 
  const [date, setDate] = useState("");
  const [empList, setEmpList] = useState([]); //all selected employees
  const [isUploaded, setIsUploaded] = useState(false) //wheck wheather the file is uploaded or not
  const [sheets, setSheets] = useState([])
  const [jsonObj, setJsonObj] = useState([]) //json array of selected supervisors
  const [selectedTeam, setSelectedTeam] = useState() 
  const [sheetData, setSheetData] = useState("")
  const [workbook, setWorkbook] = useState({})
  const [excelData,setExcelData] = useState(null)
  const [files, setFiles]= useState({
    sheetID: "",
    sheetName: "",
    sheetData: {

    }
  })
  const [formData, setFormData] = useState( //all data
    {
      date: "",
      team: "",
      jsonObj: [
      
      ]
    })

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    readExcel(file)
    // setFilePath(file.path)
    // localStorage.setItem('filePath', filePath)
    // console.log(filePath)
  }
  


  useEffect(() => {
    const loadfile = async (e) => {

      const res = await axios.get('/reload');
      setWorkbook(res.data)
      setSheets(res.data.SheetNames)
      console.log(res)
    }

    loadfile(); 
    setFormData(formData => ({ ...formData, date: date, team: team }))
   
  }, [date, team]);

  
  //select handler for groups
  // const options = ['Team-01', 'Team-02', 'Team-03', 'Team-04', 'Team-05', 'General', 'Sample Cutting', 'Sample Warehouse', 'Quality Assurance', 'Mechanic'];
  const options = sheets;

  const onOptionChangeHandler = (event) => {
    setTeam(event.target.value) //sets the team
    setSelectedTeam(event.target.selectedIndex-1)
    let number = event.target.selectedIndex-1
    showData(number)
    console.log(number)
    // readSheet(selectedTeam)
    // setSelectedTeam(0)
  }

  //checks the checked check boxes and unchecked check boxes. If checked, the checked data row will be added to the array "empList" 
  const UpdateEmployees = (e) => {

    console.log(e.target.value)

    if (e.target.checked) {
      setEmpList((oldArray) => [...oldArray, e.target.value]);
    } else {
      removeEmployee(e); //calling remove employee function
      console.log(empList)
    }
  }

  //removes data from the emplist array when unchecked a checkbox
  const removeEmployee = (e) => {
    setEmpList([...empList.filter((d) => d !== e.target.value)])
  }

  //Read excel file content and convert it into a json object
  //After converting, it will assigned to "items"
  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      alert("Successfully Uploaded!")

      fileReader.onload = (e) => {

        setIsUploaded(true)
        const importRange = "A9:O60";
        const headers = ["Employee", "EPF", "Gender", "CallingName", " ", "From", "To", "Transport", "", "", "", "", "", "", "Remarks"];
        const bufferArray = e.target.result;
        const wb = XLSX.read(workbook, { type: "buffer" });
        setSheets(wb.SheetNames)
        console.log(wb.SheetNames.length);
        const l = wb.SheetNames.length;
        for(let i = 0; i < l; i++){
          const ws = wb.Sheets[wb.SheetNames[i]];
          const data = XLSX.utils.sheet_to_json(ws, { range: importRange, header: headers });
          let fObj = {
            "sheetID": i,
            "sheetName": wb.SheetNames[i],
            "sheetData": data 
        };
          
          // resolve(file[i]);
          files[i] = fObj;
        
        }

        console.log(files)
        localStorage.setItem('files', files)
        resolve(files);

      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      setItems(d);
      console.log(d)
    });
  };

  const showData = (number) => {
    // setSheetData(items[number].sheetData)
    console.log(number)
    let name = sheets[number]
    console.log(name)
    const importRange = "A9:O60";
    const headers = ["Employee", "EPF", "Gender", "CallingName", " ", "From", "To", "Transport", "", "", "", "", "", "", "Remarks"];
       
    console.log(workbook.Sheets[name])
    // const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[name], {header:1})
    const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[name], { range: importRange, header: headers });

    console.log(jsonData)
    setExcelData(jsonData)
    
  }

  const SubmitList = async (event) => {
    event.preventDefault();
    console.log("step1");
    for (let i = 0; i < empList.length; i++) {
      var myArray = empList[i].split(',');
      console.log(myArray)
      let obj = {
        "Employee": myArray[1],
        "EPF": myArray[3],
        "Gender": myArray[5],
        "CallingName": myArray[7],
        "From": myArray[9],
        "To": myArray[11],
        "Transport": myArray[13],
        "Remarks": myArray[17]
      }
      console.log(i, ":", empList.length);
      console.log("step2");
      //setJsonObj((oldArray) => [...oldArray, obj]);
      jsonObj[i] = obj;
      console.log(jsonObj);

      if (i === empList.length-1) {
        //setFormData(formData => ({ ...formData, date: date, team: team, jsonObj: jsonObj }));
        let objform = {
          date: date, team: team, jsonObj: jsonObj
        }
        formData[0] = objform;
        console.log(objform);
        // console.log("step3");

        const dataa = JSON.stringify(formData)
        if (dataa.jsonObj !== null) {
          // console.log("step4");
          console.log(dataa);
          //await axios.post("https://prod-45.southeastasia.logic.azure.com:443/workflows/543c2338f6bb45a88578d57562140705/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=5snvi_lEWw3EjVQ5gFqrOTnJGDip2lsubI7ehzvt8FE", dataa, {
            // await axios.post("https://prod-55.southeastasia.logic.azure.com:443/workflows/aba333f046854b8a88be860a92ce2bf4/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=BibWxr2jsnwSE6hkqwLIPezxqWrvMha-7C8oxEVnobI", dataa, {
            await axios.post("/create", objform, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then((response) => {
              console.log("step5");
              alert("Successfully submitted!")
              setIsUploaded(false)
              console.log(response);
              window.location.reload(true)
            });
        }
      }
    }


  };

  return (
    <div className="App">

      {/* {excelData && (
        <table>
          <tbody>
            {excelData.map((row, rowIndex) =>(
              <tr key={rowIndex}>
                {row.map((cell,cellIndex) => (
                  <td>{cell}</td>
                ))}
              </tr>
            )
            )}
          </tbody>
        </table>
      )} */}

      <div>
        <button style={{backgroundColor:"#0b59d6", color:"white", width:"120px", height:"35px",borderRadius:"10px", fontSize:"16px", marginTop:"2rem",cursor:'pointer'}} onClick={(e)=>{window.location.href ="/login"}}>Admin Login</button>
        {/* Following div will only visible to users after excel sheet selected, date selected, and group selected */}
        {/* console.log(formData) */}
        {date !== '' && team !== '' ? (
          <div>
            <form onSubmit={SubmitList}>
            <div style={{backgroundColor:"green", color:"white", height:"5rem", textAlign:"center", verticalAlign:"center"}}>
              <h1 style={{marginTop:"1rem",paddingTop:"1rem"}}>Daily OT & Transport Approval Request Form</h1>
              {/* <button style={{backgroundColor:"#0b59d6", color:"white", width:"90px", height:"35px",borderRadius:"10px", fontSize:"16px", marginTop:"-8rem",cursor:'pointer'}} onClick={(e)=>{window.location.href ="/login"}}>Admin Login</button> */}
            </div>
            <button className="btn btn-danger btn-lg" style={{marginLeft:"-60rem", marginTop:"5rem", backgroundColor:"red", color:"white", width:"120px", height:"35px",borderRadius:"10px", fontSize:"16px", marginTop:"2rem",cursor:'pointer'}} onClick={(e) =>{setIsUploaded(false);window.location.reload(true)}}>Back</button>
              <h4 style={{marginTop:"1rem"}}>Date: {date}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Team: {team}</h4>
              <h5 style={{marginTop:"2rem",border:"red 2px solid",paddingTop:"8px", paddingBottom:"8px"}} className="h4">පහත සඳහන් කාල සීමාව තුලදී අතිකාල සේවයේ යෙදීමට අපගේ කැමැත්ත ප්‍රකාශ කර සිටිමු. </h5>
              <table  style={{marginTop:"2rem"}} className="table">
                <thead>
                  <tr style={{fontFamily:"sans-serif",fontSize:"18px"}}>
                    <th scope="col">Employee#</th>
                    <th scope="col">EPF#</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Calling Name</th>
                    <th scope="col">From</th>
                    <th scope="col">To</th>
                    <th scope="col">Transport</th>
                    <th scope="col">Remarks</th>
                    <th scope="col">Agree</th>
                  </tr>
                </thead>
                <tbody>
                {/* Maps employee data that comes from Items(Excelsheet data) */}
                {excelData.map((d) => {

                  return (
                    <tr key={d.Employee}>
                      <td>{d.Employee}</td>
                      <td>{d.EPF}</td>
                      <td>{d.Gender}</td>
                      <td>{d.CallingName}</td>
                      <td>{d.From}</td>
                      <td>{d.To}</td>
                      <td>{d.Transport}</td>
                      <td>{d.Remarks}</td>
                      <td><input type="checkbox"
                        className="form-check-input"
                        name="employees"
                        // value={{"Employee" : d.Employee, "EPF" : d.EPF}}
                        value={[...Object.entries(d)]}
                        onChange={(e) => { UpdateEmployees(e) }}
                      />
                      </td>
                    </tr>
                  )
                }
                )}
                
                </tbody>
              </table>
              <button id="SubmitBtn" type="submit" className="btn btn-success btn-lg" style={{width:"180px",height:"50px",marginBottom:"20px",backgroundColor:"green", color:"white", width:"120px", height:"35px",borderRadius:"10px", fontSize:"16px", marginTop:"2rem",cursor:'pointer'}}>Submit</button>
            </form>
          </div>
        ) : (
          // Following part will visible to users initially
          <div>
            <div style={{backgroundColor:"green", color:"white", height:"5rem", textAlign:"center", verticalAlign:"center"}}>
              <h1 style={{marginTop:"3rem",paddingTop:"1rem"}}>Daily OT & Transport Approval Request Form</h1>
            </div>
            <div className="row justify-content-md-center" style={{marginLeft:"30%",marginTop:"5rem"}}>
              {/* upload file */}
              <div className="row mb-3">
                <label className="col-sm-2 col-form-label" style={{textAlign:"left"}}>Upload Excel File: </label>
                {/* <div className="col-sm-10">
                  <input
                    className="form-control input-small"
                    style={{width:"300px"}} 
                    type="file"
                    onChange= {
                      handleFileChange
                      // const file = e.target.files[0];
                      // readExcel(file);
                    }
                  />
                </div> */}
              </div>
              <div className="row mb-3">
              {/* select date */}
                <label className="col-sm-2 col-form-label" style={{textAlign:"left"}}>Enter Date: </label>
                <div className="col-sm-10">
                  <input
                    className="form-control input-small"
                    style={{width:"300px"}} 
                    type="date"
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
              </div>

              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

              {/* select group */}
              <div className="row mb-3">
                <label className="col-sm-2 col-form-label" style={{textAlign:"left"}}>Select Group : </label>
                <div className="col-sm-10">
                  <select className="form-control input-small" style={{width:"300px"}} id="specificSizeSelect" aria-label="Default select example" onChange={onOptionChangeHandler}>
                    <option>Please choose one option</option>
                    {options.map((option, index) => {
                      return <option key={index} >
                        {option}
                      </option>
                    })}
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
