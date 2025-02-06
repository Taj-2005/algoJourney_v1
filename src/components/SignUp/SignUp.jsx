import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig.js";
import mail from '../Assets/email2.png';
import pass from '../Assets/password.png';
import padlock from '../Assets/padlock.png';
import algo from '../Assets/dsa.jpeg';

  function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
  
    const handleSignUp = async (e) => {
      e.preventDefault();
      setError(""); // Clear previous errors
  
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
  
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Account created successfully!");
        navigate("/Login"); // Redirect to login page after successful sign-up
      } catch (err) {
        setError(err.message);
      }
    };

  return (
    <>
    <div className="alignment">
    <h1 className='h1'><a href='https://algojourney-dsa-nst.vercel.app/'>algoJourney</a></h1>
      <p>
        Already have an account?{" "}
        <span className="already" onClick={() => navigate("/Login")}>
          Log in
        </span>
      </p>
    </div>
    <hr></hr>
    <div className="main">
        <div>
          <img className="image" src={algo} alt=""></img>
        </div>
        <div className="container">
          <div className="text">Sign Up</div>
          <div className="underline"></div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form className="inputs" onSubmit={handleSignUp}>
            <div className="input">
                <img className="icons" src={mail} alt=""></img>
                <input className="credentials" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            </div>
            <div className="input">
                <img className="icons" src={pass} alt=""></img>
                <input className="credentials" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            </div>
            <div className="input">
                <img className="icons" src={padlock} alt=""></img>
                <input className="credentials" type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
            </div>
            <button className="submit" type="submit">Sign Up</button>
          </form>
        </div>
    </div>
    </>

  );
}

export default SignUp;
