import React from 'react';
import '../Styles/styles1.css';
import Concepts from '../Concepts/Concepts';
// eslint-disable-next-line
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';

function Dashboard() {
  return (
    <>
        <Header/>
        <hr></hr>
            <Concepts/>
    </>
  )
}

export default Dashboard
