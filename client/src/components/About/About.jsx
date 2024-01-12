import React from 'react';
import Footer from '../Footer/Footer';
import style from '../About/About.module.css';

function About() {
  return (
    <>
      <div className={style.about}>
        <h3>Willkommen auf unserer Buchtausch-Plattform für Studenten</h3>
        <div className={style.aboutDiv}>
          <h4>Wer wir sind</h4>
          <p>
            Unsere Plattform widmet sich dem Buchtausch speziell für Studenten. Wir sind eine Gemeinschaft, die das Lesen fördert und dabei hilft, Ressourcen zu schonen und Wissen zu teilen. Unser Ziel ist es, eine praktische und nachhaltige Möglichkeit zu bieten, Bücher auszutauschen, die für das Studium oder das persönliche Interesse wichtig sind.
          </p>
        </div>
        <div className={style.aboutDiv}>
          <h4>Wie es funktioniert</h4>
          <ul>
            <li>Durchstöbern Sie die auf unserer Plattform verfügbaren Bücher und finden Sie die Titel, die Sie für Ihr Studium oder Ihre persönliche Weiterbildung benötigen.</li>
            <li>
                Tauschen Sie Bücher mit anderen Studenten aus. Stellen Sie Bücher ein, die Sie nicht mehr benötigen, und tauschen Sie sie gegen solche, die Sie lesen möchten.
            </li>
            <li>
                Profitieren Sie von einem Gemeinschaftsgefühl und der Unterstützung durch andere Studenten, die ähnliche akademische Interessen und Herausforderungen haben.
            </li>
          </ul>
        </div>
        <div className={style.aboutDiv}>
          <h4>Wie wir entstanden sind</h4>
          <p>
            Die Idee für unsere Buchtausch-Plattform entstand aus der Notwendigkeit heraus, Studierenden eine kostengünstige und umweltfreundliche Option zum Erwerb und Tausch von Studienmaterialien zu bieten. Mit einem Fokus auf Einfachheit und Benutzerfreundlichkeit wurde die Plattform mit React für das Frontend und Node.js sowie Express für das Backend entwickelt. Wir arbeiten stetig daran, unsere Plattform zu verbessern, um eine nahtlose, sichere und angenehme Erfahrung für alle Nutzer zu gewährleisten.
          </p>
        </div>
        <div className={style.aboutLine}>
        Tauschen Sie Bücher, teilen Sie Wissen und sparen Sie Ressourcen. Machen Sie mit bei unserer Buchtausch-Plattform für Studenten und erleben Sie eine neue Art des Lernens und Teilens.
        </div>
      </div>
      <Footer/>
    </>

  );
}

export default About;
