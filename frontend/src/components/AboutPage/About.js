import './About.css';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
function About(){
    return (<>
        <div className='about-page'>
            <NavBar/>
            <div className='team-member'>
                <div className='member-image'></div>
                <div className='member-text'></div>
            </div>
            <div className='team-member'>
                <div className='member-image'></div>
                <div className='member-text'></div>
            </div>
            <div className='team-member'>
                <div className='member-image'></div>
                <div className='member-text'></div>
            </div>
            <div id='about-page-footer'>
                <Footer/>
            </div>
        </div>
    </>)
}
export default About;