import { createReview } from '../../../store/reviews';
import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchReview } from '../../../store/reviews';
import { useParams } from 'react-router-dom';
import { fetchArtwork, fetchArtworks, getArtwork } from '../../../store/artworks';
import { getReview } from '../../../store/reviews';
import { useHistory } from 'react-router-dom';
import { updateReview } from '../../../store/reviews';
export default function CreateReviewPage(props) {
    const sessionUser = useSelector((state) => state.session.user)
    const dispatch=useDispatch();
    const { artworkId, reviewId } = useParams()
    // const { artworkId }=useParams()
    // const reviewId='64135f6a41cc536e7d352a57'
    const author=sessionUser._id;
    const history = useHistory();
    // const {reviewId}=props
    //might want to pass it as a prop
    // console.log(artworkId,"artworkId")
    // console.log(reviewId, "reviewId")
    const [errors, setErrors] = useState([]);

    const artwork = useSelector(getArtwork(artworkId))
    const formType = reviewId ? 'Edit Review' : 'Create Review'
    //     console.log(artworkId, "artworkId")
    // console.log(reviewId, "reviewId")
    // console.log(artwork)
    // if (sessionUser === undefined) history.push("/login");

    useEffect(() => {
        // console.log("fetct")
        dispatch(fetchArtwork(artworkId))
        // dispatch(fetchArtworks())
        // dispatch(fetchReview('6413b4a612b8d640711b50ba'))
        if (formType === 'Edit Review'){
            dispatch(fetchReview(reviewId))
        }
        // dispatch(fetchReview())

        // console.log("fetct")
    }, [dispatch])
    // let review=null;
    // const review = useSelector(getReview);
    // // let review;
    
    const review = useSelector(state => {
        if (formType === "Edit Review") {
            return getReview(reviewId)(state);
        } else {
            return { content: "", rating: "", artworkId: artworkId || "", author: sessionUser._id || "" };
        }
    });
    const [content, setContent] = useState(review ? review.content ? review.content : '' : '');
    const [rating, setRating] = useState(review ? review.rating ? review.rating : '' : '');
    if (!artwork) return null;

    console.log(review,"review")
    
    const handleSubmit = (e) => {
        e.preventDefault();

        const reviewData = {
            ...review,
            content,
            rating,
            author,
            artworkId
        }
        setErrors([]);
        if (formType === "Edit Review") {
            dispatch(updateReview(reviewData,reviewId))
                .then(() => {
                    history.push(`/artworks/${artworkId}`)
                })
                // .catch(handleError);
        } else {
            dispatch(createReview({ artworkId, author, content, rating }))
                .then(() => {
                    history.push(`/artworks/${artworkId}`)
                })
                // .catch(handleError);
        }

    }

    const handleRatingClick = (e, num) => {
        e.preventDefault();
        setRating(num);
    };
    const renderStar = (index) => {
        if (index < rating) {
            return (
                <button
                    className="review-star"
                    onClick={(e) => handleRatingClick(e, index + 1)}
                    key={index}
                >
                    <img
                        className="review-star-image"
                        src="/assets/filled.svg"
                        alt="filled-star"
                    />
                </button>
            );
        } else {
            return (
                <button
                    className="review-star"
                    onClick={(e) => handleRatingClick(e, index + 1)}
                    key={index}
                >
                    <img
                        className="review-star-image"
                        src="/assets/img.svg"
                        alt="empty-star"
                    />
                </button>
            );
        }
    };
    const stars = [...Array(5)].map((_, index) => renderStar(index));

    <div className="create-review-star-rating-container">{stars}</div>
    return(
        // <><h1>hello</h1>
        // </>
        
        <form onSubmit={handleSubmit}>
            <div className="create-review-top-container">
                <div className="create-review-heading">{formType}</div>
                <div className=" create-review-artwork-container">
                    <div className="create-review-artwork-img">
                        <img
                            className="review-artwork-img"
                            src={artwork && artwork.ArtworkImageUrl}
                            alt="add-review"
                        />
                    </div>
                    <div className="create-review-artwork-name">
                        {artwork && artwork.name.length > 80 ?
                            artwork.name.slice(0, artwork.name.lastIndexOf(' ', 80)) + "..."
                            : artwork.name}
                        {/* {artwork && artwork.name} */}
                    </div>
                </div>
            </div>
            <hr />
            <div className="create-review-rating-container">
                <div className="create-review-rating-heading">
                    Overall Rating
                </div>
                <div className="create-review-star-rating-container">{stars}</div>

            </div>
            <hr />
            <label className="content-label"> Add a written review
                <textarea
                    className="review-content"
                    placeholder="What did you like or dislike? What did you use this artwork for?"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

            </label>
            <hr />
            <div className="create-review-submit-container">
                <input
                    className="create-review-submit-button"
                    type="Submit"
                    value={formType}
                    readOnly
                />
            </div>
        </form>
    )

}