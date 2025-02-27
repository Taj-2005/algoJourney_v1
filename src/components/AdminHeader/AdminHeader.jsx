import React, {useState} from 'react'
import Logout from '../Logout/Logout';
import userProfile from '../Assets/user_icon.jpg';
import { useNavigate } from 'react-router-dom';

function AdminHeader() {
    const [showTooltip, setShowTooltip] = useState(false);
    const navigate = useNavigate();
    
    const handleMouseEnter = () => {
        setShowTooltip(true);
    }
  return (
    <header className="alignment">
            <h1 className='h1'><a href='https://algojourney-dsa-nst.vercel.app/'>algoJourney</a></h1>
            <div className='flexing'>
                <a onClick={() => navigate('/AdminPage')}>Export to Excel</a>
                <div className='user-icon-wrapper' onMouseEnter={handleMouseEnter}>
                    <img className='icon' src={userProfile} alt='User Icon' />
                    {showTooltip && (
                            <div className='tooltip'>
                                <Logout/>
                            </div>
                        )}
                </div>
            </div>
        </header>
  )
}

export default AdminHeader
