import React from 'react';
import { urlbook } from '../../Appurl';
import style from './BookAddForm.module.css';
import { callMessage } from '../../components/Alert/CallMessage';

function BookAddForm() {
  const submitbook = (event) => {
    event.preventDefault();
    fetch(event.target.action, {
      method: 'POST',
      headers: { 'auth_token': `${localStorage.getItem('adminToken')}` },
      body: new FormData(event.target),
    })
      .then((resp) => {
        return resp.json();
      })
      .then((body) => {
        if (body.status === 0) {
          callMessage('Success', 'Buch erfolgreich hinzugefügt !');
        } else if (res.status === -10) {
          localStorage.removeItem('adminToken');
          window.location.reload();
        } else {
          callMessage('Oops', 'Buch konnte nicht hinzugefügt werden');
        }
      })
      .catch((error) => {
        callMessage('Oops', 'Buch konnte nicht hinzugefügt werden');
      });
  };

  return (
    <div>
      <div className={style.addbook}>
        <h4>Neues Buch hinzufügen</h4>
        <form
          action={`${urlbook}/addbook`}
          method="post"
          onSubmit={(e) => submitbook(e)}
          encType="multipart/form-data"
        >
          <div>
            <label htmlFor="contactName">Kontaktname</label>
            <input type="text" id="contactName" name="contactName" placeholder='Kontaktname' />
          </div>
          <div>
            <label htmlFor="email">E-Mail</label>
            <input type="email" id="email" name="email" placeholder='E-Mail' />
          </div>

          <div>
            <label htmlFor="title">Titel</label>
            <input type="text" id="title" name="title" placeholder='Titel' />
          </div>
          <div>
            <label htmlFor="author">Autorenname</label>
            <input type="text" id="author" name="author" placeholder='Autorenname' />
          </div>
          <div>
            <label htmlFor="language">Sprache</label>
            <select id="language" name="language">
              <option value="Deutsch">Deutsch</option>
              <option value="Englisch">Englisch</option>
              {/* Weitere Sprachen hier */}
            </select>
          </div>
          <div>
            <label htmlFor="angebot">Angebot</label>
            <select id="angebot" name="angebot">
              <option value="Verkaufen">Verkaufen</option>
              <option value="Vermieten">Vermieten</option>
              {/* Weitere Optionen hier */}
            </select>
          </div>

          <div>
            <label htmlFor="publication">Veröffentlichung</label>
            <input type="text" id="publication" name="publication" placeholder='Veröffentlichung' />
          </div>
          <div>
            <label htmlFor="publication">Preis €</label>
            <input type="text" id="preis" name="preis" placeholder='Preis €' />
          </div>

          <div>
            <label htmlFor="category">Kategorie</label>
            {/* <input type='text' id='category' name='category' /> */}
            <select id="category" name="category">
              <option value="Select">Wählen</option>
              <option value="Novel">Novel</option>
              <option value="Story">Story</option>
            </select>
          </div>

          <div>
            <label htmlFor="img">Image</label>
            <input type="file" id="img" name="img" required />
          </div>

          <div>
            <input type="submit" value="Einreichen" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookAddForm;
