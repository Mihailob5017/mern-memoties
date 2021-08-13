export const postsReducer = (state = [], action) => {
	switch (action.type) {
		case 'FETCH_ALL':
			return [...state, ...action.payload];
		case 'CREATE_POST':
			return [...state, action.payload];
		case 'UPDATE_POST':
			return state.map((el) =>
				el._id === action.payload._id ? action.payload : el
			);
		case 'DELETE_POST':
			return state.filter((el) => el._id !== action.payload);

		case 'LIKE_POST':
			return state.map((el) =>
				el._id === action.payload._id ? action.payload : el
			);

		default:
			return state;
	}
};
