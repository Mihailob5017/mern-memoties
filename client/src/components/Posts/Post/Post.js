import React from 'react';
import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Button,
	Typography,
} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbDownAltOutlined';
import useStyles from './styles';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../redux/actions/posts';
const Post = ({
	_id,
	setCurrentId,
	selectedFile,
	title,
	name,
	createdAt,
	tags,
	message,
	likeCount,
}) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const user = JSON.parse(localStorage.getItem('profile'));

	const handleDelete = () => {
		dispatch(deletePost(_id));
	};

	const handleLike = () => {
		dispatch(likePost(_id));
	};

	const Likes = () => {
		if (likeCount.length > 0) {
			return likeCount.find(
				(like) => like === (user?.result?.googleId || user?.result?._id)
			) ? (
				<>
					<ThumbUpAltIcon fontSize='small' />
					&nbsp;
					{likeCount.length > 2
						? `You and ${likeCount.length - 1} others`
						: `${likeCount.length} like${likeCount.length > 1 ? 's' : ''}`}
				</>
			) : (
				<>
					<ThumbUpAltOutlined fontSize='small' />
					&nbsp;{likeCount.length} {likeCount.length === 1 ? 'Like' : 'Likes'}
				</>
			);
		}

		return (
			<>
				<ThumbUpAltOutlined fontSize='small' />
				&nbsp;Like
			</>
		);
	};

	return (
		<Card className={classes.card}>
			<CardMedia className={classes.media} image={selectedFile} title={title} />
			<div className={classes.overlay}>
				<Typography variant='h6'>{name}</Typography>
				<Typography variant='body2'>{moment(createdAt).fromNow()}</Typography>
			</div>
			<div className={classes.overlay2}>
				<Button
					style={{ color: 'white' }}
					size='small'
					onClick={() => {
						setCurrentId(_id);
					}}
				>
					<MoreHorizIcon fontSize='medium' />
				</Button>
			</div>
			<div className={classes.details}>
				<Typography variant='body2' color='textSecondary'>
					{tags.map((tag) => `#${tag} `)}
				</Typography>
			</div>
			<CardContent>
				<Typography className={classes.title} variant='h5' gutterBottom>
					{title}
				</Typography>
				<Typography className={classes.title} component='p'>
					{message}
				</Typography>
			</CardContent>
			<CardActionArea className={classes.CardAction}>
				<Button
					size='small'
					disabled={!user?.result}
					color='primary'
					onClick={handleLike}
				>
					<Likes />
				</Button>
				<Button size='small' color='primary' onClick={handleDelete}>
					<DeleteIcon fontSize='small' />
					Delete
				</Button>
			</CardActionArea>
		</Card>
	);
};

export default Post;
