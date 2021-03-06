import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const signIn = async (req, res) => {
	const { email, password } = req.body;
	try {
		const currentUser = await User.findOne({ email });
		if (!currentUser)
			return res.status(404).json({ message: 'User does not exist' });

		const isPasswordCorrect = await bcrypt.compare(
			password,
			currentUser.password
		);
		if (!isPasswordCorrect)
			return status(400).json({ message: 'Invalid Credentials' });

		const token = jwt.sign(
			{ email: currentUser.email, id: currentUser._id },
			'test_secret',
			{ expiresIn: '1h' }
		);

		res.status(200).json({ result: currentUser, token });
	} catch (error) {
		res.status(500).json({ message: 'Something went wrong', error });
	}
};

export const signUp = async (req, res) => {
	const { email, password, firstName, lastName, confirmPassword } = req.body;

	try {
		const currentUser = await User.findOne({ email });
		if (currentUser)
			return res.status(404).json({ message: 'User  already exists' });
		if (password !== confirmPassword)
			return res.status(400).json({ message: 'Passwords dont match' });

		const hashedPassword = await bcrypt.hash(password, 12);

		const result = await User.create({
			email,
			password: hashedPassword,
			name: `${firstName} ${lastName}`,
		});

		const token = jwt.sign(
			{ email: result.email, id: result._id },
			'test_secret',
			{ expiresIn: '1h' }
		);

		res.status(200).json({ result, token });
	} catch (error) {
		res.status(500).json({ message: 'Something went wrong', error });
	}
};
