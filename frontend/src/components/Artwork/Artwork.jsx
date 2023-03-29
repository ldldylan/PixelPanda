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
import { fetchArtworkReviews, getReview } from "../../store/reviews";
import { getReviews } from "../../store/reviews";
import CreateReviewForm from "../Review/Create/CreateReviewForm";
import Favorite from "@mui/icons-material/Favorite";
import { addNewCartItem } from '../../store/cartItems';
import UpdateArtworkPage from "./Update/UpdateArtworkPage";
import { deleteArtwork } from "../../store/artworks";
import { deleteReview, createReview, updateReview } from "../../store/reviews";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// import {Modal} from '../context/Modal';
import { Modal } from '../context/Modal';
import Loading from '../Loading/Loading'


function Artwork() {
    const { artworkId } = useParams();
    const [comment, setComment] = useState('');
    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch();
    const params = useParams();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const [loaded, setLoaded] = useState(false);

    const [rating, setRating] = useState(1);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit the comment and rating data to your backend server here
        const author = sessionUser._id;
        const reviewData = {
            content: comment, rating, author, artworkId
        };
        setComment("");
        setRating(1);
        dispatch(createReview(reviewData))
            .then(() => {
                history.push(`/artworks/${artworkId}`)
            })
    };

    // const artwork = useSelector(state => state.artworks); // from kenny
    // console.log(artwork)
    useEffect(() => {
        Promise.all([
        dispatch(fetchArtworks())
        ]).then(() => {
            setLoaded(true);
        })
    }, [dispatch])
    useEffect(() => {
        console.log('pass',artworkId)
        dispatch(fetchArtworkReviews(artworkId))
    }, [artworkId, dispatch])
    const artwork = useSelector(getArtwork(artworkId));
    // console.log(artwork,'artwork')


    const reviews = useSelector(getReviews);
    // if (!reviews) {
    //     return <div>Loading...</div>;
    // }\
    // useEffect(()=> {
    //     if (reviews !== undefined){
    //     // console.log(Object.values(reviews), 'Object.values')

    //     console.log('pass')
    //     // console.log(reviews[0].content,'reviews')
    // }
    // })
    const [showEditForm, setShowEditForm] = useState(false)
    const [editMessage, setEditMessage] = useState(null);
    const [editMessageText, setEditMessageText] = useState("");
    const [editMessageRating, setEditMessageRating] = useState(1);
    const handleShowEditForm = (review) => {
        setEditMessage(review);
        setEditMessageText(review.content);
        setEditMessageRating(review.rating);
        setShowEditForm(true);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        // Submit the comment and rating data to your backend server here
        editMessage.content = editMessageText;
        editMessage.rating = editMessageRating;
        dispatch(updateReview(editMessage, editMessage._id))
            .then(() => {
                history.push(`/artworks/${artworkId}`)
            })
    }

    const cartItems = useSelector((state) => state.cartItems)
    if (!artwork) return null;

    const handleAddCartItem = artworkId => e => {
        e.preventDefault();
        if (sessionUser) {
            const artworkArray = Object.values(cartItems).map((item) => item.artwork);
            if (!artworkArray.includes(artworkId))
                dispatch(addNewCartItem({ artwork: artworkId }, sessionUser._id));
            else alert('Artwork is already in your cart!')
        }
        else {
            history.push('/login')
        };
    }

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteArtwork(artworkId))
        history.push(`/users/${sessionUser._id}`)
    }

    const handleDeleteReview = reviewId => (e) => {
        e.preventDefault();
        dispatch(deleteReview(reviewId))
        history.push(`/artworks/${artworkId}`)
    }
    if (!loaded) {
        return (
            <>
                <NavBar />
                <Loading />
            </>

        )
    } else {
    return (
        <>
            <NavBar />
            {/* {artwork &&<UpdateArtworkPage artwork={artwork} />} */}
            <div className="artwork">
                <div className="artwork-main">
                    <div className="show-artwork-image-container">
                        <img
                            src={artwork?.ArtworkImageUrl ? artwork.ArtworkImageUrl : null}
                            className="artwork-image" />
                    </div>
                    <div className="artwork-purchase">
                        <div className="artwork-title">
                            {artwork?.name ? artwork.name : "Untitled"}
                        </div>
                        <div className="artwork-author" onClick={() => history.push(`/users/${artwork.author._id}`)}>
                            {artwork?.author?.email ? artwork.author.email.split('@')[0] : "Mysterious Artist"}
                        </div>
                        <div className="artwork-price">
                            ${artwork?.price ? artwork.price.toFixed(2) : "3.50"}
                        </div>
                        <div className="divider" />
                        <div className="artwork-about">
                            About this item:
                            <div className="artwork-desc">
                                {artwork?.description ? artwork.description : "I don't know but I'm sure it is a great product"}
                            </div>
                        </div>
                        <div className="artwork-cart-buy">
                            <div className="cart-and-fav">
                                <div className="artwork-cart" onClick={handleAddCartItem(artwork._id)}>
                                    <button id='add-cart-button'>Add to Cart</button>
                                </div>
                                <div className="cart-fav-button">
                                    <button id='fav-button' onClick={handleButtonClick}
                                        style={{
                                            color: isFavorited ? 'red' : 'white',
                                            backgroundColor: '#b90dbf'
                                        }}
                                    ><Favorite /></button>
                                </div>
                            </div>
                            <div className="edit-and-delete">
                                {artwork.author._id === sessionUser._id ? (<>
                                    <button id='edit-button' onClick={() => setShowModal(true)}>Edit</button>
                                    <button id='delete-button' onClick={handleDelete} >Delete</button>
                                    {showModal && artwork && (
                                        <Modal onClose={() => setShowModal(false)}>
                                            <UpdateArtworkPage onClose={() => setShowModal(false)} artwork={artwork} />
                                        </Modal>
                                    )}
                                </>) : null}
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className="cart-separator-empty"/> */}

                <div className="artworks-reviews-container">
                    REVIEWS
                    <div className="line-divider review" />
                    <ul className="artworks-reviews">
                        {Object.keys(reviews).length === 0 ? null : reviews.map((review) => (

                            <li key={review._id}>
                                <div className="line-divider" />
                                {showEditForm && editMessage === review ? (
                                    <form className="comment-form" onSubmit={handleEditSubmit}>
                                        <div>
                                            {[1, 2, 3, 4, 5].map((value) => (
                                                <span
                                                    key={value}
                                                    value={editMessageRating}
                                                    onClick={() => setEditMessageRating(value)}
                                                    style={{
                                                        color: editMessageRating >= value ? 'orange' : 'grey',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    &#9733;
                                                </span>
                                            ))}
                                        </div>
                                        <textarea value={editMessageText} className="comment-submit-box" onChange={(e) => setEditMessageText(e.target.value)} required placeholder="Write a customer review here" />
                                        <br /><button className="comment-submit-button" type="submit">Update</button>
                                    </form>
                                ) : (<>
                                    <p>
                                        {[1, 2, 3, 4, 5].map((value) => (
                                            <span
                                                style={{ color: review.rating >= value ? 'orange' : 'grey' }}
                                            >
                                                &#9733;
                                            </span>
                                        ))}
                                    </p>
                                    <p className="review-content">{review.content}</p>
                                    {review.author._id === sessionUser._id ? (<>
                                        <button type="button" className="edit-icon" onClick={() => handleShowEditForm(review)}>
                                            <EditIcon />
                                        </button>
                                        <button type="button" onClick={handleDeleteReview(review._id)} className="edit-delete-buttons">
                                            <DeleteForeverIcon />
                                        </button>
                                    </>)
                                        : null}

                                </>)}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="artwork-comments-box">

                    <form className="comment-form" onSubmit={handleSubmit}>
                        <div>
                            {[1, 2, 3, 4, 5].map((value) => (
                                <span
                                    key={value}
                                    onClick={() => handleRatingChange(value)}
                                    style={{
                                        color: rating >= value ? 'orange' : 'grey',
                                        cursor: 'pointer'
                                    }}
                                >
                                    &#9733;
                                </span>
                            ))}
                        </div>
                        <textarea required value={comment} className="comment-submit-box" onChange={(e) => setComment(e.target.value)} placeholder="Write a customer review here" />
                        <br /><button className="comment-submit-button" type="submit">Submit</button>
                    </form>

                </div>

                {/* <div className="artwork-comments-container">
                <ul className="artwork-comments">
                    {artwork?.comments ? artwork.comments.map(comment => (
                        <li key={artwork.comments.id} className="artwork-comment">{comment}</li>
                    )) : 
                        <li className="artwork-comment">This is good stuff</li>
                    }           
                </ul>
            </div> */}
            </div>
            {/* <div>test1</div>
        {console.log(reviews, 'reviews!!!!!!!!!')}
            <div>
                
                {reviews?.map((review) => (
                    <div key={review._id}>
                        <p>{review.content}</p>
                        <p>{review.rating}</p>
                        <NavLink
                            className="link-to-edit-review"
                            to={`/artworks/${artworkId}/review/${review._id}`}
                        >
                            Edit
                        </NavLink>
                        <button type="button" onClick={handleDeleteReview(review._id)} className="edit-delete-buttons">
                            <h1>Delete</h1>
                        </button>
                    </div>
                ))}
            </div>     
            <div>test2</div>
                <NavLink
                className="link-to-create-review"
                to={`/artworks/${artworkId}/review`}
            >
                Write a customer review
            </NavLink> */}

            <Footer />
        </>
    );
    }
}

export default Artwork;