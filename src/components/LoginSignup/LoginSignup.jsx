import React from 'react';
import './LoginSignup.css';
import userIcon from '../Assets/user_icon.jpg';
import mail from '../Assets/mail.jpg';
import pass from '../Assets/password.jpg';

const LoginSignup = () => {
    
    return (
        <div className='main'>        
            <div className='container'>
                <div className='header'>
                    <div className='text'>Sign Up</div>
                    <div className='underline'></div>
                </div>
                <div className='inputs'>

                    <div className='input'>
                        <img className='icons' src={userIcon} alt=''/>
                        <input className='credentials' type='text' placeholder='Name'/>
                    </div>

                    <div className='input'>
                        <img className='icons' src={mail} alt=''/>
                        <input className='credentials' type='email' placeholder='Email'/>
                    </div>

                    <div className='input'>
                        <img className='icons' src={pass} alt=''/>
                        <input className='credentials' type='password' placeholder='Password'/>
                    </div>

                </div>
                <div className='submit-container'>
                    <button className='submit'>Sign Up</button>
                    <button className='submit'>Log In</button>
                </div>
            </div>
        </div>
    );
}

export default LoginSignup;