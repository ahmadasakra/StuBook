import React, {useEffect, useState} from 'react';
import {authToken, urlFavourite} from '../Appurl';
import style from '../Private/css/Favourite.module.css';
import {Link, useNavigate} from 'react-router-dom';
import FetchImage from '../specialFunction/FetchImage';
import Footer from './Footer/Footer';
import LoaderCorousel from '../loader/LoaderCorousel';
import {callMessage} from './Alert/CallMessage';
import {useSelector} from 'react-redux';

function Favourite() {
  const [favbookdata, updateFavBookData] = useState({
    load: false,
    data: [],
  });
  const login = useSelector((state) => state.user.login);
  const isEmailVerify = useSelector((state) => state.user.isEmail);
  const navigate = useNavigate();

  useEffect(()=>{
    if (isEmailVerify === false) {
      navigate('/email/verify');
    }
  }, [isEmailVerify]);
  useEffect(()=>{
    if (!login) {
      navigate('/login');
    }
  }, [login, navigate]);

  const fetchFavouriteData = () => {
    fetch(`${urlFavourite}/send`, {
      headers: {
        auth_token: authToken,
      },
    }).then((res) => res.json())
        .then((res) => {
          if (res.status === 0) {
            updateFavBookData({
              ...favbookdata,
              load: true,
              data: res.data,
            });
          }
        })
        .catch((err) => {
          callMessage('Server Error', 'Unable to fetch detail');
        });
  };


  const deleteFavBook = (id) => {
    fetch(`${urlFavourite}/delete`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'auth_token': `${authToken}`,
      },
      body: JSON.stringify({
        id: id,
      }),
    })
        .then((res) => res.json())
        .then((res) => {
          if (res.status === 0) {
            callMessage('Successful', 'Deleted');
            fetchFavouriteData();
          } else {
            callMessage('Error', 'Unable to delete');
          }
        })
        .catch(() => {
          callMessage('Server Error', 'Unable to fetch detail');
        });
  };

  useEffect(() => {
    fetchFavouriteData();
  }, []);


  return (
    <div>
      <div className={style.favourite}>
        <h1>Ihre Lieblingsbücher</h1>
        <div className={style.favbook}>
          {favbookdata['load'] ?
            favbookdata['data'].length === 0 ?
              <div style={{'height': '50vh'}}>
                <p>Auf Ihrer Favoritenliste ist kein Buch verfügbar</p>
              </div> :
              favbookdata['data'].map((e) => {
                return <div className={style.Favbookdata} key={e.id}>
                  <div className={style.FavBookImage}>
                    <Link to={`/book/${e.bookid}/${e.title}/${e.author}`}>
                      <FetchImage title={e.title} id={e.bookid} />
                    </Link>
                  </div>
                  <div className={style.Favbookdetail}>
                    <h1>{e.title}</h1>
                    <h2>{e.author}</h2>
                    <Link to={`/book/${e.bookid}/${e.title}/${e.author}`}>Mehr lesen</Link>
                    <p onClick={() => deleteFavBook(e.id)}>Aus Favorit entfernen</p>
                  </div>
                </div>;
              }) :
            <div style={{'height': '50vh'}}>
              <LoaderCorousel />
            </div>}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Favourite;
