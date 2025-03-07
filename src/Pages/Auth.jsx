import React, { useState } from "react";
import "../app.css";
import { useNavigate } from "react-router-dom";
import { login, userRegisteration } from "../services/allApis";
import { toast } from "react-toastify";

function AuthPage() {
  const [isRegister, setIsRegister] = useState(true);
  const navigate = useNavigate();

  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
    certifications: [] // Stores file objects
  });

  const toggleForm = () => setIsRegister(!isRegister);

  // Handle certification upload
  const handleCertificationUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const skillName = prompt("Enter the skill name for these certifications:");
      if (skillName) {
        setData((prev) => ({
          ...prev,
          certifications: [...prev.certifications, ...files.map(file => ({ skillName, file }))]
        }));
      } else {
        toast.warning("Certification upload cancelled.");
      }
    }
    e.target.value = ""; // Reset file input
  };

  const handleRegister = async () => {
    const { userName, password, email, certifications } = data;
    if (!userName || !password || !email) {
      toast.warning("Please fill all fields.");
      return;
    }

    if (certifications.length === 0) {
      toast.warning("Please upload at least one certification.");
      return;
    }

    const header = {
      "Content-type": "multipart/form-data",
      Authorization: `Token ${sessionStorage.getItem("token")}`,
    };

    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("password", password);

    certifications.forEach((cert, index) => {
      formData.append(`certifications_skillName_${index}`, cert.skillName);
      formData.append("certifications", cert.file); // Matches backend field name
    });

    try {
      const res = await userRegisteration(formData, header);
      if (res.status === 201) {
        toast.success("Registration successful");
        setData({ userName: "", email: "", password: "", certifications: [] });
        setIsRegister(false); // Switch to login form
      } else {
        toast.warning(res.response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error during registration.");
    }
  };

  const handleLogin = async () => {
    const { email, password } = data;
    if (!email || !password) {
      toast.warning("Enter valid credentials");
      return;
    }

    try {
      const res = await login(data);
      if (res.status === 200) {
        if (res.data.status === "pending" &&res.data.role=="user") {
          toast.warning("Your account is not verified yet. Please wait for approval.");
          return;
        }

        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("userId", res.data._id);
        sessionStorage.setItem("uname", res.data.userName);
        sessionStorage.setItem("ph", res.data.phone);
        sessionStorage.setItem("mail", res.data.email);

        toast.success("Login successful");
        navigate(res.data.role === "admin" ? "/AdmnDashboard" : "/user/dash");
      } else {
        toast.warning("Invalid email or password");
      }
    } catch (error) {
      console.error(error);
      toast.error("Login failed.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isRegister ? "Register" : "Login"}</h2>

        {isRegister ? (
          <div className="auth-form">
            <input type="text" placeholder="Username" value={data.userName} onChange={(e) => setData({ ...data, userName: e.target.value })} required />
            <input type="email" placeholder="Email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} required />
            <input type="password" placeholder="Password" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} required />

            <label htmlFor="files">Upload Skill Certifications</label>
            <input id="files" className="auth-form " type="file" multiple onChange={handleCertificationUpload} required />

            <ul>
              {data.certifications.map((cert, index) => (
                <li key={index}>{cert.skillName} - {cert.file.name}</li>
              ))}
            </ul>

            <button className="auth-button" onClick={handleRegister}>Register</button>
          </div>
        ) : (
          <div className="auth-form">
            <input type="email" placeholder="Email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} required />
            <input type="password" placeholder="Password" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} required />
            <button onClick={handleLogin} className="auth-button">Login</button>
          </div>
        )}

        <p onClick={toggleForm} className="toggle-text">
          {isRegister ? "Already have an account? Login" : "Don't have an account? Register"}
        </p>
      </div>
    </div>
  );
}

export default AuthPage;
