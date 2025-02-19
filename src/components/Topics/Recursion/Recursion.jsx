import React, { useState, useEffect, useCallback } from 'react';
import Header from '../../Header/Header';
import {
  getFirestore,
  collection,
  onSnapshot,
  doc,
  setDoc,
  getDoc,
  writeBatch,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import * as XLSX from 'xlsx';
import { db } from '../../../firebase/firebaseConfig';
import { getDocs } from 'firebase/firestore';

async function exportToExcelR() {
  const data = [];
  try {
    const querySnapshot = await getDocs(collection(db, 'users_Recursion'));
    if (querySnapshot.empty) {
      console.log('No documents found in the "users" collection.');
      alert('No data available to export. The "users" collection is empty.');
      return;
    }

    querySnapshot.forEach((doc) => {
      const submission = doc.data();
      data.push([
        submission.name,
        submission.enrollmentNumber,
        submission.checkboxCount,
        submission.section,
        submission.percentage, // Added percentage field
      ]);
    });

    const ws = XLSX.utils.aoa_to_sheet([
      ['Name', 'Enrollment Number', 'N of Q Solved', 'Section', 'Percentage'],
      ...data,
    ]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Submissions Data');
    XLSX.writeFile(wb, 'recursion_data.xlsx');

    console.log('Export to Excel complete!');
    alert('Export to Excel completed successfully.');
  } catch (error) {
    console.error('Error fetching data:', error);
    alert('An error occurred while exporting the data. Please check the console for more details.');
  }
}

function Recursion() {
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
        const questionsCollection = collection(db, 'recursion');
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

          const userRecursionRef = doc(db, `user_recursion/${enrollmentNumber}`);
          const userRecursionDoc = await getDoc(userRecursionRef);

          if (userRecursionDoc.exists()) {
            console.log('Fetched user checked questions:', userRecursionDoc.data());
            setCheckedQuestions(userRecursionDoc.data().questions || {});
          }
        }
      } catch (error) {
        console.error('Error fetching user checked questions:', error);
      }
    };

    fetchQuestions();
    fetchUserCheckedQuestions();
  }, [db, userId]);

  // Handle checkbox change with local state update and delayed Firestore write
  const handleCheckboxChange = useCallback(async (question) => {
    if (!userId) return;

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

      const checkboxCount = Object.keys(updatedCheckedQuestions).length;
      const totalQuestions = questions.length;
      const percentage = (Number(checkboxCount / totalQuestions)) * 100;

      // Immediate UI update
      setCheckedQuestions(updatedCheckedQuestions);

      // Batch Firestore update with delay
      setTimeout(async () => {
        try {
          const batch = writeBatch(db);
          const userDocRef = doc(db, 'users', userId);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const { enrollmentNumber } = userDoc.data();
            const userRecursionRef = doc(db, `user_recursion/${enrollmentNumber}`);
            const usersRecursionRef = doc(db, `users_Recursion/${enrollmentNumber}`);

            // Add batch operations
            batch.set(userRecursionRef, {
              section,
              questions: updatedCheckedQuestions,
            });
            batch.set(usersRecursionRef, {
              name: userName,
              enrollmentNumber,
              section,
              checkboxCount, // Save the count of checked checkboxes
              percentage: `${percentage.toFixed(0)}%`, // Save the percentage as a string
            });

            // Commit the batch update
            await batch.commit();
            console.log('Firestore batch update complete!');
          }
        } catch (error) {
          console.error('Error committing Firestore batch:', error);
        }
      }, 300); // Delay Firestore write by 300ms

      return updatedCheckedQuestions;
    });
  }, [questions, section, userName, db, userId]);

  return (
    <>
      <Header />
      {/* <button onClick={exportToExcelP}>Export to Excel</button> */}
      <div className="heading">
        <h1>Recursion</h1>
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

export default Recursion;
