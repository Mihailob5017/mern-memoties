import React from 'react';
import useStyles from './styles';
// Redux
import { useSelector } from 'react-redux';
// Components
import Post from './Post/Post';
const Posts = () => {
	const posts = useSelector((state) => state.posts);
	const classes = useStyles();

	console.log(posts);
	return (
		<div>
			<Post />
			<Post />
		</div>
	);
};

export default Posts;
