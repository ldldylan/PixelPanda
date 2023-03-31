import './About.css';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import dilang from '../../assets/dilang.jpg'
import kenny from '../../assets/kenny.jpg'
function About(){
    return (<>
        <div className='about-page'>
            <NavBar/>
            <div className='team-member-container'>
                <div className='team-member'>
                    <div className='member-image-box'><img className='member-image' src={dilang}/></div>
                    <div className='member-text'><p>Exquis is a collaborative story-telling app, where users can create “skeletons” and add collaborators, who take turns adding “bones” to the skeleton. Exquis is inspired by the surrealist technique known as “exquisite corpse,” where participants take turns adding piece by piece to a dynamic, evolving collective art piece. At Exquis we believe more minds = more fun. Watch your skeletons grow and unfold into unpredictable and unique works of art. Build beautiful stories and experiences with friends, or build friendships by creating art together.</p></div>
                    <div className='empty-div'></div>
                </div>
                <div className='team-member'>
                    <div className='empty-div'></div>
                    <div className='member-text'><p>Exquis is a collaborative story-telling app, where users can create “skeletons” and add collaborators, who take turns adding “bones” to the skeleton. Exquis is inspired by the surrealist technique known as “exquisite corpse,” where participants take turns adding piece by piece to a dynamic, evolving collective art piece. At Exquis we believe more minds = more fun. Watch your skeletons grow and unfold into unpredictable and unique works of art. Build beautiful stories and experiences with friends, or build friendships by creating art together.</p></div>
                    <div className='member-image-box'><img className='member-image' src={kenny} /></div>
                </div>
                <div className='team-member'>
                    <div className='member-image-box'><img className='member-image' src={dilang} /></div>
                    <div className='member-text'><p>Exquis is a collaborative story-telling app, where users can create “skeletons” and add collaborators, who take turns adding “bones” to the skeleton. Exquis is inspired by the surrealist technique known as “exquisite corpse,” where participants take turns adding piece by piece to a dynamic, evolving collective art piece. At Exquis we believe more minds = more fun. Watch your skeletons grow and unfold into unpredictable and unique works of art. Build beautiful stories and experiences with friends, or build friendships by creating art together.</p></div>
                    <div className='empty-div'></div>
                </div>
            </div>
            <Footer/>
        </div>
    </>)
}
export default About;