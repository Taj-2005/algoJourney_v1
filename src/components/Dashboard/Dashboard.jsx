import React, { useEffect, useState } from 'react';
import Concepts from '../Concepts/Concepts';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import AdminHeader from '../AdminHeader/AdminHeader'; // Import the Admin Header

function Dashboard() {
  const [userEmail, setUserEmail] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUserEmail(currentUser.email);
    }
  }, []);

  return (
    <>
      {userEmail === "admin@gmail.com" ? <AdminHeader /> : <Header />}
      <hr />
      <Concepts />
    </>
  );
}

export default Dashboard;
