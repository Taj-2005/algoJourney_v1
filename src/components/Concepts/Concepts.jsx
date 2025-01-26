import React from 'react';
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

// async function exportToExcel() {
//     const data = [];
//     try {
//         const querySnapshot = await getDocs(collection(db, "users"));
//         if (querySnapshot.empty) {
//         console.log('No documents found in the "users" collection.');
//         alert('No data available to export. The "users" collection is empty.');
//         return;
//         }

//         querySnapshot.forEach((doc) => {
//         const submission = doc.data();
//         data.push([
//             submission.collegeEmail,
//             submission.enrollmentNumber,
//             submission.mobileNumber,
//             submission.name,
//             submission.section,
//         ]);
//         });

//         const ws = XLSX.utils.aoa_to_sheet([
//         ["College Email", "Enrollment Number", "Mobile Number", "Name", "Section"],
//         ...data,
//         ]);
//         const wb = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(wb, ws, "Login Data");
//         XLSX.writeFile(wb, "login_data.xlsx");

//         console.log("Export to Excel complete!");
//         alert("Export to Excel completed successfully.");
//     } catch (error) {
//         console.error("Error fetching data:", error);
//         alert("An error occurred while exporting the data. Please check the console for more details.");
//     }
//     };
  return (
    <>
    <div className='mainC'>
    {/* <button onClick={exportToExcel}>Export to Excel</button> */}
        <div className='topics'>
            <button id="prefixSum" onClick={() => handleNavigation("/PrefixSum")} className='topic'>
                <h2>Prefix Sum</h2>
            </button>
            <button id='prefixSum' onClick={() => handleNavigation("/TwoPointers")} className='topic'>
                <h2 >Two Pointers</h2>
            </button>
            <button id='timeComplexity' className='topic'>
                <h2 >Time Complexity</h2>
            </button>


            <button id="basicMaths" className='topic'>
                <h2>Basic Maths</h2>
            </button>

            <button id='complexity' className='topic'>
                <h2 >Complexity Analysis</h2>
            </button>

            <button id='arrays1d' className='topic'>
                <h2>1D Arrays</h2>
            </button>

            <button id='arrays2d' className='topic'>
                <h2>2D Arrays</h2>
            </button>

            <button id='strings' className='topic'>
                <h2>Strings</h2>
            </button>

            <button id='sorting' className='topic'>
                <h2>Sorting</h2>
            </button>

            <button id='searching' className='topic'>
                <h2>Searching</h2>
            </button>

            <button id='linkedLists' className='topic'>
                <h2>Linked Lists</h2>
            </button>

            <button id='hashing' className='topic'>
                <h2>Hashing</h2>
            </button>

            <button id='stacks' className='topic'>
                <h2>Stacks</h2>
            </button>

            <button id='queues' className='topic'>
                <h2>Queues</h2>
            </button>

            <button id='trees' className='topic'>
                <h2>Trees</h2>
            </button>

            <button id='advTrees' className='topic'>
                <h2>Adv Trees</h2>
            </button>

            <button id='heaps' className='topic'>
                <h2>Heaps</h2>
            </button>

            <button id='priorityQueues' className='topic'>
                <h2>Priority Queues</h2>
            </button>

        </div>
    </div>
    </>
  )
}

export default Concepts
