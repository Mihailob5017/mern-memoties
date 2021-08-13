import {
	GET_POSTS,
	CREATE_POST,
	UPDATE_POST,
	LIKE_POST,
	DELETE_POST,
} from '../constats';
export const postsReducer = (state = [], action) => {
	switch (action.type) {
		case GET_POSTS:
			return [...state, ...action.payload];
		case CREATE_POST:
			return [...state, action.payload];
		case UPDATE_POST:
			return state.map((el) =>
				el._id === action.payload._id ? action.payload : el
			);
		case DELETE_POST:
			return state.filter((el) => el._id !== action.payload);

		case LIKE_POST:
			return state.map((el) =>
				el._id === action.payload._id ? action.payload : el
			);

		default:
			return state;
	}
};
