import axios from 'axios';

const url = 'http://localhost:5000/posts';

export const fetchPosts = () => axios.get(url);

export const createPost = (postBody) => axios.post(url, postBody);

export const updatePost = (id, postBody) =>
	axios.patch(`${url}/${id}`, postBody);
