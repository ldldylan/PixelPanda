import jwtFetch from './jwt';
import { RECEIVE_USER_LOGOUT } from './session';


export const RECEIVE_USER = "users/RECEIVE_USER";
export const RECEIVE_USERS = "users/RECEIVE_USERS";
export const RECEIVE_NEW_USER = "users/RECEIVE_NEW_USER";
export const RECEIVE_USER_ERRORS = "users/RECEIVE_USER_ERRORS";
export const REMOVE_USER = "users/REMOVE_USER"
export const CLEAR_USER_ERRORS = "users/CLEAR_USER_ERRORS";

const receiveUser = user => ({
    type: RECEIVE_USER,
    user
})

const receiveUsers = users => ({
    type: RECEIVE_USERS,
    users
});

const receiveNewUser = user => ({
    type: RECEIVE_NEW_USER,
    user
});

const removeUser = UserId => {
    return {
        type: REMOVE_USER,
        UserId
    }
}

const receiveErrors = errors => ({
    type: RECEIVE_USER_ERRORS,
    errors
});

export const clearUserErrors = errors => ({
    type: CLEAR_USER_ERRORS,
    errors
});

export const getUser = (id) => (state) => {

    return state.users ? state.users[id] : null
}

export const getUsers = (state) => {
    return state.users !== [] ? Object.values(state.users) : []
}

export const fetchUser = (userId) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/users/${userId}`);
        
        const user = await res.json();
        
        dispatch(receiveUser(user));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            dispatch(receiveErrors(resBody.errors));
        }
    }
};

export const fetchUsers = () => async dispatch => {
    try {
        const res = await jwtFetch('/api/users');
        const users = await res.json();
        
        dispatch(receiveUsers(users));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            dispatch(receiveErrors(resBody.errors));
        }
    }
}

export const createUser = formData => async dispatch => {
    try {
        const res = await jwtFetch('/api/users/', {
            method: 'POST',
            body: formData
        });

        const user = await res.json();

        dispatch(receiveNewUser(user));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            return dispatch(receiveErrors(resBody.errors));
        }
    }
};

export const updateUser = (formData,userId) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/users/${userId}`, {
            method: 'PATCH',
            body: formData
        });

        const user = await res.json();

        dispatch(receiveNewUser(user));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            return dispatch(receiveErrors(resBody.errors));
        }
    }
};

export const deleteUser =  userId => async dispatch => {
    try {
        const res = await jwtFetch(`/api/users/${userId}`, {
            method: 'DELETE'
        });

        dispatch(removeUser(userId));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            return dispatch(receiveErrors(resBody.errors));
        }
    }
};

const nullErrors = null;

export const userErrorsReducer = (state = nullErrors, action) => {
    switch (action.type) {
        case RECEIVE_USER_ERRORS:
            return action.errors;
        case RECEIVE_NEW_USER:
        case CLEAR_USER_ERRORS:
            return nullErrors;
        default:
            return state;
    }
};

const usersReducer = (state = { }, action) => {
    let newState = {...state};
    
    switch (action.type) {
        case RECEIVE_USER: 
            return newState[action.user._id] = action.user;
        case RECEIVE_USERS:
            // console.log(action);
            newState = {};
            const users = action.users
            users.forEach(user => {
                newState[user._id] = user
            })
            return newState
        case RECEIVE_NEW_USER:
            return { ...state, new: action.user };
        case RECEIVE_USER_LOGOUT:
            return { ...state, user: {}, new: undefined }
        default:
            return state;
    }
};

export default usersReducer;