import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import mail from '../Assets/email2.png';
import pass from '../Assets/password.png';
import algo from '../Assets/dsa.jpeg';
import { responsiveFontSizes } from "@mui/material";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
      // Check if user is already logged in
      const rememberedUser = localStorage.getItem("rememberedUser");
      if (rememberedUser) {
          navigate("/Dashboard"); // Redirect to Dashboard
      }
  }, [navigate]);

  const handleLogin = async (e) => {
      e.preventDefault();
      setError("");

      try {
          await signInWithEmailAndPassword(auth, email, password);
          alert("Logged in successfully!");

          if (rememberMe) {
              // Save user login status in local storage
              localStorage.setItem("rememberedUser", email);
          }

          navigate("/Dashboard"); // Redirect to Dashboard
      } catch (err) {
          setError(err.message);
      }
  };

  useEffect(() => {
    const checkUserStatus = async () => {
        const rememberedUser = localStorage.getItem("rememberedUser");
        if (rememberedUser) {
            // If there's a remembered user, skip the login page
            navigate("/Dashboard");
        }
        // Optionally check if Firebase user is authenticated
        const user = auth.currentUser;
        if (user) {
            navigate("/Dashboard");
        }
    };
    checkUserStatus();
}, [navigate]);


  return (
    <>
        <div className="alignment">
        {/* <img src="" alt=""></img> */}
        <h1 className='h1'><a href='https://algojourney-dsa-nst.vercel.app/'>AlgoJourney</a></h1>
        <p>
            Don’t have an account?{" "}<br></br>
            <span className="already" onClick={() => navigate("/Signup")}>
                Create one
            </span>
        </p>
        </div>
        <hr></hr>
        <div className="main">
            <div className="container">
            <div className="text">Log In</div>
            <div className="underline"></div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form className="inputs" onSubmit={handleLogin}>
                <div className="input">
                <img className="icons" src={mail} alt=""></img>
                <input className="credentials" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div  className="input">
                <img className="icons" src={pass} alt=""></img>
                <input className="credentials" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="remember">
                    <input type="checkbox" id="rememberMe" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}/>
                    <label htmlFor="rememberMe">Remember Me</label>
                </div>
                <button className="submit" type="submit">Login</button>
            </form>
            <div>
                <h3 style={{padding : "1rem"}}>Demo Credentials</h3>
                <p style={{fontSize : "0.7rem",textAlign : "center"}}>Email     : demo@gmail.com</p>
                <p style={{fontSize : "0.7rem",textAlign : "center",marginLeft: "-0.4rem"}}>Password : demo@1234</p>

            </div>
            </div>
            <div>
                <img className="image" src={algo} alt=""></img>
            </div>
        </div>
    </>
  );
}

export default Login;
