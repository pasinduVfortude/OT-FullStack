import React, { useState } from 'react';
import axios from 'axios';

interface Props {
    onSubmit: (email: string, password: string) => void;
}

const Login: React.FC<Props> = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [succesMsg, setSuccesMsg] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axios.post('/login', { email, password }).then(response => {
            console.log(response.status)
            console.log(response.data)
            // alert(response.data.token)
            alert("Login success!")
            localStorage.setItem('token', response.data.token);
            console.log(response.statusText)
            if(response.status === 200){
                setSuccesMsg("Logged in succesfully");
                console.log(response.data.accesslevel);
                    if(response.data.accesslevel == 3){
                        window.location.href ="/admin";
                    }else if(response.data.accesslevel == 1){
                        window.location.href = "/approvegm"
                    }else if(response.data.accesslevel == 2){
                        window.location.href = "/administration"
                    }else if(response.data.accesslevel == 10){
                        window.location.href = "/register"
                    }
                
                setError("")
            }
            // else if(response.data){
            //     setSuccesMsg("Invalid credentials")
            // }
        //     if(response.data.status === 200){
        //         setSuccesMsg("You have been logged in successfully")
        //         props.onSubmit(email, password);
        //     }else if(response.data.error === 'Both email and password required'){
        //         setError("Both email and password are required")
        //     }else if(response.data.error === 'Invalid Credentials'){
        //         setError("Invalid Credentials")
        //     }
        }).catch(error => {
            setError("Login Failed")
        })
    }
    
    return (
        <div style={{border:"2px solid white", borderRadius:"50px", width:"40%", height:"20rem",boxShadow:"black",backgroundColor:"gray", margin:"10rem auto", paddingTop:"50px"}}>
            <h3>Login</h3>
        <form onSubmit={handleSubmit}>
            <table style={{margin:"0 auto"}}>
                <tr>
                    <td>
                        <label style={{fontSize:"20px"}}>Username</label>
                    </td>
                    <td>:</td>
                    <td>
                        <input type="email" required value={email} onChange={e => setEmail(e.target.value)} style={{height:"20px",borderRadius:"5px"}}/>
                    </td>
                </tr>
                <tr>
                    <td style={{paddingTop:"20px"}}>
                        <label style={{fontSize:"20px"}}>Password</label>
                    </td>
                    <td style={{paddingTop:"20px"}}>:</td>
                    <td style={{paddingTop:"20px"}}>
                        <input type="password" required value={password} onChange={e => setPassword(e.target.value)} style={{height:"20px",borderRadius:"5px"}}/>
                    </td>
                </tr>
            </table>

        <br/>            
            <button type="submit" style={{backgroundColor:"#0b59d6", color:"white", width:"90px", height:"35px",borderRadius:"10px", fontSize:"16px", marginTop:"-8rem",cursor:'pointer'}}>Login</button>

<p style={{fontSize:"10px", color:"green"}}>{succesMsg}{error && <p style={{fontSize:"10px", color:"red"}}>{error}</p>}</p>
        </form>
        </div>
    );
    
};

export default Login;
