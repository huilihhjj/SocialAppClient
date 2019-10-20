import {
    SET_SCREAMS,
    LOADING_DATA,
    LIKE_SCREAM,
    UNLIKE_SCREAM,
    DELETE_SCREAM,
    CLEAR_ERRORS,
    POST_SCREAM,
    SET_ERRORS,
    LOADING_UI,
    SET_SCREAM,
    STOP_LOADING_UI,
    SUBMIT_COMMENT
} from '../types';
import axios from 'axios';

export const getScreams = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get('/screams').then(res => {
        dispatch({
            type: SET_SCREAMS,
            payload: res.data
        })
        console.log('----dataActions:::getScreams:::', 'res.data: ', res.data);
    })
        .catch(err => {
            console.log('----dataActions:::getScreams:::', 'err: ', err);
            dispatch({
                type: SET_SCREAMS,
                payload: []
            })
        })
}

//get details of a scream
export const getScream = (screamId) => dispatch => {
    dispatch({ type: LOADING_UI });
    axios.get(`/scream/${screamId}`).then(res => {
        console.log('----dataActions:::getScream:::', 'res.data: ', res.data);
        dispatch({
            type: SET_SCREAM,
            payload: res.data
        })
        dispatch({ type: STOP_LOADING_UI });    
    }).catch(err => console.log(err));
}

//POST a scream
export const postScream = (newScream) => (dispatch) => {
    console.log('----dataActions:::postScream:::', 'newScream: ', newScream);
    dispatch({ type: LOADING_UI });
    axios.post('/scream', newScream).then(res => {
        dispatch({
            type: POST_SCREAM,
            payload: res.data
        })
        dispatch(clearErrors());
    }).catch(err => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
    })
}

//like a scream
export const likeScream = (screamId) => dispatch => {
    axios.get(`/scream/${screamId}/like`).then(res => {
        console.log('----dataActions:::likeScream:::', 'res.data: ', res.data);
        dispatch({
            type: LIKE_SCREAM,
            payload: res.data
        })
    }).catch(err => console.log(err));
}
//unlike a scream
export const unlikeScream = (screamId) => dispatch => {
    axios.get(`/scream/${screamId}/unlike`).then(res => {
        console.log('----dataActions:::unlikeScream:::', 'res.data: ', res.data);
        dispatch({
            type: UNLIKE_SCREAM,
            payload: res.data
        })
    }).catch(err => console.log(err));
}

//submit a comment
export const submitComment = (screamId, commentData) => dispatch => {
    axios.post(`/scream/${screamId}/comment`, commentData).then(res => {
        console.log('----dataActions:::submitComment:::', 'res.data: ', res.data);
        dispatch({
            type: SUBMIT_COMMENT,
            payload: res.data
        });
        dispatch(clearErrors());
    }).catch(err => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
    });
}

export const deleteScream = (screamId) => (dispatch) => {
    console.log('----dataActions:::deleteScream:::', 'screamId: ', screamId);
    axios.delete(`/scream/${screamId}`).then(() => {
        dispatch({
            type: DELETE_SCREAM,
            payload: screamId
        })
    })
        .catch(err => console.log(err));
}

//get details of a scream
export const getUserData = (userHandle) => dispatch => {
    dispatch({ type: LOADING_DATA });
    axios.get(`/user/${userHandle}`).then(res => {
        console.log('----dataActions:::getUserData:::', 'res.data: ', res.data);
        dispatch({
            type: SET_SCREAMS,
            payload: res.data.screams
        });
    }).catch(err => {
        dispatch({
            type: SET_SCREAMS,
            payload: null
        });
    });
}

export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}