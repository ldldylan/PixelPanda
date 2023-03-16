import { createReview } from '../../../store/reviews';
import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchReviews } from '../../../store/reviews';
export default function CreateReviewPage() {
    const sessionUser = useSelector((state) => state.session.user)
    const dispatch=useDispatch();
    useEffect(() => {
        dispatch(fetchReviews())
    }, [dispatch])
    return(
        <></>
    )

}