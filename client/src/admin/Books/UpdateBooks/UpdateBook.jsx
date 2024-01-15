import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { urlbook } from '../../../Appurl';
import { callMessage } from '../../../components/Alert/CallMessage';
import FetchImage from '../../../specialFunction/FetchImage';
import style from './UpdateBook.module.css';

function UpdateBook() {
  const location = useLocation();
  const [bookInfo, updateBookInfo] = useState({
    language: '',
    publication: '',
    category: '',
    contactName: '',
    email: '',
  });

  let url = location.pathname;
  url = url.replace(/%20/g, ' ');
  let arrdata = url.split('/');
  let bookid = arrdata[3];
  let booktitle = arrdata[4];
  let bookauthor = arrdata[5];

  const fetchBookDetail = async () => {
    url = location.pathname;
    url = url.replace(/%20/g, ' ');
    arrdata = url.split('/');
    bookid = arrdata[3];
    booktitle = arrdata[4];
    bookauthor = arrdata[5];
    await fetch(`${urlbook}/onebook/id`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        id: bookid,
        title: booktitle,
        author: bookauthor,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 0) {
          updateBookInfo({
            ...bookInfo,
            language: res.data.language,
            category: res.data.category,
            publication: res.data.publication,
            contactName: res.data.contactName,
            email: res.data.email,     
          });
        } else {
          callMessage('Server Error', 'Details können nicht abgerufen werden');
        }
      })
      .catch((err) => {
        callMessage('Server Error', 'Details können nicht abgerufen werden');
      });
  };

  const updateBookImage = (event) => {
    event.preventDefault();
    fetch(event.target.action, {
      method: 'POST',
      headers: {
        id: bookid,
        title: booktitle,
        auth_token: `${localStorage.getItem('adminToken')}`,
      },
      body: new FormData(event.target),
    })
      .then((resp) => {
        return resp.json();
      })
      .then((body) => {
        if (body.status === 0) {
          callMessage('', 'Buchaktualisierung erfolgreich');
          window.location.reload();
        } else if (res.status === -10) {
          localStorage.removeItem('adminToken');
          window.location.reload();
        } else {
          callMessage('Oops', 'Aktualisierung nicht möglich book');
        }
      })
      .catch((error) => {
        callMessage('Oops', 'Aktualisierung nicht möglich book');
      });
  };

  const updateDataBook = (e) => {
    updateBookInfo({
      ...bookInfo,
      [e.target.name]: e.target.value,
    });
  };
  const deleteBook = async () => {
    try {
      const response = await fetch(`${urlbook}/deletebook/${bookid}`, {
        method: 'DELETE',
        headers: {
          'auth_token': `${localStorage.getItem('adminToken')}`,
        },
      });
      const result = await response.json();
      if (result.status === 0) {
        callMessage('Success', 'Book deleted successfully');
        // Redirect or update UI as needed
      } else {
        callMessage('Error', 'Unable to delete book');
      }
    } catch (error) {
      callMessage('Error', 'Unable to delete book');
    }
  };
  const handleDelete = async () => {
    if (window.confirm('Sind Sie sicher, dass Sie dieses Buch löschen möchten?')) {
      await deleteBook();
    }
  };

  const sendUpdateDataBook = () => {
    fetch(`${urlbook}/update/data`, {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
        'id': bookid,
        'auth_token': `${localStorage.getItem('adminToken')}`,
      },
      body: JSON.stringify(bookInfo),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 0) {
          callMessage('Erfolgreich', 'Daten aktualisiert');
        } else if (res.status === -10) {
          localStorage.removeItem('adminToken');
          window.location.reload();
        } else {
          callMessage('Oops', 'Aktualisierung nicht möglich');
        }
      })
      .catch((err) => {
        callMessage('Oops', 'Aktualisierung nicht möglich');
      });
  };

  useEffect(() => {
    return () => {
      fetchBookDetail();
    };
  }, []);

  return (
    <div className={style.UpdateBook}>
      <div className={style.ImageUpdate}>
        <div className={style.UpdatebookImage}>
          <FetchImage title={booktitle} id={bookid} />
        </div>
        <div>
          <form action={`${urlbook}/update/image`} method="post"
            onSubmit={(e) => updateBookImage(e)}
            encType="multipart/form-data">
            <div>
              <label htmlFor="img">Bild</label>
              <input type="file" id="img" name="img" />
            </div>
            <div>
              <input type="submit" value="Update" />
            </div>
          </form>
        </div>
      </div>
      <div className={style.DataUpdate}>
        <div>
          Titel : <span>{booktitle}</span>
        </div>
        <div>
          Autor : <span>{bookauthor}</span>
        </div>
        <div>
          Sprache : <input type="text" name="language" value={bookInfo.language} onChange={(e) => updateDataBook(e)} />
        </div>
        <div>
          Kategorie : <select id="category" name="category" onChange={(e) => updateDataBook(e)}>
            <option value={bookInfo.category}>{bookInfo.category}</option>
            <option value="Novel">Novel</option>
            <option value="Story">Story</option>
          </select>
        </div>
        <div>
          Publication : <input type="text" name="publication" value={bookInfo.publication} onChange={(e) => updateDataBook(e)} />
        </div>
        <div>
          Kontaktname : <input type="text" name="contactName" value={bookInfo.contactName} onChange={(e) => updateDataBook(e)} />
        </div>
        <div>
          E-Mail : <input type="email" name="email" value={bookInfo.email} onChange={(e) => updateDataBook(e)} />
        </div>

        <div>
          <button onClick={sendUpdateDataBook}>Aktualisieren</button>
          <button onClick={handleDelete}>Buch löschen</button>
        </div>
      </div>
    </div>
  );
}

export default UpdateBook;
