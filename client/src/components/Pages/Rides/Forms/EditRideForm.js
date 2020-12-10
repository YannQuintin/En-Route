import React, { useState } from 'react';
// import a xios from 'a xios';
import RideService from '../../../../Services/ride-service';
//import UploadService from '../../../../Services/upload-service';
// import { Redirect } from 'react-router-dom';

const EditRideForm = (props) => {
	//!! Deconstructing the props "theRide" passed on from RideDetails.js
	const [ formState, setFormState ] = useState({
		title: props.theRide.title,
		description: props.theRide.description,
		imageUrl: props.theRide.imageUrl,
		meetingDate: props.theRide.meetingDate,
		meetingTime: props.theRide.meetingTime,
		startLocation: props.theRide.startLocation,
		endLocation: props.theRide.endLocation,
		rideLength: props.theRide.rideLength,
		ridePace: props.theRide.ridePace
	});

	

	//?? Function handler to submit form
	const handleFormSubmit = (event) => {
		// event.preventDefault();

		const service = new RideService();

		// form state data to pass with the api call
		const {
			title,
			description,
			imageUrl,
			meetingDate,
			meetingTime,
			startLocation,
			endLocation,
			rideLength,
			ridePace
		} = formState;

		service
		.updateRide(props.theRide._id, {
		  title,
		  description,
		  imageUrl,
		  meetingDate, 
		  meetingTime,
		  startLocation,
		  endLocation,
		  rideLength,
		  ridePace
		})
		.then(() => {
		  // run method to call api method to get a single ride
		  props.getTheRide();
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

	/* // Function to uploading a file
	const handleFileUpload = (event) => {
		// Creates a new FormData object that will take the file upload data
		const uploadData = new FormData();
		uploadData.append('imageUrl', event.target.files[0]);

		const service = new UploadService();

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
	}; */

	return (
		<div>
			<hr />
			<h3>Edit form</h3>
			<form onSubmit={handleFormSubmit}>
				<label htmlFor="title">Title:</label>
				<input type="text" name="title" value={formState.title} onChange={handleInputChange} />
				<br />
				<label htmlFor="description">Description:</label>
				<textarea name="description" value={formState.description} onChange={handleInputChange} />
				<input type="submit" value="Submit" />
				<br />
				<label htmlFor="meetingDate">Meeting date:</label>
				<input name="meetingDate" value={formState.meetingDate} onChange={handleInputChange} />
				<br />
				<label htmlFor="meetingTime">Meeting time:</label>
				<input name="meetingTime" value={formState.meetingTime} onChange={handleInputChange} />
				<br />
				<label htmlFor="startLocation">Starting point:</label>
				<input name="startLocation" value={formState.startLocation} onChange={handleInputChange} />
				<br />
				<label htmlFor="endLocation">Ending point:</label>
				<input name="endLocation" value={formState.endLocation} onChange={handleInputChange} />
				<br />
				<label htmlFor="rideLength">Ride Length:</label>
				<input name="rideLength" value={formState.rideLength} onChange={handleInputChange} />
				<br />
				<label htmlFor="ridePace">Ride pace:</label>
				<input
					name="ridePace"
					value={formState.ridePace}
					onChange={handleInputChange}
					placeholder="e.g. Easy Peasy - 28km/h"
				/>
				<br />
{/* 				<label htmlFor="imageUrl">Ride's map:</label>
				<input type="file" name="imageUrl" onChange={handleFileUpload} />
				<br /> */}
				<button type="submit">Submit</button>
				{/* this logic allows us disable the Submit button until file is uploaded. */}
	{/* 			{formState.imageUrl ? (
					<button type="submit">Submit</button>
				) : (
					<button disabled type="submit">
						Submit
					</button>
				)} */}
			</form>
		</div>
	);
};

export default EditRideForm;


/* 
API Call to edit a single ride

a xios
			.put(
				`http://localhost:5000/api/rides/${props.theRide._id}`, //?? Looking for specific values to update ==> re-using the props deconstruction
				{
					title,
					description,
					imageUrl,
					meetingTime,
					startLocation,
					endLocation,
					rideLength,
					ridePace
				},
				{ withCredentials: true }
			)
			.then(() => {
				// run method to call api method to get a single ride
				props.getTheRide();

				//?? after submitting the form, 'props.history.push' can be used to redirect to 'rides',
				//?? while storing the props' history.
				props.history.push('/rides');
			})
			.catch((error) => console.error(error));

*/