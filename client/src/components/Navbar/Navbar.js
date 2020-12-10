/* import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "./Navbar.css"

import AuthService from '../../Services/auth.services';


const Navbar = (props) => {
    const [ loggedInUser, setLoggedInUser] = useState(null);

    const service = new AuthService();

    // Mimic lifecycle method when a component updates
    useEffect(() => {
      setLoggedInUser(props.userInSession);
    }, [props.userInSession]);
  
    //?? Passing down the loggedin user as props (userinsession) The useffect listens for any change that happens in the props to reflect the changes on the Front-end.

    // function to log user out
    const logoutUser = () => {
      service.logout().then(() => {
        // reset state value
        setLoggedInUser(null);
  
        // reset getUser value
        props.getUser(null);
      });
    };

    if (loggedInUser) {
        return (
        <nav className="nav-style-loggedin">
            <ul>
            <li>Welcome, {loggedInUser.username}</li>
            <li>
                <Link to="/rides" style={{ textDecoration: "none" }}>
                Rides
                </Link>
            </li>
            <li>
                <Link to="/">
                <button onClick={logoutUser}>Logout</button>
                </Link>
            </li>
            </ul>
        </nav>
        );
    } else {
        return (
        <div>
            <nav className="nav-style">
            <ul>
                <li>
                <Link to="/login" style={{ textDecoration: "none" }}>
                    Login
                </Link>
                </li>
                <li>
                <Link to="/signup" style={{ textDecoration: "none" }}>
                    Signup
                </Link>
                </li>
            </ul>
            </nav>
        </div>
        );
    }
};
 */



 
import React, { useState, useEffect } from 'react';
import { Button } from '../Button/Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
import ProtectedRoute from "./../Auth/ProtectedRoutes";
import AuthService from '../../Services/auth.services';

function Navbar(props) {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const [ loggedInUser, setLoggedInUser] = useState(null);

  const service = new AuthService();

    // Mimic lifecycle method when a component updates
    useEffect(() => {
        setLoggedInUser(props.userInSession);
      }, [props.userInSession]);
    
      //?? Passing down the loggedin user as props (userinsession) The useffect listens for any change that happens in the props to reflect the changes on the Front-end.
  
      // function to log user out
      const logoutUser = () => {
        service.logout().then(() => {
          // reset state value
          setLoggedInUser(null);
    
          // reset getUser value
          props.getUser(null);
        });
      };


  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  if (loggedInUser) {
  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            En_Route
            <i className='fab fa-typo3' />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links'>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/Adventures'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Adventures
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/rides'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Rides
              </Link>
            </li>
            <li className='nav-item'>
              <Link to={`/user/${loggedInUser._id}`} className='nav-links' onClick={closeMobileMenu}>
                <p>Hoi <strong>{loggedInUser.username} !</strong></p>
              </Link>
            </li>
            
          </ul>
          {button && <Button onClick={logoutUser} buttonStyle='btn--outline'>Logout</Button>}
          
        </div>
      </nav>
    </>
  );
} else {
    return (
        <>
          <nav className='navbar'>
            <div className='navbar-container'>
              <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                En_Route
                <i class='fab fa-typo3' />
              </Link>
              <div className='menu-icon' onClick={handleClick}>
                <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
              </div>
              <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                <li className='nav-item'>
                  <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                    Home
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    to='/Adventures'
                    className='nav-links'
                    onClick={closeMobileMenu}
                  >
                    Adventures
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    to='/rides'
                    className='nav-links'
                    onClick={closeMobileMenu}
                  >
                    Rides
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    to="/login"
                    className='nav-links'
                    onClick={closeMobileMenu}
                  >
                    Login
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </>
      );
}
}


export default Navbar;


/* 
User greeting
              <Link to='/users/:id' className='nav-links' onClick={closeMobileMenu}>
                {<Button buttonStyle='btn--outline'><p>Hoi <strong>{loggedInUser.username} !</strong></p></Button>}
              </Link>

*/