import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import style from '../Private/css/Review.module.css';
import {useSelector} from 'react-redux';
import {useNavigate, Link, useLocation} from 'react-router-dom';
import {authToken, urlreviewbook} from '../Appurl';
import {createreviewStar} from '../specialFunction/CreateReviewStar';
import {callMessage} from './Alert/CallMessage';


function Review(props) {
  const location = useLocation();
  const {bookid, bookname} = props;
  const navigate = useNavigate();
  const IsLogin = useSelector((state) => state.user.login);
  const isEmailVerify = useSelector((state) => state.user.isEmail);
  const [cntStar, updateStar] = useState(0);
  const [reviewdata, updatereview] = useState('');
  const [message, updatemessage] = useState('');
  const [fetchReviewData, updatefetchReviewData] = useState([]);


  const starreview = (e) => {
    let star = document.getElementById('star');
    star = star.children;
    if (cntStar < e) {
      for (let i = 0; i < e; i++) {
        star[i].className = style.yesstar;
      }
      updateStar(e);
    } else {
      for (let i = 4; i >= e - 1; i--) {
        star[i].className = style.nostar;
      }
      updateStar(e - 1);
    }
  };

  const sendResponseReview = () => {
    if (!IsLogin) {
      navigate('/login');
    }
    if (isEmailVerify === false) {
      navigate('/email/verify');
    }

    if (reviewdata.length < 4) {
      updatemessage('Please Write at least four letters');
      return;
    }
    if (cntStar === 0) {
      updatemessage('Please give star rating');
      return;
    }

    updatemessage('');

    fetch(`${urlreviewbook}/addreview`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth_token': authToken,
      },
      body: JSON.stringify({
        bookid,
        star: cntStar,
        bookname: bookname,
        review: reviewdata,
      }),
    })
        .then((res) => res.json())
        .then((res) => {
          if (res.status === 0) {
            updatemessage('Zu den Bewertungen hinzugefügt');
            callMessage('Erfolgreich', 'Zu den Bewertungen hinzugefügt');
            fetchReview();
            updatereview('');
          } else {
            updatemessage('Sorry, Unable to add');
            callMessage('Server Error', 'Unable to Add your reviews');
          }
        })
        .catch(()=>{
          callMessage('Server Error', 'Unable to Add your reviews');
        });
  };

  const fetchReview = () => {
    fetch(`${urlreviewbook}/sendreview/${bookid}`)
        .then((res) => res.json())
        .then((res) => {
          if (res.status === 0) {
            updatefetchReviewData(res.data);
          }
        }).catch(()=>{
          callMessage('Server Error', 'Unable to fetch detail');
        });
  };

  useEffect(() => {
    fetchReview();
  }, [location]);


  return (
    <div>
      <h1 className={style.reviewheading}>Rezensionen</h1>
      <div className={style.reviews}>
        {fetchReviewData.length === 0 ? <h1> Seien Sie der Erste, der eine Bewertung abgibt </h1> :
          fetchReviewData.map((e) => {
            return <div className={style.ViewerReview} key={e.id}>
              <div className={style.ViewerReviewText}>{e.reviewmessage}</div>
              <div className={style.ViewerStar}>
                <p><span>By</span> {e.username}</p>
                {/* {createreviewStar(e.star)} */}
                {createreviewStar(e.star)}
              </div>
            </div>;
          })
        }
      </div>
      <div className={style.UserReview}>
        <p>Geben Sie Ihre Bewertung ab</p>
        <p>{message}</p>
        <div id='star'>
          <span className={style.nostar} onClick={() => starreview(1)}><FontAwesomeIcon icon={faStar} /></span>
          <span className={style.nostar} onClick={() => starreview(2)} ><FontAwesomeIcon icon={faStar} /></span>
          <span className={style.nostar} onClick={() => starreview(3)} ><FontAwesomeIcon icon={faStar} /></span>
          <span className={style.nostar} onClick={() => starreview(4)} ><FontAwesomeIcon icon={faStar} /></span>
          <span className={style.nostar} onClick={() => starreview(5)} ><FontAwesomeIcon icon={faStar} /></span>
        </div>
        <textarea className={style.writereview} value={reviewdata} onChange={(e) => updatereview(e.target.value)} />
        <button type='button' onClick={sendResponseReview} > Hinzufügen </button>
        <p>
          <Link to='/user'>Sehen Sie sich hier Ihre gesamte Rezension an</Link>
        </p>
      </div>
    </div>
  );
}

export default Review;
