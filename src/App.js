import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Dashboard from './components/Dashboard/Dashboard';
import ProfileForm from './components/ProfileForm/ProfileForm';
import PrefixSum from './components/Topics/PrefixSum/PrefixSum';
import TwoPointers from './components/Topics/TwoPointers/TwoPointers';
import Arrays2D from './components/Topics/Arrays2D/Arrays2D';
import BinarySearch from './components/Topics/BinarySearch/BinarySearch';
import Recursion from './components/Topics/Recursion/Recursion';
import AdminPage from './components/AdminPage/AdminPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebaseConfig';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

function App() {
  const [user, setUser] = useState(null);
  const [isUserDataPresent, setIsUserDataPresent] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const db = getFirestore();
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setIsUserDataPresent(true); // User data exists
        } else {
          setIsUserDataPresent(false); // User data does not exist
        }
      }
      setIsLoading(false); // Loading complete
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  if (isLoading) {
    return <p>Loading...</p>; // Show a loading state while user data is being checked
  }

  return (
      <Routes>
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/PrefixSum" element={<PrefixSum />} />
        <Route path="/TwoPointers" element={<TwoPointers />} />
        <Route path="/Arrays2D" element={<Arrays2D />} />
        <Route path="/BinarySearch" element={<BinarySearch />} />
        <Route path="/Recursion" element={<Recursion />} />
        <Route path="/AdminPage" element={<AdminPage />} />
        <Route
          path="/Dashboard"
          element={
            user ? (
              isUserDataPresent ? (
                <Dashboard />
              ) : (
                <ProfileForm />
              )
            ) : (
              <Navigate to="/Login" replace />
            )
          }
        />
        {/* Redirect to Login if an invalid path is accessed */}
        <Route path="*" element={<Navigate to="/Login" replace />} />
      </Routes>
  );
}

export default App;