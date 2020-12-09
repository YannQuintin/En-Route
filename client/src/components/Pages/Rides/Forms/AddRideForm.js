import React, { useState } from 'react';
// import a xios from 'a xios';
import './Form.css';
import RideService from '../../../../Services/ride-service';
//import UploadService from '../../../../Services/upload-service';




const initialState = {
	title: '',
	description: '',
	imageUrl: '',
	meetingTime: '',
	startLocation: '',
	endLocation: '',
	rideLength: '',
	ridePace: ''
};

const AddRideForm = (props) => {
	const [ formState, setFormState ] = useState(initialState);

	// const service = new UploadService();

	// Function handler for input changes in the form
	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormState({ ...formState, [name]: value });
	};

	/* 	// Function to uploading a file
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
				console.log('Error while handling the image file upload: ', err);
			});
	}; */

	// Function handler for form submission
	const handleFormSubmit = (event) => {
		// Prevent default form action
		event.preventDefault();

		// Extract values to use with service call
		const {
			title,
			description,
			imageUrl,
			meetingTime,
			startLocation,
			endLocation,
			rideLength,
			ridePace
		} = formState;

		const service = new RideService();

		// Use the Ride service to save ride's form data in the backend
		service
			.createRide({
				title,
				description,
				imageUrl,
				meetingTime,
				startLocation,
				endLocation,
				rideLength,
				ridePace
			})
			.then(() => {
				props.getData();
				setFormState(initialState);
			})
			.catch((error) => console.error(error));
	};

	return (
		<div>
			<h1>Add your next ride</h1>
			<form onSubmit={handleFormSubmit}>
				<label htmlFor="title">Title:</label>
				<input
					type="text"
					name="title"
					value={formState.title}
					onChange={handleInputChange}
					placeholder="e.g. Low intensity ride"
				/>
				<br />
				<label htmlFor="description">Description:</label>
				<textarea name="description" value={formState.description} onChange={handleInputChange} />
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
				{/* this logic allows us disable the Submit button until file is uploaded. */}
				{/* 				{formState.imageUrl ? ( 
					<button type="submit">Submit</button>
				) : (
					<button disabled type="submit">
						Submit
					</button>
				)} */}
				<button type="submit">Submit</button>
			</form>
			
		</div>
	);
};

export default AddRideForm; /* 

API Call Add a single ride 
		// Make api call to the backend to save ride's form data
		//?? Refresher a xios.post(url, dataToSend) is the format the API call takes.
		a xios
			.post(
				'http://localhost:5000/api/rides',
				{ title, description, imageUrl, meetingTime, startLocation, endLocation, rideLength, ridePace, comments, publisher, participants },
				{ withCredentials: true } // Allows for verification of logged in state of the user.
			)
			.then(() => {
				props.getData();
				//!! use the getAllRides function from RidesList.js to automatically render the data to the Front End
				//?? This is resetting the State
				setFormState(initialState);
			})
			.catch((error) => console.error(error));

*/

//TODO Make the picture url upload work.


//?? This is the floating later stuff

 /* 

class Input extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			active: (props.locked && props.active) || false,
			value: props.value || '',
			error: props.error || '',
			label: props.label || 'Label'
		};
	}

	changeValue(event) {
		const value = event.target.value;
		this.setState({ value, error: '' });
	}

	handleKeyPress(event) {
		if (event.which === 13) {
			this.setState({ value: this.props.predicted });
		}
	}

	render() {
		const { active, value, error, label } = this.state;
		const { predicted, locked } = this.props;
		const fieldClassName = `field ${(locked ? active : active || value) && 'active'} ${locked &&
			!active &&
			'locked'}`;

		return (
			<div className={fieldClassName}>
				{active && value && predicted && predicted.includes(value) && <p className="predicted">{predicted}</p>}
				<input
					id={1}
					type="text"
					value={value}
					placeholder={label}
					onChange={this.changeValue.bind(this)}
					onKeyPress={this.handleKeyPress.bind(this)}
					onFocus={() => !locked && this.setState({ active: true })}
					onBlur={() => !locked && this.setState({ active: true })}
				/>
				<label htmlFor={1} className={error && 'error'}>
					{error || label}
				</label>
			</div>
		);
	}
}

*/

