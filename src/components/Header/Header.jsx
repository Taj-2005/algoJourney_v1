import React, {useState} from 'react'
import Logout from '../Logout/Logout';
import userProfile from '../Assets/user_icon.jpg';

function Header() {
    const [showTooltip, setShowTooltip] = useState(false);
    
    const handleMouseEnter = () => {
        setShowTooltip(true);
    }
  return (
    <header className="alignment">
            <h1 className='h1'><a href='https://algojourney-dsa-nst.vercel.app/'>AlgoJourney</a></h1>
            <div className='user-icon-wrapper' onMouseEnter={handleMouseEnter}>
                <img className='icon' src={userProfile} alt='User Icon' />
                {showTooltip && (
                        <div className='tooltip'>
                            <Logout/>
                        </div>
                    )}
            </div>
        </header>
  )
}

export default Header
