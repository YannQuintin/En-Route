import React, { useState } from 'react';
import axios from 'axios';
// import { Redirect } from 'react-router-dom';

const EditCommentForm = (props) => {
	//!! Deconstructing the props "theComment" passed on from CommentDetails.js
	const [ formState, setFormState ] = useState({
		title: props.theComment.title,
		description: props.theComment.description
	});

	//?? Function handler to submit form
	const handleFormSubmit = (event) => {
		event.preventDefault();

		// form state data to pass with the api call
		const { title, description } = formState;

		axios
			.put(
				`http://localhost:5000/api/rides/${props.theComment._id}`, //?? Looking for specific values to update ==> re-using the props deconstruction
				{
					title,
					description
				},
				{ withCredentials: true }
			)
			.then(() => {
				// run method to call api method to get a single ride
				props.getTheComment();

                //?? after submitting the form, 'props.history.push' can be used to redirect to 'rides', 
                //?? while storing the props' history.
                props.history.push('/rides');
                
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

	return (
		<div>
			<hr />
			<h3>Edit form</h3>
			<form onSubmit={handleFormSubmit}>
				<label htmlFor="title">Title:</label>
				<input 
                    type="text"
                    name="title"
                    value={formState.title}
                    onChange={handleInputChange} 
                />
				<label htmlFor="description">Description:</label>
				<textarea 
                    name="description"
                    value={formState.description}
                    onChange={handleInputChange}
                />
				<input type="submit" value="Submit" />
			</form>
		</div>
	);
};

export default EditCommentForm;
