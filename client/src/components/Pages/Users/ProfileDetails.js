import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import EditProfileForm from './Forms/EditProfileForm';
import UserService from '../../../Services/user-service';

//TODO list
// get a single user
// render user profile edit form
// delete user

const ProfileDetails = (props) => {
	const [ details, setDetails ] = useState({});

	// function to make api call to the backend to retrieve a single object from the database
	const getSingleUser = () => {
		//?? get the 'id' from url via 'props.match.params' object
		const { id } = props.match.params;

		const service = new UserService();

		//?? api call to the server to retrieve a single user
		service
			.getOneUser(id)
			.then((responseFromApi) => {
				setDetails(responseFromApi.data);
			})
			.catch((error) => console.error(error));
	};

	//?? useEffect to mimic componentDidMount(). It'll get run anytime there is any change to the props.match.params value coming in.
	useEffect(getSingleUser, [ props.match.params ]);

	// function to render the edit form.
	const renderEditForm = () => {
		// Check if there is some value in the details state
		if (!details.username) {
			// run the service call if the state isn't filled
			getSingleUser();
		} else {
			return (
				<EditProfileForm //?? render the edit form
					theUser={details} 
					getTheUser={getSingleUser}
					{...props} //?? pass down the user, to use the history push to help us redirect to RideList
				/>
			);
		}
	};

	// function to delete the user //TODO return a user profiles (own profile & other's profile)
	const deleteUser = () => {
		// get the 'id' from url via 'props.match.params' object
		const { id } = props.match.params;

		const service = new UserService();

		// service method to the delete route in the backend
		service
			.getUsers(id)
			.then(() => {
				// after submitting the form, 'props.history.push' can be used to redirect to 'home'
				props.history.push('/');
			})
			.catch((error) => console.error(error));
	};

	const ownershipCheck = (user) => {
		console.log(user);
		console.log(props);
		if (props.loggedInUser && user.name === props.loggedInUser._id) {
			return (
				<div>
					<div>{renderEditForm()} </div>
					<button onClick={() => deleteUser(details._id)}>Delete profile</button>
				</div>
			);
		}
	};

	return (
		<div>
			<h1>Welcome to Profile details</h1>
			<h1>{details.username}</h1>
			<img src={details.imageUrl} alt="profile-pic" />
			<p>{details.description}</p>
			{ownershipCheck(details)}
			<br />
			<br />
			<br />
			<Link to="/rides">See all rides</Link>
			<br />
		</div>
	);
};

export default ProfileDetails;

//TODO check if the img src is picking up the GPX's image correctly

/* 


	Get a single user - A xios call
//?? api call to the server to retrieve a single user
		a xios
			.get(`http://localhost:5000/api/user/${id}`, {
				withCredentials: true
			})
			.then((responseFromApi) => {
				console.log(responseFromApi);
				//?? setDetails state to what the API response is. House the response in it by traversing it with .data within the setDetails function.
				setDetails(responseFromApi.data);
			})
			.catch((error) => console.error(error));
	}; 
	
	Delete a user - A xios call
			// api call to the delete route in the backend
		a xios
			.delete(`http://localhost:5000/api/users/${id}`, {
				withCredentials: true //?? making sure only the ride creator can delete said ride.
			})
			.then((results) => {
				// after submitting the form, 'props.history.push' can be used to redirect to 'rides'
				props.history.push('/rides');
			})
			.catch((error) => console.error(error));
	
	*/
