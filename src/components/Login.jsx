/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';
import { validateUser } from './FetchController.js';

const Login = ({ setID }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [msg, setMsg] = useState('');

	let history = useHistory();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const res = await validateUser(username, password);
		setUsername('');
		setPassword('');
		if (!res) {
			setMsg('Some error occured');
		} else {
			setMsg('User created successfully');
			document.cookie = `token=${res.token}; SameSite=None; Secure`;
			const id = jwtDecode(res.token).id;
			setTimeout(() => {
				setID(id);
				history.push('/');
			}, 5000);
		}
	};
	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="username">Username: </label>
			<input
				type="email"
				name="username"
				value={username}
				minLength={3}
				maxLength={30}
				onChange={(e) => setUsername(e.target.value)}
			></input>
			<label htmlFor="password">Password: </label>
			<input
				type="text"
				name="password"
				value={password}
				minLength={3}
				maxLength={30}
				onChange={(e) => setPassword(e.target.value)}
			></input>
			<button type="submit">Submit</button>
			<div className="message">{msg ? <p>{msg}</p> : null}</div>
		</form>
	);
};

Login.propTypes = {
	setToken: PropTypes.func,
};

export default Login;
