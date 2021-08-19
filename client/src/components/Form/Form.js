import React, { useEffect, useState } from 'react';
import { Paper, Button, Typography, TextField } from '@material-ui/core';
import FileBase from 'react-file-base64';
import useStyles from './styles';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../redux/actions/posts';

const Form = ({ setCurrentId, currentId }) => {
	const user = JSON.parse(localStorage.getItem('profile'));
	const classes = useStyles();
	const dispatch = useDispatch();
	const [postData, setPostData] = useState({
		title: '',
		message: '',
		tags: '',
		selectedFile: '',
	});

	const singlePost = useSelector((state) =>
		currentId ? state.posts.find((post) => post._id === currentId) : null
	);
	console.log(currentId + ' is the id');

	useEffect(() => {
		if (singlePost) setPostData(singlePost);
	}, [singlePost]);
	const handleSubmit = (e) => {
		e.preventDefault();
		if (currentId) {
			dispatch(
				updatePost(currentId, { ...postData, name: user?.result?.name })
			);
			clearForm();
		} else {
			dispatch(createPost({ ...postData, name: user?.result?.name }));
			clearForm();
		}
	};

	const handleChange = (state, element) => {
		const { name, value } = element.target;
		const newState = Object.assign({}, state, {
			[name]: value,
		});
		return newState;
	};
	const clearForm = () => {
		setCurrentId(null);
		return setPostData({
			title: '',
			message: '',
			tags: '',
			selectedFile: '',
		});
	};
	if (!user?.result?.name) {
		return (
			<Paper className={classes.paper}>
				<Typography variant='h6' align='center'>
					Please Sign in to create memories
				</Typography>
			</Paper>
		);
	}
	return (
		<Paper className={classes.paper}>
			<form
				autoComplete='off'
				noValidate
				className={`${classes.form} ${classes.root}`}
				onSubmit={handleSubmit}
			>
				<Typography variant='h6'>
					{currentId ? 'Editing' : 'Creating'} a Memory
				</Typography>
				<TextField
					name='title'
					variant='outlined'
					label='Title'
					fullWidth
					value={postData.title}
					onChange={(e) => setPostData(handleChange(postData, e))}
				/>
				<TextField
					name='message'
					variant='outlined'
					label='Message'
					fullWidth
					value={postData.message}
					onChange={(e) => setPostData(handleChange(postData, e))}
				/>
				<TextField
					name='tags'
					variant='outlined'
					label='Tags'
					fullWidth
					value={postData.tags}
					onChange={(e) =>
						setPostData({ ...postData, tags: e.target.value.split(',') })
					}
				/>
				<div className={classes.fileInput}>
					<FileBase
						type='file'
						multiple={false}
						onDone={({ base64 }) =>
							setPostData({ ...postData, selectedFile: base64 })
						}
					/>
				</div>
				<Button
					className={classes.buttonSubmit}
					variant='contained'
					color='primary'
					size='large'
					type='submit'
					onSubmit={handleSubmit}
					fullWidth
				>
					Submit
				</Button>
				<Button
					className={classes.buttonSubmit}
					variant='contained'
					color='secondary'
					size='small'
					onClick={clearForm}
					fullWidth
				>
					Clear
				</Button>
			</form>
		</Paper>
	);
};

export default Form;
