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
import useStyles from './styles';
import moment from 'moment';
const Post = ({
	_id,
	setCurrentId,
	selectedFile,
	title,
	creator,
	createdAt,
	tags,
	message,
	likeCount,
}) => {
	const classes = useStyles();
	return (
		<Card className={classes.card}>
			<CardMedia className={classes.media} image={selectedFile} title={title} />
			<div className={classes.overlay}>
				<Typography variant='h6'>{creator}</Typography>
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
					<MoreHorizIcon fontSize='default' />
				</Button>
			</div>
			<div className={classes.details}>
				<Typography variant='body2' color='textSecondary'>
					{tags.map((tag) => `#${tag} `)}
				</Typography>
			</div>
			<CardContent>
				<Typography className={classes.title} variant='h5' gutterBottom>
					{message}
				</Typography>
			</CardContent>
			<CardActionArea className={classes.CardAction}>
				<Button size='small' color='primary' onClick={() => {}}>
					<ThumbUpAltIcon fontSize='small' />

					{likeCount}
				</Button>
				<Button size='small' color='primary' onClick={() => {}}>
					<DeleteIcon fontSize='small' />
					Delete
				</Button>
			</CardActionArea>
		</Card>
	);
};

export default Post;
