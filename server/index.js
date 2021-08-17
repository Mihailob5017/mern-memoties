import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// ROUTES
import postRoutes from './routes/posts.js';
import userRoutes from './routes/user.js';
dotenv.config();

const app = express();
const CONNECTION_URL = process.env.CONNECTION_URL;

const PORT = process.env.PORT || 5000;

// Maybe will have to do some research on this,since its depricaded
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

// For cross site file sharing
app.use(cors());

// Connecting to the DB
mongoose
	.connect(CONNECTION_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		app.listen(PORT, () => {
			console.log(
				`Server running on PORT ${PORT} and is connected to the Database`
			);
		});
	})
	.catch((err) => {
		console.error(err.message);
	});
mongoose.set('useFindAndModify', false);

// Routing
app.use('/posts', postRoutes);
app.use('/user', userRoutes);
