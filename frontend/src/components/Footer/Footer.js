import './Footer.css';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHub from '@mui/icons-material/GitHub';

function Footer() {
    return (
      <div className="footer">
        <div className="footer-content">
            Copyright @ 2023 Pixel Panda   
            <div>About · <GitHubIcon/> <LinkedInIcon/></div>
        </div>
      </div>
    );

};

export default Footer;