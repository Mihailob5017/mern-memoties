import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import useStyles from './styles';
// Redux
import { useDispatch } from 'react-redux';
import { getPosts } from '../../redux/actions/posts';
// Components
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
const Home = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [currentId, setCurrentId] = useState(0);
	useEffect(() => {
		dispatch(getPosts());
	}, [dispatch]);

	return (
		<Grow in>
			<Container>
				<Grid
					container
					className={classes.mainContainer}
					justifyContent='space-between'
					alignItems='stretch'
				>
					<Grid item xs={12} sm={7}>
						<Posts setCurrentId={setCurrentId} />
					</Grid>
					<Grid item xs={12} sm={4}>
						<Form setCurrentId={setCurrentId} currentId={currentId} />
					</Grid>
				</Grid>
			</Container>
		</Grow>
	);
};

export default Home;
