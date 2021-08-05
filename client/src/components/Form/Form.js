import React, { useState } from 'react';
import { Paper, Button, Typography, TextField } from '@material-ui/core';
import FileBase from 'react-file-base64';
import useStyles from './styles';

// Redux
import { useDispatch } from 'react-redux';
import { createPost } from '../../redux/actions/posts';
const Form = () => {
	const dispatch = useDispatch();
	const classes = useStyles();

	const [postData, setPostData] = useState({
		creator: '',
		title: '',
		message: '',
		tags: '',
		selectedFile: '',
	});
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(createPost(postData));
	};

	const handleChange = (state, element) => {
		const { name, value } = element.target;
		const newState = Object.assign({}, state, {
			[name]: value,
		});
		return newState;
	};
	const clearForm = () =>
		setPostData({
			creator: '',
			title: '',
			message: '',
			tags: '',
			selectedFile: '',
		});

	return (
		<Paper className={classes.paper}>
			<form
				autoComplete='off'
				noValidate
				className={`${classes.form} ${classes.root}`}
				onSubmit={handleSubmit}
			>
				<Typography variant='h6'>Creating a Memory</Typography>
				<TextField
					name='creator'
					variant='outlined'
					label='Creator'
					fullWidth
					value={postData.creator}
					onChange={(e) => setPostData(handleChange(postData, e))}
				/>
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
					onChange={(e) => setPostData(handleChange(postData, e))}
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
