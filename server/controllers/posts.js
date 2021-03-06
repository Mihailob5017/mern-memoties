// Instead of having all the complex logic inside the /routes page, we will be having it here
import mongoose from 'mongoose';
import PostMessage from '../models/postsModel.js';

export const getPosts = async (req, res) => {
	try {
		const postMessages = await PostMessage.find();
		res.status(200).json(postMessages);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const createPost = async (req, res) => {
	const post = req.body;
	const newPost = new PostMessage({
		...post,
		creator: req.userId,
		createdAt: new Date().toISOString(),
	});

	try {
		newPost.save();
		res.status(201).json(newPost);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
};

export const updatePost = async (req, res) => {
	const { id: _id } = req.params;
	const post = req.body;
	if (!mongoose.Types.ObjectId.isValid(_id))
		return res.status(404).send('No post with that ID');

	try {
		const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
			new: true,
		});
		res.json(updatedPost);
	} catch (error) {
		res.status(400).send(error);
	}
};

export const deletePost = async (req, res) => {
	const { id: _id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(_id))
		return res.status(404).send('No post with that ID');
	try {
		await PostMessage.findByIdAndDelete(_id);
		res.send('Post Successfully deleted');
	} catch (error) {
		res.status(400).send(error);
	}
};

export const updateLikeCount = async (req, res) => {
	const { id: _id } = req.params;

	if (!req.userId) return res.json({ message: 'Unauthenticated' });

	if (!mongoose.Types.ObjectId.isValid(_id))
		return res.status(404).send('No post with that ID');
	try {
		const singlePost = await PostMessage.findById(_id);

		const index = singlePost.likeCount.findIndex(
			(id) => id === String(req.userId)
		);
		if (index === -1) {
			// Like the Post
			singlePost.likeCount.push(req.userId);
		} else {
			// Dislike the Post
			singlePost.likeCount = singlePost.likeCount(
				(id) => id !== String(req.userId)
			);
		}
		const updatedPost = await PostMessage.findByIdAndUpdate(
			_id,
			{
				likeCount: singlePost.likeCount,
			},
			{ new: true }
		);
		res.json(updatedPost);
	} catch (error) {
		res.status(400).send(error);
	}
};
