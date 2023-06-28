import './About.css';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import dilang from '../../assets/dilang.jpg'
import kenny from '../../assets/kenny.jpg'
import james from '../../assets/james.png'
import githubIcon from '../../assets/github-icon.png'
import linkedinIcon from '../../assets/linkedin-icon.png'
function About() {
    return (<>
        <div className='about-page'>
            <NavBar />
            <div className='team-member-container'>
                <div className='team-member'>
                    <div className='member-image-box'><img className='member-image' src={dilang} /></div>
                    <div className='member-description'>
                        <div className='member-name'>
                            <div className='name-and-role'>
                                <h1>Dilang Lin</h1>
                                <h2 className='member-role'>Project Lead / Flex</h2>
                            </div>
                            <div className='about-icons'>
                                <a href="https://github.com/ldldylan" target="_blank"><img src={githubIcon} className='github-icon' /></a>
                                <a href="https://www.linkedin.com/in/dilanglin/" target="_blank"><img src={linkedinIcon} className='linkedin-icon' /></a>
                            </div>
                        </div>
                        <div className='member-text'><p>As a full-stack developer, I am passionate about building web applications that are not only aesthetically pleasing but also highly functional. My expertise in both front-end and back-end technologies has given me a comprehensive understanding of full-stack development. I am a highly motivated self-starter who thrives in collaborative environments. I believe in the power of teamwork and effective communication to deliver top-quality products. Outside of work, I enjoy playing badminton and indulging in Beat Saber. Please feel free to browse my <a href="https://ldldylan.github.io/Portfolio/" target="_blank">portfolio</a> or contact me via <a href="mailto:dilang@berkeley.edu">email</a> for any inquiries.</p></div>
                    </div>
                    <div className='empty-div'></div>
                </div>
                <div className='team-member'>
                    <div className='empty-div'></div>
                    <div className='member-description'>
                        <div className='member-name'>
                            <div className='name-and-role'>
                                <h1>Kenny Tram</h1>
                                <h2 className='member-role'>Code Wrangler and Master of All Things Stack-tastic</h2>
                            </div>
                            <div className='about-icons'>
                                <a href="https://github.com/kennytram/" target="_blank"><img src={githubIcon} className='github-icon' /></a>
                                <a href="https://www.linkedin.com/in/kennytram/" target="_blank"><img src={linkedinIcon} className='linkedin-icon' /></a>
                            </div>
                        </div>
                        <div className='member-text'><p>As a full stack software engineer, I'm equally comfortable working on the front-end and back-end of web applications. I'm fluent in a variety of programming languages and technologies,
                            and I love nothing more than diving into a new stack and mastering it from top to bottom. But I'm not just a code wrangler - I'm also a problem solver. I thrive on finding elegant solutions to complex challenges, and I always go
                            above and beyond to ensure that my code is not only functional, but also scalable, maintainable, and easy to read. When I'm not wrangling code, I'm probably trying out a new recipe in the kitchen.</p>
                        </div>
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
                                <a href="https://github.com/wuyuwenj/" target="_blank"><img src={githubIcon} className='github-icon' /></a>
                                <a href="https://www.linkedin.com/in/james-wu-5a609520a/" target="_blank"><img src={linkedinIcon} className='linkedin-icon' /></a>
                            </div>
                        </div>
                        <div className='member-text'><p>I am a passionate software engineer based in San Francisco, and I enjoy tackling complex challenges and finding innovative solutions. Whether at work or in my personal life, I strive to optimize and streamline processes to achieve the best possible results. When I'm not coding, you will probably find me training Muay Thai, running, or hiking. These activities help me stay grounded and connected to the world around me.</p></div>
                    </div>
                    <div className='empty-div'></div>
                </div>
            </div>
            <Footer />
        </div>
    </>)
}
export default About;