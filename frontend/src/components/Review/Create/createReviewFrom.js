import { createReview } from '../../../store/reviews';
import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchReview } from '../../../store/reviews';
import { useParams } from 'react-router-dom';
import { fetchArtwork, getArtwork } from '../../../store/artworks';
import { getReview } from '../../../store/reviews';
export default function CreateReviewPage(props) {
    const sessionUser = useSelector((state) => state.session.user)
    const dispatch=useDispatch();
    // const { artworkId, reviewId } = useParams()
    const { artworkId }=useParams()
    const reviewId='64135f6a41cc536e7d352a57'
    // const {reviewId}=props
    //might want to pass it as a prop
    // console.log(artworkId,"artworkId")
    // console.log(reviewId, "reviewId")
    const artwork = useSelector(getArtwork(artworkId))
    const formType = reviewId ? 'Edit Review' : 'Create Review'
    //     console.log(artworkId, "artworkId")
    // console.log(reviewId, "reviewId")
    // console.log(artwork)
    useEffect(() => {
        // console.log("fetct")
        dispatch(fetchArtwork(artworkId))
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
            return { body: "", rating: "", artworkId: artworkId || "", author: sessionUser._id || "" };
        }
    });

    console.log(review,"review")
  
    return(
        <></>
    )

}