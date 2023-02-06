import { USER_ACTION_TYPES } from './user.types';

const INITIAL_STATE = {
    currentUser: null
};

export const userReducer = (state = INITIAL_STATE, action = {}) => {
    const { type, payload } = action;
    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            localStorage.setItem('currentUser', JSON.stringify(payload));
            return {...state, currentUser: payload};
        default:
            return state;
    }
}