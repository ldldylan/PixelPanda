import './Loading.css';
import panda from '../../assets/panda-icon.png'

export const Loading = () => {

    return (
        <div className='LoadingDiv'>
            <img src={panda} id="pandaLoader" />
            <p className='loadingText'>Our pandas are busy writing code and making your experience exceptional...!</p>
        </div>
    )
}

export default Loading;