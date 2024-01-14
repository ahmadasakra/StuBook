import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {urlBookInfo} from '../../Appurl';
import style from '../../Private/css/Info.module.css';
import {callMessage} from '../Alert/CallMessage';
import Footer from '../Footer/Footer';
import {GifLogo1, GifLogo2} from '../Logo/GifLogo';
function BookInfo() {
  const email = useSelector((state) => state.user.email);
  const user = useSelector((state) => state.user.name);
  const login = useSelector((state) => state.user.login);
  const [data, updateData] = useState({
    email: email,
    name: '',
    bookname: '',
    bookauthor: '',
  });
  const [emailMessage, updateEmailMessage] = useState('');
  const [bookMessage, updateBookMessage] = useState('');
  const [NameMessage, updateNameMessage] = useState('');
  const navigate = useNavigate();
  const updateDataFunction = (event) => {
    updateData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };
  const validateemail = (email) => {
    const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    const check = pattern.test(email);
    if (check) {
      return true;
    }
    return false;
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Eingeben') {
      sendData();
    }
  };

  const sendData = () => {
    if (data.bookauthor.length === 0 || data.bookname.length === 0) {
      updateBookMessage('Bitte geben Sie den Buchnamen und den Namen des Autors ein');
      if (data.name.length === 0) {
        updateNameMessage('Namen schreiben');
        return;
      } else {
        updateNameMessage('');
      }
      return;
    } else {
      updateBookMessage('');
    }
    if (data.name.length === 0) {
      updateNameMessage('Write name');
      return;
    } else {
      updateNameMessage('');
    }

    fetch(`${urlBookInfo}/addBookinfo`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        bookname: data.bookname,
        bookauthor: data.bookauthor,
        name: data.name,
      }),
    })
        .then((res) => res.json())
        .then((res) => {
        // console.log(res);
          if (res.status == 0) {
            callMessage('Erfolgreich', 'Wir haben Ihren Vorschlag erfolgreich angenommen.');
            navigate('/');
          } else {
            console.log(res.error);
            callMessage('Fehler', 'Nicht möglich zu senden');
          }
        })
        .catch((error) => {
        // console.log(error)
          callMessage('Fehler', 'Nicht möglich zu senden');
        });
  };

  useEffect(() => {
    if (login) {
      updateData({
        ...data,
        name: user,
        email: email,
      });
    }
  }, [email, login, user]);

  useEffect(() => {
    if (data.email.length > 0 && !validateemail(data.email)) {
      updateEmailMessage('Invalid Email');
    } else {
      updateEmailMessage('');
    }
  }, [data]);

  return (
    <div>
      <div className={style.Bookinfo}>
        <div className={style.InfoLogoGIF}>
          <GifLogo1 />
        </div>
        <div className={style.BookinfoForm}>
          <p>
                        Falls es ein Buch gibt, bei dem das nicht der Fall ist
                        auf unserer Plattform verfügbar. Sie können uns dies mitteilen, indem Sie dieses Formular ausfüllen.
          </p>
          <h1>Buchdetails ausfüllen</h1>
          <h3>{bookMessage}</h3>
          <form onKeyDown={(e) => handleKeyPress(e)}>
            <div className={style.BookinfoFormDesign}>
              <input type='text' placeholder='Geben Sie den Buchnamen ein' name='bookname' value={data['bookname']} onChange={(e) => updateDataFunction(e)} />
            </div>
            <div className={style.BookinfoFormDesign}>
              <input type='text' placeholder='Geben Sie den Namen des Autors ein' name='bookauthor' value={data['bookauthor']} onChange={(e) => updateDataFunction(e)} />
            </div>
            <h2>Persönliches Detail</h2>
            <div className={style.BookinfoFormDesign}>
              <input type='text' placeholder='Name eingeben' name='name' value={data['name']} onChange={(e) => updateDataFunction(e)} />
              <p>{NameMessage}</p>
            </div>
            <div className={style.BookinfoFormDesign}>
              <input type='text' placeholder='E-Mail eingeben' name='email' value={data['email']} onChange={(e) => updateDataFunction(e)} />
              <p>{emailMessage}</p>
            </div>
          </form>
          <button type='button' onClick={sendData}>Einreichen</button>
        </div>
        <div className={style.InfoLogoGIF}>
          <GifLogo2 />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default BookInfo;
