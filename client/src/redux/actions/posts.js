import * as api from '../../api/index';

// Functions that return

export const getPosts = () => async (dispatch) => {
	try {
		const { data } = await api.fetchPosts();
		dispatch({ type: 'FETCH_ALL', payload: data });
	} catch (error) {
		console.log(error.message);
	}
};

export const createPost = (post) => async (dispatch) => {
	try {
		const res = await api.createPost(post);
		console.log(res);
		dispatch({ type: 'CREATE_POST', payload: res.data });
	} catch (error) {
		console.log(error);
	}
};

export const updatePost = (id, post) => async (dispatch) => {
	try {
		const { data } = await api.updatePost(id, post);
		dispatch({ type: 'UPDATE_POST', payload: data });
	} catch (error) {
		console.log(error);
	}
};
