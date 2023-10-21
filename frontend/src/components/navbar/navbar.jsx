import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { FcOvertime } from 'react-icons/fc';
import './navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [activeDashboard, setactiveDashboard] = useState(true);
  const [addShift, setaddShift] = useState(false);

  const toggleMenuHandler = () => {
    setToggleMenu(!toggleMenu);
  };

  const dashboardStyleHandler = () => {
    setaddShift(false);
    setactiveDashboard(true);
  };

  const shiftStyleHandler = () => {
    setactiveDashboard(false);
    setaddShift(true);
  };

  function blurHandler() {
    if (toggleMenu) {
      setToggleMenu(false);
    }
  }

  return (
    <div id="header">
      <section className="headerBox" onClick={blurHandler}>
        <div className="navbar">
          <div className='logo'>
            <FcOvertime style={{ height: 60, width: 60 }} />
            <p style={{ marginTop: 15 }}>Scheduler</p>
          </div>
          <div>
            <ul className={`navlinks ${toggleMenu ? '' : 'hidenavbar'}`} onClick={blurHandler}>
              <li className={activeDashboard ? 'activeLink' : ''} onClick={dashboardStyleHandler}>
                <Link to="/" className='link'>Dashboard</Link>
              </li>
              <li className={addShift ? 'activeLink' : ''} onClick={shiftStyleHandler}>
                <Link  to="/add-shift" className='link'>Add Shift</Link>
              </li>
            </ul>
            <button onClick={toggleMenuHandler} className="menubar" style={{ fontSize: '25px', color: '#ec655f' }}>
              <FaBars />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Navbar;
