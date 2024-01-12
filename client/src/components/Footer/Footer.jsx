import React from 'react';
import style from './Footer.module.css';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import '@fortawesome/free-brands-svg-icons';
import {faGithub, faInstagram, faLinkedin} from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <div className="footer-container">
      <div className={style.footer}>
        <div className={style.footerSection}>
          <div className={style.footerSecA}>
            <Link to='/'>Startseite</Link>
            <Link to='/search'>Suche</Link>
            <Link to='/user'>Profil</Link>
            <Link to='/favourite'>Favorit</Link>
            <Link to='/user'>Rezensionen</Link>
            <Link to='/about'>Über Uns</Link>
          </div>
          <div className={style.footerSecA}>
            <Link to='/category/All'>Alle Bücher</Link>
            <Link to='/category/Novel'>Novel</Link>
            <Link to='/category/Story'>Story</Link>
          </div>
          <div className={style.footerSecA}>
          </div>
          <div className={style.footerSecB}>
            <p>
            Wenn Sie Buchdetails haben, die auf unserer Plattform nicht verfügbar sind. Sie können uns informieren
            </p>
            <Link to='/sendInfo' >Klicken Sie hier</Link>
          </div>
        </div>
        <div className={style.footerCopyright}>
          <div className={style.copyright}>
            <a rel="noreferrer" href='https://github.com/ahmadasakra/' target='_blank'>STUDBOOK</a>
            <p>Alle Rechte vorbehalten</p>
          </div>
          <div className={style.SocialFooter}>
            <a href='https://github.com/ahmadasakra' rel="noreferrer" target='_blank'>
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a href='https://www.linkedin.com/in/aasakra/' rel="noreferrer" target='_blank'>
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href='https://www.instagram.com/ahmadasakra/' rel="noreferrer" target='_blank'>
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
