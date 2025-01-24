import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import algo from '../Assets/dsa.jpg';

function UserDetailsForm() {
  const [formData, setFormData] = useState({
    name: '',
    enrollmentNumber: '',
    section: '',
    mobileNumber: '',
    collegeEmail: '', // New field for college email
  });
  const [isLoading, setIsLoading] = useState(true);
  const [emailError, setEmailError] = useState(''); // To handle email validation errors
  const navigate = useNavigate();

  const auth = getAuth();
  const db = getFirestore();
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    if (!userId) {
      console.error('User is not authenticated.');
      return;
    }

    // Check if user data already exists
    const checkUserData = async () => {
      try {
        const userDocRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          // User data exists, redirect to dashboard
          navigate('/Dashboard');
        } else {
          setIsLoading(false); // Show form if data doesn't exist
        }
      } catch (error) {
        console.error('Error checking user data:', error);
      }
    };

    checkUserData();
  }, [db, userId, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Validate the college email after submitting the form
  const validateEmail = (email) => {
    const validEmailPattern =
      /(@nst.rishihood.edu.in|@Newtonschool.Co)$/; // Check if email contains valid domain
    return validEmailPattern.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return;

    // Validate email before submitting the form
    if (!validateEmail(formData.collegeEmail)) {
      alert('You are not authorized to access this website.');
      return; // Don't submit if email is invalid
    }

    const userDocRef = doc(db, 'users', userId);

    try {
      await setDoc(userDocRef, formData);
      alert('Data saved successfully!');
      navigate('/Dashboard');
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>    
    <Header/>
    <div className="mainOnce">
            <div>
                <img className="imageOnce" src={algo} alt=""></img>
            </div>
        <div className="containerOnce">
            <div className="text">User Details Form</div>
            <div className='underline user'></div>
            <form className="inputs" onSubmit={handleSubmit}>
                <div className="input">
                    <input className="credentials" type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Full name" required/>
                </div>
                <div className="input">
                    <input className="credentials" type="number" name="enrollmentNumber" value={formData.enrollmentNumber} onChange={handleInputChange} placeholder='Enrollment number' required/>
                </div>
                <div className="input">
                    <input className="credentials" type="text" name="section" value={formData.section} onChange={handleInputChange} placeholder='Section' maxLength={1} required />
                </div>
                <div className="input">
                    <input className="credentials" type="tel" name="mobileNumber" value={formData.mobileNumber} onChange={handleInputChange} placeholder='Mobile number' maxLength={10} required/>
                </div>
                <div className="input">
                    <div>
                        <input className="credentials" type="email" name="collegeEmail" value={formData.collegeEmail} onChange={handleInputChange} placeholder='College Email ID' required/>
                    </div>
                {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
                </div>
                <button className="submit" type="submit">Submit</button>
            </form>
        </div>
    </div>
    </>

  );
}

export default UserDetailsForm;
