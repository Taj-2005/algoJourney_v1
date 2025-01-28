import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { browserLocalPersistence } from "firebase/auth";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
        await signOut(auth); // Logs the user out using Firebase
        localStorage.removeItem('rememberedUser'); // Remove remembered user
        sessionStorage.removeItem('rememberedUser'); // Optional: Remove session storage
        navigate('/Login'); // Redirect to login page
    } catch (error) {
        console.error('Error logging out:', error);
    }
};


  return <button className="logout" onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
