import { createReview } from '../../../store/reviews';
import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchReviews } from '../../../store/reviews';
import { useParams } from 'react-router-dom';
import { fetchArtworks, getArtwork } from '../../../store/artworks';
export default function CreateReviewPage() {
    const sessionUser = useSelector((state) => state.session.user)
    const dispatch=useDispatch();
    const { artworkId, reviewId }=useParams()
    // console.log("fetct")
    // console.log(artworkId,"artworkId")
    const artwork = useSelector(getArtwork(artworkId))
    const formType = reviewId ? 'Edit Review' : 'Create Review'

    console.log(artwork)
    useEffect(() => {
        // console.log("fetct")
        dispatch(fetchArtworks(artworkId))

        dispatch(fetchReviews())
        // console.log("fetct")
    }, [dispatch])
    // const review = useSelector(state => {
    //     if (formType === "Edit Review") {
    //         return receiveReview(reviewId)(state);
    //     } else {
    //         return { headline: "", body: "", rating: "", productId: productId || "", userId: userId || "" };
    //     }
    // });
    return(
        <></>
    )

}