import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from 'react-redux';

import { useParams } from "react-router-dom";
import "./Artwork.css";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { fetchArtwork } from "../../store/artworks";
import { getArtwork } from "../../store/artworks";
import { NavLink } from "react-router-dom";
import CreateReviewPage from "../Review/Create/createReviewForm";
import { fetchArtworkReviews, getReview } from "../../store/reviews";
import { getReviews } from "../../store/reviews";
function Artwork() {
    const {artworkId} = useParams();
    const dispatch = useDispatch();
    // const artwork = useSelector (state => state.artworks.artwork);
    // console.log(artworkId)

    // console.log(artwork)
    useEffect(()=> {
        dispatch(fetchArtwork(artworkId))
        dispatch(fetchArtworkReviews(artworkId))
    },[dispatch]) 
    const artwork = useSelector(getArtwork(artworkId));
    // console.log(artwork,'artwork')

    
    const reviews = useSelector(getReviews);
    // if (!reviews) {
    //     return <div>Loading...</div>;
    // }\
    // console.log(reviews,'reviews???')
    // useEffect(()=> {
    //     if (reviews !== undefined){
    //     // console.log(Object.values(reviews), 'Object.values')

    //     console.log('pass')
    //     // console.log(reviews[0].content,'reviews')
    // }
    // })
    
    return (
    <>
        <NavBar/>
        <div className="artwork">
             <div className="artwork-image-container">
                <img style={{ 
              backgroundImage: "url('https://aws-mern-pixelpanda.s3.us-west-1.amazonaws.com/public/1678898915410.png')", 
              backgroundRepeat: "no-repeat", 
              backgroundSize: "contain",
              backgroundPosition: "center" }} 
              className="artwork-image"/>
             </div>
             <div className="artwork-purchase">
                <div className="artwork-title">
                    {artwork?.name ? artwork.name : "Untitled"}
                </div>
                <div className="artwork-price">
                    {artwork?.price ? artwork.price : "$3.50"}
                </div>
                <div className="artwork-cart-buy">
                    <div className="artwork-cart"><AddShoppingCartIcon/></div>
                    <div className="artwork-buy-now">Buy Now</div>
                </div>
             </div>
             <div className="artwork-description">
                {artwork?.description ? artwork.description : "Something is supposed to be here..."}
             </div>
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
        <div>test1</div>
        {console.log(reviews, 'reviews!!!!!!!!!')}
            <div>
                
                {reviews?.map((review) => (
                    <div key={review.id}>
                        <p>{review.content}</p>
                        <p>{review.rating}</p>
                    </div>
                ))}
            </div>     
            <div>test2</div>
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