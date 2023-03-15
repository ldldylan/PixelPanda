import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { useDispatch } from "react-redux";
import { useEffect, useSelector } from "react";
import { useParams } from "react-router-dom";
import "./Artwork.css";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


function Artwork() {
    const {artworkId} = useParams();
    const dispatch = useDispatch();
    // const artwork = useSelector (state => state.artworks.artwork);
    const artwork = null;
    // useEffect(()=> {
    //     dispatch()
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
        <Footer/>
    </>
    );
}

export default Artwork;