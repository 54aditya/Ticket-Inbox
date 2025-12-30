import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import API from "../api/axios";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [err, setErr] = useState("");

  const submit = async e => {
    e.preventDefault();
    try{
    const res = await API.post("/auth/login", { email, password });

    login(res.data.user, res.data.token);

    navigate("/tickets");
    }
    catch(err){
    setErr("Login Failed, Try again");
    }
  };

  return (
    <form onSubmit={submit}>
        <h2>Login</h2>
        {err && <p style={{ color: "red" }}>{err}</p>}
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />

      <div style={{ position:"relative" }}>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
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

      <button>Login</button>
      <div className="nav-links">
      <Link to="/register">Create New Account</Link>
      </div>
    </form>
  );
}
