import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route,} from 'react-router-dom';
import Login from './Screens/login';
import Register from './Screens/register';
import AdminUpload from './Screens/adminUpload';
import Form from './Screens/otForm';
import HODapprove from './Screens/hodApprove';
import GMapprove from './Screens/gmapprove';
import Administration from './Screens/administration';




function App() {
  const handleSubmit = (email: string, password: string) => {
    console.log(email, password);
}

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Form/>}></Route>
          <Route path='/login' element={<Login onSubmit={function (email: string, password: string): void {
            throw new Error('Function not implemented.');
          } } />}/>
          <Route path='/register' element={<Register onSubmit= {function (email: string, password: string): void {
            throw new Error('Function not implemented.');
          }} />}/>
          <Route path='/admin' element={<AdminUpload />}/>
          <Route path='/approvehod' element={<HODapprove />}/>
          <Route path='/approvegm' element={<GMapprove />}/>
          <Route path='/administration' element={<Administration />}/>


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
