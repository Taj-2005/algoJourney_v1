import React from 'react';
import '../Styles/styles1.css';
import { useNavigate } from 'react-router-dom';
function Concepts() {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };
  return (
    <>
    <div className='mainC'>
        <div className='topics'>
            <button id="prefixSum" onClick={() => handleNavigation("/PrefixSum")} className='topic'>
                <h2>Prefix Sum</h2>
                {/* <img className='arrow' src={arrow} alt='>'></img> */}
            </button>
            <button id='twoPointers' onClick={() => handleNavigation("/TwoPointers")} className='topic'>
                <h2 >Two Pointers</h2>
                {/* <img className='arrow' src={arrow} alt='>'></img> */}
            </button>
            <button id='timeComplexity' className='topic'>
                <h2 >Time Complexity</h2>
                {/* <img className='arrow' src={arrow} alt='>'></img> */}
            </button>


            <button id="basicMaths" className='topic'>
                <h2>Basic Maths</h2>
                {/* <img className='arrow' src={arrow} alt='>'></img> */}
            </button>

            <button id='complexity' className='topic'>
                <h2 >Complexity Analysis</h2>
                {/* <img className='arrow' src={arrow} alt='>'></img> */}
            </button>

            <button id='arrays1d' className='topic'>
                <h2>1D Arrays</h2>
                {/* <img className='arrow' src={arrow} alt='>'></img> */}
            </button>

            <button id='arrays2d' className='topic'>
                <h2>2D Arrays</h2>
                {/* <img className='arrow' src={arrow} alt='>'></img> */}
            </button>

            <button id='strings' className='topic'>
                <h2>Strings</h2>
                {/* <img className='arrow' src={arrow} alt='>'></img> */}
            </button>

            <button id='sorting' className='topic'>
                <h2>Sorting</h2>
                {/* <img className='arrow' src={arrow} alt='>'></img> */}
            </button>

            <button id='searching' className='topic'>
                <h2>Searching</h2>
                {/* <img className='arrow' src={arrow} alt='>'></img> */}
            </button>

            <button id='linkedLists' className='topic'>
                <h2>Linked Lists</h2>
                {/* <img className='arrow' src={arrow} alt='>'></img> */}
            </button>

            <button id='hashing' className='topic'>
                <h2>Hashing</h2>
                {/* <img className='arrow' src={arrow} alt='>'></img> */}
            </button>

            <button id='stacks' className='topic'>
                <h2>Stacks</h2>
                {/* <img className='arrow' src={arrow} alt='>'></img> */}
            </button>

            <button id='queues' className='topic'>
                <h2>Queues</h2>
                {/* <img className='arrow' src={arrow} alt='>'></img> */}
            </button>

            <button id='trees' className='topic'>
                <h2>Trees</h2>
                {/* <img className='arrow' src={arrow} alt='>'></img> */}
            </button>

            <button id='advTrees' className='topic'>
                <h2>Adv Trees</h2>
                {/* <img className='arrow' src={arrow} alt='>'></img> */}
            </button>

            <button id='heaps' className='topic'>
                <h2>Heaps</h2>
                {/* <img className='arrow' src={arrow} alt='>'></img> */}
            </button>

            <button id='priorityQueues' className='topic'>
                <h2>Priority Queues</h2>
                {/* <img className='arrow' src={arrow} alt='>'></img> */}
            </button>

        </div>
    </div>
    </>
  )
}

export default Concepts
