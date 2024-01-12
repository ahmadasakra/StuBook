import React, {useEffect, useState} from 'react';
import style from '../Private/css/DetailBook.module.css';
import {authToken, urlbook, urlFavourite} from '../Appurl';
import Loader from '../loader/Loader';
import Review from './Review';
import Footer from './Footer/Footer';
import Corousel from './Corousel/Corousel';
import {useLocation} from 'react-router-dom';
import FetchImage from '../specialFunction/FetchImage';
import {callMessage} from './Alert/CallMessage';


function DetailBook() {
  const location = useLocation();
  let url = location.pathname;
  url = url.replace(/%20/g, ' ');
  let arrdata = url.split('/');
  let bookid = arrdata[2];
  let booktitle = arrdata[3];
  let bookauthor = arrdata[4];
  const [category, updatecategory] = useState('');
  const [language, updatelanuage] = useState('');
  const [publication, updatepublication] = useState('');
  const [preis, setPreis] = useState('');
  const [IsLoading, updateLoading] = useState(false);
  // console.log(url);
  // console.log(bookid);
  // console.log(booktitle);
  // console.log(bookauthor);

  const fetchBookDetail = async () => {
    url = location.pathname;
    url = url.replace(/%20/g, ' ');
    arrdata = url.split('/');
    bookid = arrdata[2];
    booktitle = arrdata[3];
    bookauthor = arrdata[4];
    updateLoading(true);
    await fetch(`${urlbook}/onebook/id`, {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        id: bookid,
        title: booktitle,
        author: bookauthor,
      }),
    })
        .then((res) => res.json())
        .then((res) => {
        // console.log(res);
          if (res.status === 0) {
            updatelanuage(res.data.language);
            updatecategory(res.data.category);
            updatepublication(res.data.publication);
            setPreis(res.data.preis);
          } else {
            callMessage('Serverfehler', 'Details können nicht abgerufen werden');
          }
        })
        .catch((err) => {
          callMessage('Serverfehler', 'Details können nicht abgerufen werden');
        });
    updateLoading(false);
  };


  const addFavourite = ()=>{
    fetch(`${urlFavourite}/add`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'auth_token': `${authToken}`,
      },
      body: JSON.stringify({
        bookid: bookid,
        bookname: booktitle,
        author: bookauthor,
      }),
    })
        .then((res)=>res.json())
        .then((res)=>{
          if (res.status===0) {
            callMessage('Erfolgreich', 'Das Buch wurde zu Ihrer Favoritenliste hinzugefügt');
          } else if (res.status===1) {
            callMessage('Oops', 'Das Buch steht bereits auf Ihrer Favoritenliste');
          } else {
            callMessage('Irgendwas stimmt nicht', 'Dieses Buch kann nicht zu Ihrer Favoritenliste hinzugefügt werden');
          }
        })
        .catch((err)=>{
          callMessage('Serverfehler', 'Dieses Buch kann nicht zu Ihrer Favoritenliste hinzugefügt werden');
        });
  };

  // const getimage = ()=>{
  //     let html = <FetchImage title={booktitle} id={bookid}/>;
  //     console.log(html);
  // }

  useEffect(() => {
    fetchBookDetail();
    // getimage();
  }, [location]);

  return (
    <div>
      <div className={style.bookdetail}>
        {IsLoading ? <Loader /> : <div></div>}
        <div className={style.aboutBook}>
          <div className={style.bookimage}>
            <FetchImage title={booktitle} id={bookid}/>
          </div>
          <div className={style.bookdata}>
            <h1>{booktitle}</h1>
            <h2>Autor: <span>{bookauthor}</span></h2>
            <h3>Kategorie:<span> {category}</span></h3>
            <h3>Sprache:<span> {language}</span></h3>
            <h3>Veröffentlichen durch: <span>{publication}</span></h3>
            <h4>Preis: <span>{preis} €</span></h4>

            <button type='button' onClick={addFavourite}>Zum Favoriten hinzufügen</button>
          </div>
        </div>
        <div className={style.bookreviews}>
          <Review bookid={bookid} bookname={booktitle} />
        </div>
      </div>
      {IsLoading ? <div></div> : <Corousel type={category.length===0 ? 'All': category} delay='3200' />}
      <Footer />
    </div>
  );
}

export default DetailBook;
