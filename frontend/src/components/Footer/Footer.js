import './Footer.css';
import { Link, NavLink } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHub from '@mui/icons-material/GitHub';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import { useSelector } from 'react-redux';
import dilang from '../../assets/dilang.jpg'
import kenny from '../../assets/kenny.jpg'

function Footer() {
  const user = useSelector(state => state.session.user);

  return (
    <div className="footer">
      <div className="footer-socials">
        <div className="footer-copyright">
          <div>Copyright @ 2023 Pixel Panda</div>
        </div>
        <div className="footer-content">
          <div className="profile">
            <div className="profile-image-container">
              <img src={dilang}
              style={{left: '0'}}
              className='profile-image' alt="profile" />
            </div>
            <div className="profile-info">
              <div className="profile-name">Dilang Lin</div>
              <div className="profile-links">
                <a href="https://github.com/ldldylan" target="_blank">
                  <GitHubIcon />
                </a>
                <a href="https://www.linkedin.com/in/dilanglin/" target="_blank">
                  <LinkedInIcon />
                </a>
              </div>
            </div>
          </div>
          <div className="profile">
            <div className="profile-image-container">
              <img 
              src={kenny}
              style={{scale: '240%', top: '11px'}}
              className='profile-image' alt="profile" />
            </div>
            <div className="profile-info">
              <div className="profile-name">Kenny Tram</div>
              <div className="profile-links">
                <a href="https://github.com/kennytram/" target="_blank">
                  <GitHubIcon />
                </a>
                <a href="https://www.linkedin.com/in/kennytram/" target="_blank">
                  <LinkedInIcon />
                </a>
              </div>
            </div>
          </div>
          <div className="profile">
            <div className="profile-image-container">
              <img src={dilang} className='profile-image' alt="james" />
            </div>
            <div className="profile-info">
              <div className="profile-name">James Wu</div>
              <div className="profile-links">
                <a href="https://github.com/wuyuwenj/" target="_blank">
                  <GitHubIcon />
                </a>
                <a href="https://www.linkedin.com/in/james-wu-5a609520a/" target="_blank">
                  <LinkedInIcon />
                </a>
              </div>
            </div>
          </div>
          {/* <div><Link to={'/about'}>About Us</Link></div>
            <a href="https://github.com/ldldylan/PixelPanda" target="_blank"><GitHubIcon/></a> */}
        </div>
      </div>
      <div className="signup-button-container">
        {user ? <div /> : <div><Link to={'/signup'}> <Diversity3Icon /> Sign Up</Link></div>}
      </div>
    </div>
  );

};

export default Footer;