import React from 'react';
import Concepts from '../Concepts/Concepts';
// eslint-disable-next-line
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import '../Styles/styles1.css';

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
