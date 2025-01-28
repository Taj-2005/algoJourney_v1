import React,{useState,useEffect} from 'react';
import '../Styles/styles1.css';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { db } from '../../firebase/firebaseConfig';
import {getDocs,collection} from 'firebase/firestore';

function Concepts() {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
};

const [prefix, setPrefix] = useState('0%'); // Initialize with '0%' as a string
const [pointer, setTwoPointer] = useState('0%'); // Initialize with '0%' as a string
const [loading, setLoading] = useState(false); // For loading state

// Fetch percentage from Firestore
async function fetchPercentage(topic) {
  try {
    setLoading(true); // Start loading
    const querySnapshot = await getDocs(collection(db, topic));
    if (querySnapshot.empty) {
      console.log(`No documents found in the "${topic}" collection.`);
      setLoading(false);
      return;
    }

    // Assuming the collection contains a single document
    const doc = querySnapshot.docs[0];
    const data = doc.data();
    const fetchedPercentage = data.percentage; // Getting the percentage as a string
    if (topic === 'users_PrefixSum') {
      setPrefix(fetchedPercentage); // Update prefix state
    } else if (topic === 'users_TwoPointers') {
      setTwoPointer(fetchedPercentage); // Update pointer state
    }

    setLoading(false); // Stop loading
  } catch (error) {
    console.error("Error fetching percentage data:", error);
    setLoading(false); // Stop loading in case of error
  }
}

// Fetch the percentage for PrefixSum on component mount
useEffect(() => {
  fetchPercentage("users_PrefixSum");
}, []);

// Fetch the percentage for TwoPointers on component mount
useEffect(() => {
  fetchPercentage("users_TwoPointers");
}, []);


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

            <button id='arrays2d' className='topicX'>
                <h2>2D Arrays</h2>
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
