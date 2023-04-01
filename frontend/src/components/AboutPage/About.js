import './About.css';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import dilang from '../../assets/dilang.jpg'
import kenny from '../../assets/kenny.jpg'
import james from '../../assets/james.png'
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
                            <div className='name-and-role'>
                                <h1>Dilang Lin</h1>
                                <h2 className='member-role'>Project Lead / Flex</h2>
                            </div>
                            <div className='about-icons'>
                                <a href="https://github.com/ldldylan" target="_blank"><img src={githubIcon} className='github-icon'/></a>
                                <a href="https://www.linkedin.com/in/dilanglin/" target="_blank"><img src={linkedinIcon} className='linkedin-icon'/></a>
                            </div>
                            </div>
                        <div className='member-text'><p>As a full-stack developer, I am passionate about building web applications that are not only aesthetically pleasing but also highly functional. I am a highly motivated self-starter who thrives in collaborative environments. I believe in the power of teamwork and effective communication to deliver top-quality products. Outside of work, I enjoy playing badminton and indulging in Beat Saber. Please feel free to browse my <a href="https://ldldylan.github.io/Protfolio/" target="_blank">portfolio</a> or contact me via <a href="mailto:dilang@berkeley.edu">email</a> for any inquiries.</p></div>
                    </div>
                    <div className='empty-div'></div>
                </div>
                <div className='team-member'>
                    <div className='empty-div'></div>
                    <div className='member-description'>
                        <div className='member-name'>
                            <div className='name-and-role'>
                                <h1>Kenny Tram</h1>
                                <h2 className='member-role'>Frontend Lead</h2>
                            </div>
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
                    <div className='member-image-box'><img className='member-image' src={james} /></div>
                    <div className='member-description'>
                        <div className='member-name'>
                            <div className='name-and-role'>
                                <h1>James Wu</h1>
                                <h2 className='member-role'>Backend Lead</h2>
                            </div>
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