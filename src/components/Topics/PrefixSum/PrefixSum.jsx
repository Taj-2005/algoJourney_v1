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

function PrefixSum() {
  const [questions, setQuestions] = useState([]);
  const [checkedQuestions, setCheckedQuestions] = useState({});
  const [section, setSection] = useState(''); // State to store section info
  const auth = getAuth();
  const db = getFirestore();
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questionsCollection = collection(db, 'prefixSum');
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
          const { enrollmentNumber, section } = userDoc.data(); // Get section from user data
          setSection(section); // Store the section value
          const userPrefixSumRef = doc(db, `user_prefixSum/${enrollmentNumber}`);
          const userPrefixSumDoc = await getDoc(userPrefixSumRef);

          if (userPrefixSumDoc.exists()) {
            console.log('Fetched user checked questions:', userPrefixSumDoc.data());
            setCheckedQuestions(userPrefixSumDoc.data().questions || {}); // Ensure data format matches
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
        const userPrefixSumRef = doc(db, `user_prefixSum/${enrollmentNumber}`);

        // Use the functional state update to make sure we work with the latest state
        setCheckedQuestions(prevCheckedQuestions => {
          const updatedCheckedQuestions = { ...prevCheckedQuestions };

          // Toggle the checkbox for the specific question
          if (updatedCheckedQuestions[question.id]) {
            // If question is already checked, remove it
            delete updatedCheckedQuestions[question.id];
          } else {
            // If question is not checked, add it
            updatedCheckedQuestions[question.id] = {
              questionText: question.question,
              questionId: question.id,
              link: question.link, // Add the link as well
            };
          }

          // Prepare the data to update Firestore
          const dataToUpdate = {
            section: section, // Add the section value to Firestore
            questions: updatedCheckedQuestions, // Update the checked questions
          };

          // Update Firestore with the changes only if there is a change in the state
          setDoc(userPrefixSumRef, dataToUpdate);
          console.log('Updated checked questions:', updatedCheckedQuestions);

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
        <h1>Prefix Sum</h1>
      </div>
      <div>
        {questions.length === 0 ? (
          <p>No questions available</p> // Message when no questions are available
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
                  checked={!!checkedQuestions[qtn.id]} // Keep state persistent
                  onChange={() => handleCheckboxChange(qtn)} // Handle changes
                />
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default PrefixSum;
