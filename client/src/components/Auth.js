import { useState } from 'react';
import { useCookies } from 'react-cookie';

const Auth = () => {
	const [cookies, setCookie, removeCookie] = useCookies(null);
	const [isLogIn, setIsLogin] = useState(true);
	const [error, setError] = useState(null);
	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);
	const [confPassword, setConfPassword] = useState(null);

	const viewLogin = (status) => {
		setError(null);
		setIsLogin(status);
	};

	const handleSubmit = async (e, endpoint) => {
		e.preventDefault();
		// если мы регимся и пас не совпадает
		if (!isLogIn && password !== confPassword) {
			setError('Make sure passwords match');
			return;
		}

		const response = await fetch(`${process.env.REACT_APP_SERVERURL}/${endpoint}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password }),
		});

		const data = await response.json();
		if (data.detail) {
			setError(data.detail);
		} else {
			setCookie('Email', data.email);
			setCookie('AuthToken', data.token);
			window.location.reload();
		}
	};

	return (
		<div className='auth-container'>
			<div className='auth-container-box'>
				<form>
					<h2>{isLogIn ? 'Please log in' : 'Please sign up!'}</h2>
					<input type='email' placeholder='email' onChange={(e) => setEmail(e.target.value)} />
					<input
						type='password'
						placeholder='password'
						onChange={(e) => setPassword(e.target.value)}
					/>
					{!isLogIn && (
						<input
							type='password'
							placeholder='confirm password'
							onChange={(e) => setConfPassword(e.target.value)}
						/>
					)}
					<input
						type='submit'
						className='create'
						onClick={(e) => handleSubmit(e, isLogIn ? 'login' : 'signup')}
					/>
					{error && <p>{error}</p>}
				</form>
				<div className='auth-options'>
					<button
						style={{ backgroundColor: !isLogIn ? 'rgb(255,255,255)' : 'rgb(188, 188, 188)' }}
						onClick={() => viewLogin(false)}
					>
						Sign up
					</button>

					<button
						style={{ backgroundColor: isLogIn ? 'rgb(255,255,255)' : 'rgb(188, 188, 188)' }}
						onClick={() => viewLogin(true)}
					>
						Log in
					</button>
				</div>
			</div>
		</div>
	);
};
export default Auth;
