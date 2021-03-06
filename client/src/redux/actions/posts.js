import * as api from '../../api/index';
import {
	GET_POSTS,
	CREATE_POST,
	UPDATE_POST,
	DELETE_POST,
	LIKE_POST,
} from '../constats';
// Functions that return

export const getPosts = () => async (dispatch) => {
	try {
		const { data } = await api.fetchPosts();
		dispatch({ type: GET_POSTS, payload: data });
	} catch (error) {
		console.log(error.message);
	}
};

export const createPost = (post) => async (dispatch) => {
	try {
		const res = await api.createPost(post);
		dispatch({ type: CREATE_POST, payload: res.data });
	} catch (error) {
		console.log(error);
	}
};

export const updatePost = (id, post) => async (dispatch) => {
	try {
		const { data } = await api.updatePost(id, post);
		dispatch({ type: UPDATE_POST, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const deletePost = (id) => async (dispatch) => {
	try {
		await api.deletePost(id);
		dispatch({ type: DELETE_POST, payload: id });
	} catch (error) {
		console.log(error);
	}
};

export const likePost = (id) => async (dispatch) => {
	try {
		const { data } = await api.likePost(id);
		dispatch({ type: LIKE_POST, payload: data });
	} catch (error) {
		console.log(error);
	}
};
