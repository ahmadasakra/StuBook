import React from 'react';
import style from './Footer.module.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <div className={style.footer}>
      <div className={style.footerContent}>
        <div className={style.footerSection}>
          <div className={style.footerSecA}>
            <h2>Quicklinks</h2>
            <Link to='/'>Startseite</Link>
            <Link to='/search'>Suche</Link>
            <Link to='/user'>Profil</Link>
            <Link to='/favorites'>Favoritinnen</Link>
            <Link to='/reviews'>Rezensionen</Link>
            <Link to='/about'>Über uns</Link>
          </div>
          <div className={style.footerSecA}>
            <h2>Kategorien</h2>
            <Link to='/category/All'>Alle Bücher</Link>
            <Link to='/category/Informatik'>Informatik</Link>
            <Link to='/category/BWL'>BWL</Link>
            <Link to='/category/Bauingenieurwesen'>Bauingenieurwesen</Link>
          </div>
          <div className={style.footerSecB}>
            <h2>Kontaktiere uns</h2>
            <p>Wenn Sie Buchdetails haben, die auf unserer Plattform nicht verfügbar sind, informieren Sie uns bitte.</p>
            <Link to='/sendInfo'>Klicken Sie hier, um uns zu benachrichtigen us</Link>
          </div>
        </div>
        <div className={style.footerCopyright}>
          <div className={style.copyright}>
            <p>&copy; {new Date().getFullYear()} StuBook. Alle Rechte vorbehalten</p>
          </div>
          <div className={style.SocialFooter}>
            <a href='https://www.stubook.de/' rel='noreferrer' target='_blank'>
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a href='https://www.stubook.de/' rel='noreferrer' target='_blank'>
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href='https://www.instagram.com/studbook.saarland/' rel='noreferrer' target='_blank'>
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
