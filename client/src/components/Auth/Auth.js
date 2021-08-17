import React, { useState } from 'react';
// Styles
import {
	Avatar,
	Button,
	Paper,
	Grid,
	Typography,
	Container,
} from '@material-ui/core';
import Icon from './Icon';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
// Components
import Input from './Input';
// Redux
import { useDispatch } from 'react-redux';
import { signIn, signUp } from '../../redux/actions/auth';
//Other
import { GoogleLogin } from 'react-google-login';
import { useHistory } from 'react-router-dom';

const Auth = () => {
	// Initial State
	const initialState = {
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		confirmPassword: '',
	};
	// Router Dom
	const history = useHistory();
	// Style
	const classes = useStyles();

	// Dispatch
	const dispatch = useDispatch();

	// State
	const [isSignup, switchSignup] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState(initialState);

	// State Handlers
	const handleChange = (state, element) => {
		const { name, value } = element.target;
		const newState = Object.assign({}, state, {
			[name]: value,
		});
		return newState;
	};
	const switchMode = () => switchSignup(!isSignup);
	const handleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	// Submit handlers
	const handleSubmit = (e) => {
		e.preventDefault();
		if (isSignup) {
			dispatch(signUp(formData, history));
		} else {
			dispatch(signIn(formData, history));
		}
	};

	const GoogleSuccess = async (res) => {
		const result = res?.profileObj;
		const token = res?.tokenId;

		try {
			dispatch({
				type: 'AUTH',
				data: { result, token },
			});
			history.push('/');
		} catch (error) {
			console.log(error);
		}
	};
	const GoogleFailure = (err) => {
		console.log(err);
		console.log('Google Sign in was unsuccessfull. Try again later');
	};

	return (
		<Container component='main' maxWidth='xs'>
			<Paper className={classes.paper} elevation={3}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography variant='h5'>{isSignup ? 'Sign up' : 'Sign in'}</Typography>

				<form className={classes.form} onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						{isSignup && (
							<>
								<Input
									name='firstName'
									label='First Name'
									onChange={handleChange}
									autoFocus
									half
									value={formData.firstName}
									handleChange={(e) => setFormData(handleChange(formData, e))}
								/>
								<Input
									name='lastName'
									label='Last Name'
									onChange={handleChange}
									half
									value={formData.lastName}
									handleChange={(e) => setFormData(handleChange(formData, e))}
								/>
							</>
						)}
						<Input
							name='email'
							label='Email Address'
							value={formData.email}
							handleChange={(e) => setFormData(handleChange(formData, e))}
							type='email'
						/>
						<Input
							name='password'
							label='Password'
							value={formData.password}
							handleChange={(e) => setFormData(handleChange(formData, e))}
							type={showPassword ? 'text' : 'password'}
							handleShowPassword={handleShowPassword}
						/>
						{isSignup && (
							<Input
								name='confirmPassword'
								label='Repeat Password'
								value={formData.confirmPassword}
								handleChange={(e) => setFormData(handleChange(formData, e))}
								type={showPassword ? 'text' : 'password'}
								handleShowPassword={handleShowPassword}
							/>
						)}
					</Grid>
					<Button
						type='submit'
						variant='contained'
						color='primary'
						className={classes.submit}
						fullWidth
						onSubmit={handleSubmit}
					>
						{isSignup ? 'Sign Up' : 'Sign in'}
					</Button>
					<GoogleLogin
						clientId='750291484607-rjottldigank2iurt9i74jpgspdubki1.apps.googleusercontent.com'
						render={(renderProps) => (
							<Button
								className={classes.googleButton}
								color='primary'
								fullWidth
								onClick={renderProps.onClick}
								disabled={renderProps.disabled}
								startIcon={<Icon />}
								variant='contained'
							>
								Google Sign In
							</Button>
						)}
						onSuccess={GoogleSuccess}
						onFailure={GoogleFailure}
						cookiePolicy='single_host_origin'
					/>
					<Grid container justifyContent='flex-end'>
						<Grid item>
							<Button onClick={switchMode}>
								{isSignup
									? 'Already have an account? Sign in'
									: ' Dont have an account?Sign up'}
							</Button>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</Container>
	);
};
export default Auth;
