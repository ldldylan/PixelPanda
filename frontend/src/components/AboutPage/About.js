import './About.css';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import dilang from '../../assets/dilang.jpg'
import kenny from '../../assets/kenny.jpg'
import githubIcon from '../../assets/github-icon.png'
import linkedinIcon from '../../assets/linkedin-icon.png'
function About(){
    return (<>
        <div className='about-page'>
            <NavBar/>
            <div className='team-member-container'>
                <div className='team-member'>
                    <div className='member-image-box'><img className='member-image' src={dilang}/></div>
                    <div className='member-description'>
                        <div className='member-name'>
                            <h1>Dilang Lin</h1>
                            <div className='about-icons'>
                                <a href="https://github.com/ldldylan" target="_blank"><img src={githubIcon} className='github-icon'/></a>
                                <a href="https://www.linkedin.com/in/dilanglin/" target="_blank"><img src={linkedinIcon} className='linkedin-icon'/></a>
                            </div>
                            </div>
                        <div className='member-text'><p>About yourself or project duties go here? About yourself or project duties go here? About yourself or project</p></div>
                    </div>
                    <div className='empty-div'></div>
                </div>
                <div className='team-member'>
                    <div className='empty-div'></div>
                    <div className='member-description'>
                        <div className='member-name'>
                            <h1>Kenny Tram</h1>
                            <div className='about-icons'>
                                <a href="https://github.com/kennytram/" target="_blank"><img src={githubIcon} className='github-icon'/></a>
                                <a href="https://www.linkedin.com/in/kennytram/" target="_blank"><img src={linkedinIcon} className='linkedin-icon'/></a>
                            </div>
                            </div>
                        <div className='member-text'><p>About yourself or project duties go here? About yourself or project duties go here? About yourself or project duties go here? About yourself or project duties go here? About yourself or project duties go here? About yourself or project duties go here? About yourself or project duties go here?</p></div>
                    </div>
                    <div className='member-image-box'><img className='member-image' src={kenny} /></div>
                </div>
                <div className='team-member'>
                    <div className='member-image-box'><img className='member-image' src={kenny} /></div>
                    <div className='member-description'>
                        <div className='member-name'>
                            <h1>James Wu</h1>
                            <div className='about-icons'>
                                <a href="https://github.com/wuyuwenj/" target="_blank"><img src={githubIcon} className='github-icon'/></a>
                                <a href="https://www.linkedin.com/in/james-wu-5a609520a/" target="_blank"><img src={linkedinIcon} className='linkedin-icon'/></a>
                            </div>
                            </div>
                        <div className='member-text'><p>About yourself or project duties go here? About yourself or project duties go here? About yourself or project duties go here? About yourself or project duties go here? About yourself or project duties go here? About yourself or project duties go here? About yourself or project duties go here?</p></div>
                    </div>
                    <div className='empty-div'></div>
                </div>
            </div>
            <Footer/>
        </div>
    </>)
}
export default About;