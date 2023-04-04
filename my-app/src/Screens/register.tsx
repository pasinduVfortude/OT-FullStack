import React, { useState } from 'react';
import axios from 'axios';

interface Props {
    onSubmit: (email: string, password: string, accesslevel: number) => void;
}

const Login: React.FC<Props> = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [accesslevel, setAccessLevel] = useState(1);
    const [error, setError] = useState("");
    const [succesMsg, setSuccesMsg] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(accesslevel)
        axios.post('/register', { email, password,accesslevel }).then(response => {
            console.log(response.status)
            console.log(response.data)
            console.log(response.statusText)
            console.log(response.statusText)
            if(response.status === 200){
                setSuccesMsg("Succesfully Registered!")
                alert("Created successfully")
                window.location.reload();
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
        <div style={{border:"2px solid white", borderRadius:"50px", width:"36%", height:"20rem",boxShadow:"black",backgroundColor:"gray", margin:"50px auto"}}>
            <h3>Register</h3>
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
                <tr>
                    <td style={{paddingTop:"20px"}}>
                        <label style={{fontSize:"20px"}}>Accesslevel</label>
                    </td>
                    <td style={{paddingTop:"20px"}}>:</td>
                    <td style={{paddingTop:"20px"}}>
                    <label>
                      <input type="radio" name="accessLevel" value="3" onChange={e => setAccessLevel(parseInt(e.target.value))} />
                      HOD
                    </label>
                    <label>
                      <input type="radio" name="accessLevel" value="1" onChange={e => setAccessLevel(parseInt(e.target.value))} />
                      GM
                    </label> 
                    <label>
                      <input type="radio" name="accessLevel" value="2" onChange={e => setAccessLevel(parseInt(e.target.value))} />
                      Admin
                    </label>                 
                    </td>
                </tr>
            </table>

        <br/>            
            <button type="submit" style={{backgroundColor:"#0b59d6", color:"white", width:"90px", height:"35px",borderRadius:"10px", fontSize:"16px", marginTop:"-8rem",cursor:'pointer'}}>Register</button>

        <p style={{fontSize:"10px", color:"green"}}>{succesMsg}{error && <p style={{fontSize:"10px", color:"red"}}>{error}</p>}</p>
        </form>
        </div>
    );
    
};

export default Login;
