import React,{useState,useEffect} from 'react';
import '../Styles/styles1.css';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { db } from '../../firebase/firebaseConfig';
import {getDocs,collection} from 'firebase/firestore';
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";

function Concepts() {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
};


const [prefix, setPrefix] = useState("0%");
const [pointer, setTwoPointer] = useState("0%");
const [arrays2d, setArrays2D] = useState("0%");
const [binary, setBinarySearch] = useState("0%");
const [recursion, setRecursion] = useState("0%");
const [loading, setLoading] = useState(false);
const [user, setUser] = useState(null);
const [enrollmentNumber, setEnrollmentNumber] = useState(null);

// Listen for authentication state
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser) {
      setUser(currentUser);
      
      // Fetch user data from "users" collection
      const userRef = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        setEnrollmentNumber(userSnap.data().enrollmentNumber); // Store enrollment number
      } else {
        console.log("User document not found.");
      }
    } else {
      setUser(null);
      setEnrollmentNumber(null);
    }
  });

  return () => unsubscribe();
}, []);

// Fetch percentage based on enrollment number
async function fetchPercentage(topic) {
  if (!enrollmentNumber) return; // Ensure enrollment number is available

  try {
    setLoading(true);

    const docRef = doc(db, topic, enrollmentNumber);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const fetchedPercentage = docSnap.data().percentage || "0%";
      
      if (topic === "users_PrefixSum") {
        setPrefix(fetchedPercentage);
      } else if (topic === "users_TwoPointers") {
        setTwoPointer(fetchedPercentage);
      } else if (topic === "users_Arrays2D") {
        setArrays2D(fetchedPercentage);
      } else if (topic === "users_BinarySearch") {
        setBinarySearch(fetchedPercentage);
      } else if (topic === "users_Recursion") {
        setRecursion(fetchedPercentage);
      }
    } else {
      console.log(`No data found for enrollment ${enrollmentNumber} in "${topic}"`);
    }

    setLoading(false);
  } catch (error) {
    console.error("Error fetching percentage data:", error);
    setLoading(false);
  }
}

// Fetch all topic percentages once enrollment number is available
useEffect(() => {
  if (enrollmentNumber) {
    fetchPercentage("users_PrefixSum");
    fetchPercentage("users_TwoPointers");
    fetchPercentage("users_Arrays2D");
    fetchPercentage("users_BinarySearch");
    fetchPercentage("users_Recursion");
  }
}, [enrollmentNumber]);


