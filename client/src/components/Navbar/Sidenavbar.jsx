import React, {useState} from 'react';
import '../../Private/css/Sidenavbar.css';
import {Link} from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faXmark } from '@fortawesome/free-solid-svg-icons'
import Logo from '../Logo/Logo';
import {useSelector} from 'react-redux';


function Sidenavbar(props) {
  const {logoutfunc} = props;
  const user = useSelector((state) => state.user.name);
  const login = useSelector((state) => state.user.login);
  const [mouseevent, updateEvent] = useState(-1);


  const togglerfunction = () => {
    document.getElementById('sidenavdisplay').style.width = '0px';
  };

  const enterLeave = (event, e) => {
    // console.log(event.touches[0].clientX)
    if (e === 0) {
      const x = event.touches[0].clientX;
      updateEvent(x);
    } else {
      const x = event.changedTouches[0].clientX;
      if (mouseevent > x) {
        document.getElementById('sidenavdisplay').style.width = '0px';
      }
      updateEvent(-1);
    }
  };

  return (
    <div id='sidenavdisplay' onTouchStart={(e) => enterLeave(e, 0)} onTouchEnd={(e) => enterLeave(e, 1)}>
      <div id='sidenav' >
        <div className='sidelogo' >
          <Logo />
        </div>
        <div className='SideNavDetail'>
          <div className='UserNameSideNav'>
            <p><span>hi,</span> {user.toUpperCase()}</p>
          </div>
          <ul className='Sidenavlinks'>
            <li><Link to="/" onClick={togglerfunction}>Startseite</Link></li>
            <li><Link to="/search" onClick={togglerfunction}>Suche</Link></li>
            <li><Link to='/favourite' onClick={togglerfunction}>Favourite</Link></li>
            <li><Link to="/user" onClick={togglerfunction}>Profil</Link></li>
            <li><Link to='/user' onClick={togglerfunction}>Rezensionen</Link></li>
            <li><Link to='/about' onClick={togglerfunction}>Hilfe</Link></li>
            <li><Link to='/admin' onClick={togglerfunction}>Admin</Link></li>
          </ul>
        </div>
        <ul className='sidenavauth'>
          {login ?
            <div>
              <li><Link to="/login" onClick={logoutfunc}>Abmelden</Link></li>
            </div> :
            <div>
              <li><Link to="/login" onClick={togglerfunction}>Anmelden</Link></li>
              <li>Oder</li>
              <li><Link to="/signup" onClick={togglerfunction}>Registrieren</Link></li>
            </div>
          }
          <p>1.0.0</p>
          <p>Alle Rechte vorbehalten</p>
        </ul>
      </div>
    </div>
  );
}

export default Sidenavbar;
