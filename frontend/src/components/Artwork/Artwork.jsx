import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Artwork.css";

function Artwork() {
    const {artworkId} = useParams();
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch()
    }) 
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
                <div className="artwork-price">
                    {}
                </div>
                <div className="artwork-cart-buy">
                    <div className="artwork-cart"/>
                    <div className="artwork-buy-now">Buy Now</div>
                </div>
             </div>
             <div className="artwork-description">
                Something here....
             </div>
             <div className="artwork-comments-container">
                <ul className="artwork-comments">
                    <li className="artwork-comment">This is good stuff</li>
                </ul>
             </div>
        </div>
        <Footer/>
    </>
    );
}

export default Artwork;