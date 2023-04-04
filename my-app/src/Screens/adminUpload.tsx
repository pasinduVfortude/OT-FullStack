import React, { useState } from 'react';
import axios from 'axios';

const AdminUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post('/upload', formData
        // , {
        //   headers: {
        //     'Content-Type': 'application/json'
        //     // 'Authorization': token
        //   }
        // }
        );
        console.log(response.data);
        alert("Uploaded!")
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  // const handleApprovebtn = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   window.location.href ="/admin"; 
  // }

  return (
    <div>
      <label><b>Click here to approve OT Requests: </b></label>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <button style={{marginTop:"100px", borderColor:"darkblue", color:"white", backgroundColor: "blue", width:"120px", height:"50px"}} onClick={(e:any) => {
        window.location.href ="/approvehod";
      }}>Approve</button>
      <br/><br/><br/><br/>
      <p><b>Upload ecxel file : </b></p>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit" style={{marginTop:"30px", borderColor:"darkgreen", color:"white", backgroundColor: "green", width:"100px", height:"40px"}}>Upload</button>
      </form>
    </div>
  );
};

export default AdminUpload;
