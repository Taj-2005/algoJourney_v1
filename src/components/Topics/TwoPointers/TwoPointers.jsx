import React, { useState, useEffect } from 'react';
import Header from '../../Header/Header';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';

function PrefixSum() {
  const [questions, setQuestions] = useState([]);
  const db = getFirestore();

  // Real-time data fetching using onSnapshot
  useEffect(() => {
    const questionsCollection = collection(db, 'twoPointers');
    const unsubscribe = onSnapshot(questionsCollection, (snapshot) => {
      console.log(snapshot.docs); // Log raw snapshot datacd 
      const questionData = snapshot.docs.map((doc) => ({
        id: doc.id, // Get document ID
        ...doc.data(), // Get document data
      }));
      setQuestions(questionData);
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, [db]);

  return (
    <>
      <Header />
      <div className='heading'>
        <h1>Two Pointers</h1>
      </div>
      
      <div className="questionsGrid">
        <div>
          {questions.length === 0 ? (
            <p>No questions available</p>
          ) : (
            questions.map((qtn) => (
              <div className='questionList'>
              <div className="questionCol" key={qtn.id}>
                <a href={qtn.link} target="_blank" rel="noopener noreferrer">
                  {qtn.question}
                </a>
              </div>
                <div className="link">
                  <input className="check" type="checkbox" name="check" id={`check-${qtn.id}`} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default PrefixSum;