async function exportToExcel() {
    const data = [];
    try {
        const querySnapshot = await getDocs(collection(db, "users"));
        if (querySnapshot.empty) {
        console.log('No documents found in the "users" collection.');
        alert('No data available to export. The "users" collection is empty.');
        return;
        }

        querySnapshot.forEach((doc) => {
        const submission = doc.data();
        data.push([
            submission.collegeEmail,
            submission.enrollmentNumber,
            submission.mobileNumber,
            submission.name,
            submission.section,
        ]);
        });

        const ws = XLSX.utils.aoa_to_sheet([
        ["College Email", "Enrollment Number", "Mobile Number", "Name", "Section"],
        ...data,
        ]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Login Data");
        XLSX.writeFile(wb, "login_data.xlsx");

        console.log("Export to Excel complete!");
        alert("Export to Excel completed successfully.");
    } catch (error) {
        console.error("Error fetching data:", error);
        alert("An error occurred while exporting the data. Please check the console for more details.");
    }
    };
  return (
    <>
    <div className='mainC'>
    {/* <button onClick={exportToExcel}>Export to Excel</button> */}
        <div className='topics'>
            <button id="prefixSum" onClick={() => handleNavigation("/PrefixSum")} className='topic'>
                <h2>Prefix Sum</h2>
                <div class="progress">
                    <div class="progress-bar-background">
                        <div style={{height: '100%',width:prefix,backgroundColor: 'green',borderRadius: '5px'}} id="progress-bar">
                        </div>
                        <p>{prefix}</p>
                    </div>
                </div>
            </button>

            <button id='twoPointers' onClick={() => handleNavigation("/TwoPointers")} className='topic'>
                <h2 >Two Pointers</h2>
                <div class="progress">
                    <div class="progress-bar-background">
                        <div style={{height: '100%',width:pointer,backgroundColor: 'green',borderRadius: '5px'}} id="progress-bar">
                        </div>
                        <p>{pointer}</p>
                    </div>
                </div>
            </button>


            <button id='arrays2d' onClick={() => handleNavigation("/Arrays2D")} className='topic'>
                <h2 >2D Arrays</h2>
                <div class="progress">
                    <div class="progress-bar-background">
                        <div style={{height: '100%',width:arrays2d,backgroundColor: 'green',borderRadius: '5px'}} id="progress-bar">
                        </div>
                        <p>{arrays2d}</p>
                    </div>
                </div>
            </button>


            <button id='binarySearch' onClick={() => handleNavigation("/BinarySearch")} className='topic'>
                <h2 >Binary Search</h2>
                <div class="progress">
                    <div class="progress-bar-background">
                        <div style={{height: '100%',width:binary,backgroundColor: 'green',borderRadius: '5px'}} id="progress-bar">
                        </div>
                        <p>{binary}</p>
                    </div>
                </div>
            </button>
            
            

            <button id='recursion' onClick={() => handleNavigation("/Recursion")} className='topic'>
                <h2 >Recursion</h2>
                <div class="progress">
                    <div class="progress-bar-background">
                        <div style={{height: '100%',width:recursion,backgroundColor: 'green',borderRadius: '5px'}} id="progress-bar">
                        </div>
                        <p>{recursion}</p>
                    </div>
                </div>
            </button>

            <button id='timeComplexity' className='topicX notallowed'>
                <h2 >Time Complexity</h2>
                <p>Coming Soon.....</p>
            </button>


            <button id="basicMaths" className='topicX'>
                <h2>Basic Maths</h2>
            <p>Coming Soon.....</p>
            </button>

            <button id='complexity' className='topicX'>
                <h2 >Complexity Analysis</h2>
            <p>Coming Soon.....</p>
            </button>

            <button id='arrays1d' className='topicX'>
                <h2>1D Arrays</h2>
            <p>Coming Soon.....</p>
            </button>


            <button id='strings' className='topicX'>
                <h2>Strings</h2>
            <p>Coming Soon.....</p>
            </button>

            <button id='sorting' className='topicX'>
                <h2>Sorting</h2>
            <p>Coming Soon.....</p>
            </button>

            <button id='searching' className='topicX'>
                <h2>Searching</h2>
            <p>Coming Soon.....</p>
            </button>

            <button id='linkedLists' className='topicX'>
                <h2>Linked Lists</h2>
            <p>Coming Soon.....</p>
            </button>

            <button id='hashing' className='topicX'>
                <h2>Hashing</h2>
            <p>Coming Soon.....</p>
            </button>

            <button id='stacks' className='topicX'>
                <h2>Stacks</h2>
            <p>Coming Soon.....</p>
            </button>

            <button id='queues' className='topicX'>
                <h2>Queues</h2>
            <p>Coming Soon.....</p>
            </button>

            <button id='trees' className='topicX'>
                <h2>Trees</h2>
            <p>Coming Soon.....</p>
            </button>

            <button id='advTrees' className='topicX'>
                <h2>Adv Trees</h2>
            <p>Coming Soon.....</p>
            </button>

            <button id='heaps' className='topicX'>
                <h2>Heaps</h2>
            <p>Coming Soon.....</p>
            </button>

            <button id='priorityQueues' className='topicX'>
                <h2>Priority Queues</h2>
            <p>Coming Soon.....</p>
            </button>

        </div>
    </div>
    </>
  )
}

export default Concepts
