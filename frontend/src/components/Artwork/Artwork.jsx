import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./Artwork.css";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { fetchArtworks, fetchArtwork } from "../../store/artworks";
import { getArtwork } from "../../store/artworks";
import { NavLink } from "react-router-dom";
import CreateReviewPage from "../Review/Create/createReviewForm";
import { fetchArtworkReviews } from "../../store/reviews";
import Favorite from "@mui/icons-material/Favorite";
function Artwork() {
    const {artworkId} = useParams();
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();
    const params = useParams();
    const history = useHistory();
    const sessionUser = useSelector(state=>state.session.user);

    const [rating, setRating] = useState(0);

    const handleRatingChange = (value) => {
        setRating(value);
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
      };

    const [isFavorited, setIsFavorited] = useState(false);

    const handleButtonClick = () => {
        setIsFavorited(!isFavorited);
    };
    // const artwork = useSelector (state => state.artworks.artwork);
    // console.log(artworkId)

    const handleSubmit = (event) => {
        event.preventDefault();
        // Submit the comment and rating data to your backend server here
    };

    const artwork = useSelector(state => state.artworks[artworkId]);
    // console.log(artwork)
    useEffect(()=> {
        dispatch(fetchArtwork(artworkId));
    },[dispatch, artworkId]) 
    return (
    <>
        <NavBar/>
        <div className="artwork">
            <div className="artwork-main">
                <div className="artwork-image-container">
                    <img 
                    src={artwork?.ArtworkImageUrl ? artwork.ArtworkImageUrl : null}
                    style={{ 
                    backgroundRepeat: "no-repeat", 
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    objectFit: "cover"  }} 
                    className="artwork-image"/>
                </div>
                <div className="artwork-purchase">
                    <div className="artwork-title">
                        {artwork?.name ? artwork.name : "Untitled"}
                    </div>
                    <div className="artwork-author" onClick={()=>history.push(`/users/${artwork.author._id}`)}>
                        {artwork?.author?.email ? artwork.author.email.split('@')[0] : "Mysterious Artist"}
                    </div>
                    <div className="artwork-price">
                        ${artwork?.price ? artwork.price : "3.50"}
                    </div>
                    <div className="divider"/>
                    <div className="artwork-about">
                        About this item:
                        <div className="artwork-desc">
                            {artwork?.description ? artwork.description : "I don't know but I'm sure it is a great product"}
                        </div>
                    </div>
                    <div className="artwork-cart-buy">
                        <div className="artwork-cart">
                            <button>Add to Cart</button>
                        </div>
                        <div className="cart-fav-button">
                            <button onClick={handleButtonClick}
                            style={{ color: isFavorited ? 'red' : 'white', 
                            backgroundColor: '#e23ae8' }}
                            ><Favorite/></button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="cart-separator-empty"/> */}
            <form onSubmit={handleSubmit}>
                <textarea value={comment} onChange={handleCommentChange} placeholder="Write your comment here" />
                <div>
                {[1, 2, 3, 4, 5].map((value) => (
                    <span
                    key={value}
                    onClick={() => handleRatingChange(value)}
                    style={{ color: rating >= value ? 'orange' : 'grey' }}
                    >
                    &#9733;
                    </span>
                ))}
                </div>
                <button type="submit">Submit</button>
            </form>
            <div className="artwork-comments-container">
                <ul className="artwork-comments">
                    {artwork?.comments ? artwork.comments.map(comment => (
                        <li key={artwork.comments.id} className="artwork-comment">{comment}</li>
                    )) : 
                        <li className="artwork-comment">This is good stuff</li>
                    }           
                </ul>
            </div>
        </div>
            <NavLink
                className="link-to-create-review"
                to={`/artworks/${artworkId}/review`}
            >
                Write a customer review
            </NavLink>
        <Footer/>
    </>
    );
}

export default Artwork;