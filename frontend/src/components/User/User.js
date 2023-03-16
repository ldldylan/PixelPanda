import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUsers, getUser } from "../../store/users";
import { fetchUserArtworks, getArtworks } from "../../store/artworks";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import './User.css'

function User() {
    const dispatch = useDispatch();
    const {userId} = useParams();
    const user = useSelector(getUser(userId))
    // const artworks = useSelector(getArtworks);
    const history = useHistory();

    // useEffect(()=>{
    //     dispatch(fetchUsers());
    //     // dispatch(fetchArtworks(userId));
    // },[dispatch, userId])

    return (<>
        <div className="user-show-page">
            <div className="user-profile">
                <label className="email-profile">Email: <span>{user?.email ? user.email : ""}</span></label>
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
                    {/* {artworks.map(artwork => (
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
                    ))} */}
                </ul>
            </div>

        </div>
    </>);
}

export default User;