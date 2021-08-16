import { combineReducers } from 'redux';
import { postsReducer } from './posts';
import auth from './auth';

// REDUCER- TO FINALLY REMEMBER
//
//
// Reducer is a function that takes the state and a action, and based on the action type,it returns a specific state/payload.
//
//
//
export default combineReducers({
	posts: postsReducer,
	auth,
});
