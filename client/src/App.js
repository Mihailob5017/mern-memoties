import React, { useEffect, useState } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import memories from './images/memories.png';
import useStyles from './styles';
// Redux
import { useDispatch } from 'react-redux';
import { getPosts } from './redux/actions/posts';
// Components
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
const App = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [currentId, setCurrentId] = useState(0);
	useEffect(() => {
		dispatch(getPosts());
	}, [dispatch]);

	return (
		<Container maxWidth='lg'>
			<AppBar className={classes.appBar} position='static' color='inherit'>
				<Typography className={classes.heading} variant='h2' align='center'>
					Memories
				</Typography>
				<img
					src={memories}
					alt='memories'
					height='60'
					className={classes.image}
				/>
			</AppBar>
			<Grow in>
				<Container>
					<Grid container justifyContent='space-between' alignItems='stretch'>
						<Grid item xs={12} sm={7}>
							<Posts setCurrentId={setCurrentId} />
						</Grid>
						<Grid item xs={12} sm={4}>
							<Form setCurrentId={setCurrentId} currentId={currentId} />
						</Grid>
					</Grid>
				</Container>
			</Grow>
		</Container>
	);
};

export default App;
