import React from 'react';
import useStyles from './styles';
import { Grid, CircularProgress } from '@material-ui/core';
// Redux
import { useSelector } from 'react-redux';
// Components
import Post from './Post/Post';

const Posts = ({ setCurrentId }) => {
	const posts = useSelector((state) => state.posts);
	const classes = useStyles();

	console.log(posts);
	return posts.length === 0 ? (
		<CircularProgress />
	) : (
		<Grid
			container
			spacing={3}
			alignItems='stretch'
			className={classes.container}
		>
			{posts.map((post) => (
				<Grid key={post.id} item xs={12} sm={6}>
					<Post setCurrentId={setCurrentId} {...post} />
				</Grid>
			))}
		</Grid>
	);
};

export default Posts;
