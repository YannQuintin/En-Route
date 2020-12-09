import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../../Services/auth.services';

const initialState = { username: '', password: '' }; //?? allows for the Hook to pass the state

const SignUp = (props) => { //!! Ask what the props is made of here
	const [ regForm, setRegForm ] = useState(initialState);
	const [ regErrorMsg, setRegErrorMsg ] = useState("");
    
    const service = new AuthService();

	// Form submission handler
	const handleFormSubmit = (event) => {
		event.preventDefault();

		const { username, password } = regForm; //??Getting these from the state

		// Use the service.signup method to make a call to the back end and sign the user up
		service //?? sending the username & password from State using the service 'signup'
			.signup(username, password)
			.then((response) => {
				setRegForm(initialState);
                props.getUser(response); //?? Not entirely sure what is happening here
                console.log("SIGN UP RESPONSE", response);
			})
			.catch((error) => {
                console.log(error.response)
				const { message } = error.response.data;
				setRegErrorMsg(message);
			});
	};

	// Change handler
	const handleChange = (event) => {
		const { name, value } = event.target;
		setRegForm({ ...regForm, [name]: value });
	};

	return (
		<div>
			<form onSubmit={handleFormSubmit}>
				<label>Username:</label>
				<input
                type="text"
                name="username"
                value={regForm.username}
                onChange={handleChange}
                />

				<label>Password:</label>
				<input 
                    type="password"
                    name="password"
                    value={regForm.password}
                    onChange={handleChange} 
                    />

				<input type="submit" value="Signup" />
			</form>
			<br />
			{regErrorMsg && <span style={{ color: 'red' }}>{regErrorMsg}</span>}
			<p>
				Already have account?
				<Link to={'/login'}> Login</Link>
			</p>
		</div>
	);
};

export default SignUp;
