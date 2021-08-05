export const postsReducer = (state = [], action) => {
	switch (action.type) {
		case 'FETCH_ALL':
			return [...state, ...action.payload];
		case 'CREATE_POST':
			return [...state, action.payload];

		default:
			return state;
	}
};
