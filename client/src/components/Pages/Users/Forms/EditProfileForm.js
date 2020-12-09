import React, { useState } from 'react';
import axios from 'axios';
import UploadService from '../../../../Services/upload-service';
// import { Redirect } from 'react-router-dom';

const EditRideForm = (props) => {
	//!! Deconstructing the props "theRide" passed on from RideDetails.js
	const [ formState, setFormState ] = useState({
		username: props.theUser.username,
		password: props.theUser.password,
		email: props.theUser.email,
		imageUrl: props.theUser.imageUrl,
		description: props.theUser.description,
		sports: props.theUser.sports
	});

	//?? Function handler to submit form
	const handleFormSubmit = (event) => {
		event.preventDefault();

		// form state data to pass with the api call
		const { 
			username, 
			password, 
			email, 
			imageUrl, 
			description, 
			sports 
		} = formState;

		axios
			.put(
				`http://localhost:5000/api/users/${props.theUser._id}`, //?? Looking for specific values to update ==> re-using the props deconstruction
				{
					username,
					password, //TODO going to need to call passport to change that one
					email,
					imageUrl,
					description,
					sports
				},
				{ withCredentials: true }
			)
			.then(() => {
				// run method to call api method to get a single users
				props.getTheUser();

				//?? after submitting the form, 'props.history.push' can be used to redirect to 'rides',
				//?? while storing the props' history.
				props.history.push('/user/:id');
			})
			.catch((error) => console.error(error));
	};

	// Function handler to monitor the new changes in the inputs
	const handleInputChange = (event) => {
		// Data from the input field
		const { name, value } = event.target;

		// Set new form data
		setFormState({ ...formState, [name]: value });
	};

	const service = new UploadService();

	// Function to uploading a file
	const handleFileUpload = (event) => {
		// Creates a new FormData object that will take the file upload data
		const uploadData = new FormData();
		uploadData.append('imageUrl', event.target.files[0]);

		// upload the data to cloudinary
		service
			.upload(uploadData)
			.then((response) => {
				// The response from uploading to cloudinary is the url which will be saved in the database.
				setFormState({ ...formState, imageUrl: response.cloudinaryUrl });
			})
			.catch((err) => {
				console.log('Error while hadnling the  image file upload: ', err);
			});
	};

	return (
		<div>
			<hr />
			<h3>Edit form</h3>
			<form onSubmit={handleFormSubmit}>
				<label htmlFor="imageUrl">Profile picture:</label>
				<input type="file" name="imageUrl" onChange={handleFileUpload} />
				<br />
				<label htmlFor="username">Username:</label>
				<input type="text" name="username" value={formState.username} onChange={handleInputChange} />
				<label htmlFor="password">Password:</label>
				<input type="text" name="password" value={formState.password} onChange={handleInputChange} />
				<label htmlFor="sports">Sports:</label>
				<input type="text" name="sports" value={formState.sports} onChange={handleInputChange} />
				<label htmlFor="description">Description:</label>
				<textarea name="description" value={formState.description} onChange={handleInputChange} />
				<input type="submit" value="Submit" />
			</form>
		</div>
	);
};

export default EditRideForm;
