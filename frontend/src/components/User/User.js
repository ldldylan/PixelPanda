import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUser } from "../../store/users";
import artworksReducer, { fetchUserArtworks } from "../../store/artworks";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import EmailIcon from '@mui/icons-material/Email';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { addNewCartItem } from '../../store/cartItems';
import { fetchCartItems } from '../../store/cartItems';
import './User.css'

function User() {
    const dispatch = useDispatch();
    const {userId} = useParams();
    const user = useSelector(state => state.users)
    const artworks = useSelector((state) => state.artworks);
    const history = useHistory();
    const currentUser = useSelector((state) => state.session.user)
    const cartItems = useSelector((state) => state.cartItems)

    useEffect(()=>{
        dispatch(fetchUser(userId));
        dispatch(fetchUserArtworks(userId));
        dispatch(fetchCartItems());
    },[dispatch, userId])

    const [isLiked, setIsLiked] = useState(false);
    const handleLikeClick = () => {
        setIsLiked(!isLiked);
    };

    const handleAddCartItem = artworkId => e => {
        e.preventDefault();
        if (currentUser) {
            // dispatch(addNewCartItem('64135f6a41cc536e7d352a07', '64135f6941cc536e7d3529c5'))
            // debugger
            const artworkArray = Object.values(cartItems).map((item) => item.artwork);
            // console.log(artworkArray, "artworkArray")
            if (!artworkArray.includes(artworkId))
            dispatch(addNewCartItem({artwork: artworkId}, currentUser._id));
            else alert('Artwork is already in your cart!')
        }
        else {
            // debugger
            history.push('/login')
        };
    }

    return (<>
        <NavBar/>
        <div className="user">
            <div className="user-main">
                <div className="user-image-container">
                    <img 
                    src={user?.profileImageUrl ? user.profileImageUrl : null}
                    style={{ 
                    backgroundRepeat: "no-repeat", 
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    objectFit: "cover"  }} 
                    className="user-image"/>
                    <button className="msg-user-button"><EmailIcon/></button>
                    <button className="like-user-button"
                    onClick={handleLikeClick}
                    style={{ color: isLiked ? 'blue' : 'white'}}><ThumbUpIcon/></button>
                </div>
                <div className="user-info">
                    <div className="user-author">
                        Welcome to <br/>
                        {user?.email ? user.email.split('@')[0] : "Mysterious Artist"}'s profile page
                    </div>
                </div>
            </div>
            <div className="user-artworks-container">
                {user?.email ? user.email.split('@')[0] : "Mysterious Artist"}'s Artworks
                <div className="divider user-show"/>
                <ul className="user-artworks">
                    {/* {console.log(artworks ? artworks : null)} */}
                    {Object.keys(artworks).length === 0 ? null : Object.keys(artworks).map(key => (
                    <li key={artworks[key]._id} 
                    className="asset-item"
                    >
                        {artworks[key].author._id === userId ? (<div>
                        <FavoriteBorderIcon className="favorite-item-icon"/>
                        <div className="artwork-image-container">
                        <img
                        src= {artworks[key]?.ArtworkImageUrl ? artworks[key].ArtworkImageUrl : null} 
                        style={{
                        display: "block",
                        margin: "0 auto", 
                        backgroundRepeat: "no-repeat", 
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        objectFit: "cover" }} 
                        className="artwork-preview-image-user-show"
                        onClick={()=> history.push(`/artworks/${artworks[key]._id}`)}/>
                        </div>
                        <div className="artwork-name"
                        onClick={()=> history.push(`/artworks/${artworks[key]._id}`)}><p>{artworks[key].name}</p></div>
                        <div className="artwork-artist">{artworks[key]?.author?.email ? artworks[key].author.email.split('@')[0] : null}</div>
                        <div className="artwork-price-cart">
                        <div className="artwork-price"><p>${artworks[key].price}</p></div>
                        <div onClick={handleAddCartItem(artworks[key]._id)}>
                            <AddShoppingCartIcon />
                        </div>
                        </div>
                        </div>) : null}
                    </li>
                    ))}
                </ul>
            </div>
            {/* <div className="user-profile">
                <label className="email-profile">Email: <span>{user?.email ? user.email.split('@')[0] : ""}</span></label>
                <img
                src= {user?.profileImageUrl ? user.profileImageUrl : null}
                style={{ 
                backgroundRepeat: "no-repeat", 
                backgroundSize: "contain",
                backgroundPosition: "center",
                objectFit: "cover" }} 
                className="artwork-preview-image"/>
            </div>
            <div className="user-artworks-container">
                <ul className="user-artworks">
                    {console.log(artworks ? artworks : null)}
                    {artworks ? artworks.map(artwork => (
                       <li key={artwork._id} 
                       className="asset-item"
                       >
                         <FavoriteBorderIcon className="favorite-item-icon"/>
                         <img
                         src= {artwork.ArtworkImageUrl} 
                         style={{ 
                           backgroundRepeat: "no-repeat", 
                           backgroundSize: "contain",
                           backgroundPosition: "center",
                           objectFit: "cover" }} 
                           className="artwork-preview-image"
                           onClick={()=> history.push(`/artworks/${artwork._id}`)}/>
                         <div className="artwork-name"
                         onClick={()=> history.push(`/artworks/${artwork._id}`)}><p>{artwork.name}</p></div>
                         <div className="artwork-artist">{artwork.author.email}</div>
                         <div className="artwork-price-cart">
                           <div className="artwork-price"><p>${artwork.price}</p></div>
                           <AddShoppingCartIcon/>
                         </div>
                       </li>
                    )) : null }
                </ul>
            </div> */}

        </div>
        <Footer/>
    </>);
}

export default User;