import {
    SET_SCREAMS,
    LOADING_DATA,
    LIKE_SCREAM,
    UNLIKE_SCREAM,
    DELETE_SCREAM,
    POST_SCREAM,
    SET_SCREAM,
    SUBMIT_COMMENT
} from '../types';

const initialState = {
    screams: [],
    scream: {},
    loading: false
}

export default function (state = initialState, actions) {
    switch (actions.type) {
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            }
        case SET_SCREAMS:
            return {
                ...state,
                screams: actions.payload,
                loading: false
            }
        case SET_SCREAM:
            return {
                ...state,
                scream: actions.payload
            }
        case LIKE_SCREAM:
            let index = state.screams.findIndex((scream) => scream.screamId === actions.payload.screamId);
            state.screams[index] = actions.payload;
            if (state.scream.screamId === actions.payload.screamId) {
                state.scream = actions.payload;
            }
            return {
                ...state
            }
        case UNLIKE_SCREAM:
            let index1 = state.screams.findIndex((scream) => scream.screamId === actions.payload.screamId);
            state.screams[index1] = actions.payload;
            if (state.scream.screamId === actions.payload.screamId) {
                state.scream = actions.payload;
            }
            return {
                ...state
            }
        case SUBMIT_COMMENT:
            return {
                ...state,
                scream:{
                    ...state.scream,
                    comments:[
                        actions.payload,
                        ...state.scream.comments
                    ]
                }
            }
        case DELETE_SCREAM:
            let index2 = state.screams.findIndex((scream) => scream.screamId === actions.payload);
            state.screams.splice(index2, 1);
            return {
                ...state
            }
        case POST_SCREAM:
            return {
                ...state,
                screams: [
                    actions.payload,
                    ...state.screams
                ]
            }
        default:
            return state;
    }
}