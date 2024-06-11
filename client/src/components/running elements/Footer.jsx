import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import "./Footer.css"

function Footer() {

  return (
    <>
      <hr />
      <footer className="footer">
        <div className='link-container'>
          <a href="https://github.com/9Andras"
            target="_blank"
            rel="noopener noreferrer"
            className='link'
            title='Check out my Github profile'>
            <FontAwesomeIcon icon={faGithub} size='2x' />
          </a>
          <a href="https://www.linkedin.com/in/andrás-fuksz"
            target="_blank"
            rel="noreferrer"
            className='link'
            title="Check my LinkedIn profile">
            <FontAwesomeIcon icon={faLinkedin} size='2x' />
          </a>
          <a href="/cv/András Fuksz English CV.pdf"
            download
            className='link'
            title='Download my CV'>
            <FontAwesomeIcon icon={faDownload} size="2x" />
          </a>
        </div>
        <div className='contact-list'>
          <h3>Contact</h3>
          <ul>
            <li>Email: <a href='mailto: fuksz.andras9@gmail.com'>fuksz.andras9@gmail.com</a></li>
            <li>Phone: +36305988400</li>
            <li>Location: Budapest, Hungary</li>
          </ul>
        </div>
      </footer>
    </>
  );
}

export default Footer;