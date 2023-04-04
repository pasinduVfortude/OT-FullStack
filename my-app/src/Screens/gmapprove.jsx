import React, { useEffect, useState } from "react";
import axios from "axios";
import Login from "./login";
// import 'bootstrap/dist/css/bootstrap.css';

// import "./App.css";

function GMapprove() {

  const [data, setData] = useState([]);
  const token = localStorage.getItem('token');


  useEffect(() => {
    const loadData = async (e) => {
      const token = localStorage.getItem('token')
      var today = new Date();
      const y = today.getFullYear();
      const m = (today.getMonth() + 1).toString().padStart(2, '0');
      const d = today.getDate();
      const date = (y + "-" + m + "-" +d)
      const res = await axios.post('/view', {date}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }  
      }).catch((error) => {
        if (error.response.status === 401) {
          alert("Invalid login, please login again.");
        } else {
          console.error(error);
        }
      });
      setData(res.data)
      console.log(res)

    }

    loadData(); 
    // setFormData(formData => ({ ...formData, date: date, team: team }))
   
  }, []);

  const SubmitApprove = async (event) => {
    event.preventDefault();
    var today = new Date();
          const y = today.getFullYear();
          const m = (today.getMonth() + 1).toString().padStart(2, '0');
          const d = today.getDate();
          const date = (y + "-" + m + "-" +d)
          alert(date)

    // alert('triggered')
    await axios.put("/gmapprove", {date}, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token
            }
          })
            .then((response) => {
              alert("Successfully approved!")
              console.log(response);
              window.location.reload(true)
            })
            .catch((error) => {
              if (error.response.status === 401) {
                alert("Invalid token, please login again.");
                // redirect the user to the login page or perform any other action as needed
              } else {
                console.error(error);
              }
            });
        }

        if (!token) {
          return (
            <div className="App">
              <h3>Please login to access this page.</h3>
              <Login/>
            </div>
          );
        }

  return (
    <div className="App">

      <div>
        
      {data.map((item) => (
        <div key={item._id}>
          {/* <h3>Date : {item.date}</h3> */}
          <h2>General Manager Approval</h2>
          <h4>
            Date: {item.date} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            Team: {item.team} &nbsp;&nbsp;&nbsp;&nbsp;
            HOD: &nbsp;&nbsp;&nbsp;&nbsp;
            <button style={{ color:"white",backgroundColor: item.HOD ? 'green' : 'red' }}>
              {item.HOD ? 'Approved' : 'Not Approved'}
            </button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            GM: &nbsp;&nbsp;&nbsp;&nbsp;
            <button style={{ color:"white",backgroundColor: item.GM ? 'green' : 'red' }}>
              {item.GM ? 'Approved' : 'Not Approved'}
            </button>
          </h4>
          <table style={{margin:"0 auto"}}>
            <thead>
              <th>Employee</th>
              <th>EPF</th>
              <th>Gender</th>
              <th>CallingName</th>
              <th>From</th>
              <th>To</th>
              <th>Transport</th>
              {/* <th>Remarks</th> */}
            </thead>
            {item.employees.map((employee) => (
              <tr key={employee.Employee}>
                <td>{employee.Employee}</td>
                <td>{employee.EPF}</td>
                <td>{employee.Gender}</td>
                <td>{employee.CallingName}</td>
                <td>{employee.From}</td>
                <td>{employee.To}</td>
                <td>{employee.Transport}</td>
                {/* <td>{employee.Remarks}</td> */}
              </tr>
            ))}
          </table>
        </div>
      ))}
         <button style={{marginTop:"30px", borderColor:"darkgreen", color:"white", backgroundColor: "green", width:"100px", height:"40px"}} onClick={SubmitApprove}>Approve</button>
      </div>
    </div>
  );
}

export default GMapprove;
