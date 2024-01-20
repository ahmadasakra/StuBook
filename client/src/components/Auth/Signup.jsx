import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {urlauth} from '../../Appurl';
import '../../Private/css/LoginSign.css';
import {GifLogo1} from '../Logo/GifLogo';
function Signup() {
  const float = () => {
    const data = document.getElementsByClassName('float-label-field');
    for (let i = 0; i < data.length; i++) {
      data[i].classList.add('float');
    }
  };

  const [signupDetail, updateSignup] = useState({
    name: '',
    phone: '',
    address: '',
    email: '',
    password: '',
    Cpassword: '',
  });

  const [warning, updateWarning] = useState('');
  const [warningEmail, updateWarningEmail] = useState('');
  const [warningPass, updateWarningPass] = useState('');
  const [warningCPass, updateWarningCPass] = useState('');

  const navigate = useNavigate();

  const validateemail = (email) => {
    const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    const check = pattern.test(email);
    if (check) {
      return true;
    }
    return false;
  };

  const updatevalue = (e) => {
    updateSignup({...signupDetail, [e.target.name]: e.target.value});
  };

  const onclickSign = async () => {
    updateWarning('Wird geladen ...');
    await fetch(`${urlauth}/signup`,
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(signupDetail),
        },
    )
        .then((response) => response.json())
        .then((data) => {
        // console.log(data)
          if (data.status !== 0) {
            updateWarning('E-Mail ist bereits vorhanden oder Angaben sind ungültig');
          } else {
            updateWarning('');
            localStorage.setItem('token', data.authtoken);
            window.location.reload();
          }
        })
        .catch(() => {
          updateWarning('Irgendwas stimmt nicht');
        });
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onclickSign();
    }
  };

  useEffect(() => {
    const valide = validateemail(signupDetail.email);
    if (!valide && signupDetail.email.length > 0) {
      updateWarningEmail('Ungültige E-Mail');
    } else {
      updateWarningEmail('');
    }

    if (signupDetail.password.length > 0 && signupDetail.password.length < 5) {
      updateWarningPass('Das Passwort sollte mindestens 5 Buchstaben enthalten');
    } else {
      updateWarningPass('');
    }

    if (signupDetail.Cpassword.length > 0 && signupDetail.Cpassword !== signupDetail.password) {
      updateWarningCPass('Passwort und Passwort bestätigen sollten gleich sein');
    } else {
      updateWarningCPass('');
    }

    if (localStorage.getItem('token')) {
      navigate('/');
    }
  }, [signupDetail.email, signupDetail.password, signupDetail.Cpassword, navigate]);

  return (
    <div className='Lscard' >
      <div className='signup'>
        <div>
          <h1>Benutzerkonto erstellen</h1>
          <p>Erhalten Sie Zugang zu unserem Service</p>
          <p className='warning'>{warning}</p>
        </div>
        <form onKeyDown={handleKeyPress}>
          <fieldset className='float-label-field'>
            <label htmlFor="name">Name</label>
            <input id="name" type='text' onFocus={float} name="name" value={signupDetail.name} onChange={(e) => updatevalue(e)} />
          </fieldset>
          <fieldset className='float-label-field'>
            <label htmlFor="phone">Telefon</label>
            <input id="phone" type='number' onFocus={float} name="phone" value={signupDetail.phone} onChange={(e) => updatevalue(e)} />
          </fieldset>
          <fieldset className='float-label-field'>
            <label htmlFor="address">Adresse</label>
            <input id="address" type='text' onFocus={float} name="address" value={signupDetail.address} onChange={(e) => updatevalue(e)} />
          </fieldset>
          <fieldset className='float-label-field'>
            <label htmlFor="email">E-Mail</label>
            <input id="email" type='Email' onFocus={float} name="email" value={signupDetail.email} onChange={(e) => updatevalue(e)} />
            <p className='warning'>{warningEmail}</p>
          </fieldset>
          <fieldset className='float-label-field'>
            <label htmlFor="password">Passwort</label>
            <input id="password" type='password' onFocus={float} name="password" value={signupDetail.password} onChange={(e) => updatevalue(e)} />
            <p className='warning'>{warningPass}</p>
          </fieldset>
          <fieldset className='float-label-field'>
            <label htmlFor="Cpassword">Bestätige das Passwort</label>
            <input id="Cpassword" type='password' onFocus={float} name="Cpassword" value={signupDetail.Cpassword} onChange={(e) => updatevalue(e)} />
            <p className='warning'>{warningCPass}</p>
          </fieldset>
        </form>
        <button className='signbutton' type='button' onClick={onclickSign}>Erstellen</button>
        <p className='new-user-text'>Sie haben bereits ein Konto? <Link to='/login' className='signup-link'>Anmelden</Link> </p>
      </div>
      <div className='logoG'>
        <GifLogo1 />
      </div>
    </div>
  );
}

export default Signup;
