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
  const [imageMessage, updateImageMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [data, updateData] = useState({
    email: email,
    name: '',
    bookname: '',
    bookauthor: '',
    isbn: '',
    publishYear: '', // Fügen Sie dies hinzu
    category: '',
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

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    // Überprüfen Sie, ob eine Datei ausgewählt wurde
    if (selectedFile) {
      setSelectedImage(selectedFile);
      updateImageMessage('');
    } else {
      setSelectedImage(null);
      updateImageMessage('Bitte wählen Sie ein Bild aus.');
    }
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
      if (!selectedImage) {
        updateImageMessage('Bitte wählen Sie ein Bild aus.');
        return;
      }
      return;
    } else {
      updateBookMessage('');
    }
    if (data.name.length === 0) {
      updateNameMessage('Namen schreiben');
      return;
    } else {
      updateNameMessage('');
    }

    const formData = new FormData();
    formData.append('img', selectedImage); // Bild hinzufügen
    // Andere Daten als Formular-Daten hinzufügen
    Object.keys(data).forEach((key) => formData.append(key, data[key]));

    fetch(`${urlBookInfo}/addBookinfo`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        bookname: data.bookname,
        bookauthor: data.bookauthor,
        isbn: data.isbn,
        publishYear: data.publishYear,
        category: data.category,
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
            callMessage('Error', 'Nicht möglich zu senden');
          }
        })
        .catch((error) => {
        // console.log(error)
          callMessage('Error', 'Nicht möglich zu senden');
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
      updateEmailMessage('Ungültige E-Mail');
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
          <h1>Buchdetails ausfüllen</h1>
          <p>
          Wenn es ein Buch gibt, das auf unserer Plattform nicht verfügbar ist. Sie können uns dies mitteilen, indem Sie dieses Formular ausfüllen.
          </p>
          <h3>{bookMessage}</h3>
          <form onKeyDown={(e) => handleKeyPress(e)}>
            <div className={style.BookinfoFormDesign}>
              <input type='text' placeholder='Geben Sie den Buchnamen ein' name='bookname' value={data['bookname']} onChange={(e) => updateDataFunction(e)} />
            </div>
            <div className={style.BookinfoFormDesign}>
              <input type='text' placeholder='Geben Sie den Namen des Autors ein' name='bookauthor' value={data['bookauthor']} onChange={(e) => updateDataFunction(e)} />
            </div>
            <div className={style.BookinfoFormDesign}> <input type='text' placeholder='ISBN eingeben' name='isbn' value={data['isbn']} onChange={(e) => updateDataFunction(e)} /> </div>
            <div className={style.BookinfoFormDesign}> <input type='text' placeholder='Veröffentlichungsjahr eingeben' name='publishYear' value={data['publishYear']} onChange={(e) => updateDataFunction(e)} /> </div>
            <div className={style.BookinfoFormDesign}> <input type='text' placeholder='Kategorie eingeben' name='category' value={data['category']} onChange={(e) => updateDataFunction(e)} /> </div>
            <div className={style.BookinfoFormDesign}> <label htmlFor="imageUpload">Bild auswählen</label> <input type="file" id="imageUpload" accept="image/*" onChange={handleImageChange} /> <p>{imageMessage}</p> </div>
            <h2>Persönliches Detail</h2>
            <div className={style.BookinfoFormDesign}>
              <input type='text' placeholder='Name eingeben' name='name' value={data['name']} onChange={(e) => updateDataFunction(e)} />
              <p>{NameMessage}</p>
            </div>
            <div className={style.BookinfoFormDesign}> <input type='text' placeholder='Email eingeben' name='email' value={data['email']} onChange={(e) => updateDataFunction(e)} /> <p>{emailMessage}</p> </div>
          </form>
          <button type='button' onClick={sendData}>Send</button>
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
