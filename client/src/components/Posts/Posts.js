import React from 'react';
import useStyles from './styles';
// Components
import Post from './Post/Post';
const Posts = () => {
	const classes = useStyles();
	return (
		<div>
			<Post />
			<Post />
		</div>
	);
};

export default Posts;
