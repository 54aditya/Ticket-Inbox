import { useState } from "react";
import { registerApi } from "../api/auth.api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {
  const nav = useNavigate();
  const [data, setData] = useState({ name:"", email:"", password:"" });
  const [err, setErr] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await registerApi(data);
      nav("/login");
    } catch {
      setErr("Registration failed");
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Register</h2>
      {err && <p style={{ color: "red" }}>{err}</p>}
      <input placeholder="Name"
        onChange={(e)=>setData({...data,name:e.target.value})}/>
      <input placeholder="Email"
        onChange={(e)=>setData({...data,email:e.target.value})}/>

      <div style={{ position:"relative" }}>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          onChange={(e)=>setData({...data,password:e.target.value})}
          style={{ width:"100%", paddingRight:"40px" }}
        />
        <span
          onClick={()=>setShowPassword(!showPassword)}
          style={{
            position:"absolute",
            right:"10px",
            top:"50%",
            transform:"translateY(-50%)",
            cursor:"pointer"
          }}
        >
          {showPassword ? <FaEyeSlash/> : <FaEye/>}
        </span>
      </div>

      <button>Register</button>
      <div className="nav-links">
      <Link to="/login">Login</Link>
      </div>
    </form>
  );
}
