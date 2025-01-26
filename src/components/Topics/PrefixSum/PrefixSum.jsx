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
import * as XLSX from 'xlsx';
import { db } from '../../../firebase/firebaseConfig';
import {getDocs} from 'firebase/firestore';



async function exportToExcelP() {
  const data = [];
  try {
      const querySnapshot = await getDocs(collection(db, "users_PrefixSum"));
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
      ]);
      });

      const ws = XLSX.utils.aoa_to_sheet([
      ["Name", "Enrollment Number", "N of Q Solved","Section"],
      ...data,
      ]);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Submissions Data");
      XLSX.writeFile(wb, "prefixSum_data.xlsx");

      console.log("Export to Excel complete!");
      alert("Export to Excel completed successfully.");
  } catch (error) {
      console.error("Error fetching data:", error);
      alert("An error occurred while exporting the data. Please check the console for more details.");
  }
  };




function PrefixSum() {
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
          const { name, enrollmentNumber, section } = userDoc.data();
          setUserName(name); // Store user name
          setEnrollmentNumber(enrollmentNumber); // Store enrollment number
          setSection(section); // Store section

          const userPrefixSumRef = doc(db, `user_prefixSum/${enrollmentNumber}`);
          const userPrefixSumDoc = await getDoc(userPrefixSumRef);

          if (userPrefixSumDoc.exists()) {
            console.log('Fetched user checked questions:', userPrefixSumDoc.data());
            setCheckedQuestions(userPrefixSumDoc.data().questions || {});
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
        const usersPrefixSumRef = doc(db, `users_PrefixSum/${enrollmentNumber}`);

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
          setDoc(userPrefixSumRef, {
            section,
            questions: updatedCheckedQuestions,
          });

          setDoc(usersPrefixSumRef, {
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
      {/* <button onClick={exportToExcelP}>Export to Excel</button> */}
      <div className="heading">
        <h1>Prefix Sum</h1>
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

export default PrefixSum;
