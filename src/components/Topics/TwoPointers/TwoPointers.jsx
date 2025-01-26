import React, { useState, useEffect } from 'react';
import Header from '../../Header/Header';
import {
  getFirestore,
  collection,
  onSnapshot,
  doc,
  setDoc,
  getDoc,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

function TwoPointers() {
  const [questions, setQuestions] = useState([]);
  const [checkedQuestions, setCheckedQuestions] = useState({});
  const [section, setSection] = useState('');
  const [userName, setUserName] = useState('');
  const [enrollmentNumber, setEnrollmentNumber] = useState('');
  const auth = getAuth();
  const db = getFirestore();
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questionsCollection = collection(db, 'twoPointers');
        const unsubscribe = onSnapshot(questionsCollection, (snapshot) => {
          if (snapshot.empty) {
            console.log('No questions found in the Firestore collection.');
          } else {
            const questionData = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            console.log('Fetched questions:', questionData);
            setQuestions(questionData);
          }
        });

        return unsubscribe;
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    const fetchUserCheckedQuestions = async () => {
      if (!userId) return;

      try {
        const userDocRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const { name, enrollmentNumber, section } = userDoc.data();
          setUserName(name); // Store user name
          setEnrollmentNumber(enrollmentNumber); // Store enrollment number
          setSection(section); // Store section

          const userTwoPointersRef = doc(db, `user_twoPointers/${enrollmentNumber}`);
          const userTwoPointersDoc = await getDoc(userTwoPointersRef);

          if (userTwoPointersDoc.exists()) {
            console.log('Fetched user checked questions:', userTwoPointersDoc.data());
            setCheckedQuestions(userTwoPointersDoc.data().questions || {});
          }
        }
      } catch (error) {
        console.error('Error fetching user checked questions:', error);
      }
    };

    fetchQuestions();
    fetchUserCheckedQuestions();
  }, [db, userId]);

  const handleCheckboxChange = async (question) => {
    if (!userId) return;

    try {
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const { enrollmentNumber } = userDoc.data();
        const userTwoPointersRef = doc(db, `user_twoPointers/${enrollmentNumber}`);
        const usersTwoPointersRef = doc(db, `users_TwoPointers/${enrollmentNumber}`);

        setCheckedQuestions((prevCheckedQuestions) => {
          const updatedCheckedQuestions = { ...prevCheckedQuestions };

          if (updatedCheckedQuestions[question.id]) {
            delete updatedCheckedQuestions[question.id];
          } else {
            updatedCheckedQuestions[question.id] = {
              questionText: question.question,
              questionId: question.id,
              link: question.link,
            };
          }

          const checkboxCount = Object.keys(updatedCheckedQuestions).length; // Count checked checkboxes

          // Update Firestore with updated questions and count
          setDoc(userTwoPointersRef, {
            section,
            questions: updatedCheckedQuestions,
          });

          setDoc(usersTwoPointersRef, {
            name: userName,
            enrollmentNumber,
            section,
            checkboxCount, // Save the count of checked checkboxes
          });

          console.log('Updated checked questions and count:', checkboxCount);
          return updatedCheckedQuestions;
        });
      }
    } catch (error) {
      console.error('Error handling checkbox change:', error);
    }
  };

  return (
    <>
      <Header />
      <div className="heading">
        <h1>Two Pointers</h1>
      </div>
      <div>
        {questions.length === 0 ? (
          <p>No questions available</p>
        ) : (
          questions.map((qtn) => (
            <div className="questionList" key={qtn.id}>
              <div className="questionCol">
                <a href={qtn.link} target="_blank" rel="noopener noreferrer">
                  {qtn.question}
                </a>
              </div>
              <div className="link">
                <input
                  className="check"
                  type="checkbox"
                  checked={!!checkedQuestions[qtn.id]}
                  onChange={() => handleCheckboxChange(qtn)}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default TwoPointers;
