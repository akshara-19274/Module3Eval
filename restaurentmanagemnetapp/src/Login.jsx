import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';
export default function Login(){
    const {login}=useAuth();
    const navigate=useNavigate();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const res=login(email,password);
        if (!res.ok) return;
        if (res.role==="admin"){
            navigate("/admin/dashboard");
        } else {
            navigate("/customers/dashboard");
        }
    };
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
                <br />
                <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}