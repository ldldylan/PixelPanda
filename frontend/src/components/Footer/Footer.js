import './Footer.css';
import { Link, NavLink } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHub from '@mui/icons-material/GitHub';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import { useSelector } from 'react-redux';

function Footer() {
  const user = useSelector(state => state.session.user);

    return (
      <div className="footer">
        <div className="footer-socials">
          <div className="footer-copyright">
            <div>Copyright @ 2023 Pixel Panda</div>
          </div>
          <div className="footer-content">
            <div>About Us</div>
            <a href="https://github.com/ldldylan/PixelPanda" target="_blank"><GitHubIcon/></a>
          </div>
        </div>
        <div className="signup-button-container">
          {user ? <div/> : <div><Link to={'/signup'}> <Diversity3Icon/> Sign Up</Link></div>}
        </div>
      </div>
    );

};  

export default Footer;