import React, { useState, useEffect } from 'react';
// import a xios from 'a xios';
import { Link } from 'react-router-dom';

import EditRideForm from './Forms/EditRideForm';
import AddCommentForm from '../../Comments/Form/AddCommentForm';
import RideService from '../../../Services/ride-service';

//TODO Update the a xios calls using RideService

//TODO
// get a single ride
// Render edit form
// delete a specific / single ride
// render comment form
// if user is ride publisher, allow to edit / delete

const RideDetails = (props) => {
	const [ details, setDetails ] = useState({});

	// function to make api call to the backend to retrieve a single object from the database
	const getSingleRide = () => {
		//?? get the 'id' from url via 'props.match.params' object
		const { id } = props.match.params;

		const service = new RideService();

		// api call to the server to retrieve a single object
		service
			.getOneRide(id)
			.then((responseFromApi) => {
				setDetails(responseFromApi.data);
			})
			.catch((error) => console.error(error));
	};

	//?? useEffect to mimic componentDidMount(). It'll get run anytime there is any change to the props.match.params value coming in.
	useEffect(getSingleRide, [ props.match.params ]);

	// function to render the edit form.
	const renderEditForm = () => {
		// Check if there is some value in the details state
		if (!details.title) {
			// run the api call if the state isn't filled
			getSingleRide();
		} else {
			return (
				<EditRideForm //?? render the edit form
					theRide={details} //!! pass down the details from state as props to form, in order render existing details to edit form.
					getTheRide={getSingleRide}
					{...props} //?? pass down the ride, to use the history push to help us redirect to RideList
				/>
			);
		}
	};

	// function to delete the ride
	const deleteRide = () => {
		// get the 'id' from url via 'props.match.params' object
		const { id } = props.match.params;

		const service = new RideService();

		// api call to the delete route in the backend
		service
			.removeRide(id)
			.then(() => {
				// after submitting the form, 'props.history.push' can be used to redirect to 'rides'
				props.history.push('/rides');
			})
			.catch((error) => console.error(error));
	};

	// function to render add comment form
	const renderAddCommentForm = () => {
		if (!details.title) {
			getSingleRide();
		} else {
			// pass the Ride and method getSingleRide() as a props down to Add comment component
			return <AddCommentForm theRide={details} getTheRide={getSingleRide} />;
		}
	};

	const publisherCheck = (ride) => {
		if (props.loggedInUser && ride.publisher === props.loggedInUser._id) {
			return (
				<div>
					<div>{renderEditForm()} </div>
					<button onClick={() => deleteRide(details._id)}>Delete ride</button>
				</div>
			);
		}
	};

	//!! Need to check whether I can have ride ownership and comment ownership
	//!!

	return (
		<div>
			<h1>Welcome to Ride details</h1>
			<h1>{details.title}</h1>
			<img src={details.imageUrl} alt="ride-route" />
			<p>{details.description}</p>
			<p>{details.meetingTime} </p>
			<p>{details.startLocation} </p>
			<p>{details.endLocation} </p>
			<p>{details.rideLength} </p>
			<p>{details.ridePace} </p>

			{publisherCheck(details)}
			<br />

			{/* <div>{renderEditForm()}</div> */}
			<div>{renderAddCommentForm()} </div>
			<br />
			{/* 			{listOfComments.map((comment) => {
					return (
						<div key={comment._id}>
							<Link to={`/rides/${comment._id}`}>
								<h3>{comment.title}</h3>
							</Link>
							<p>{comment.description} </p>
						</div>
					);
				})} */}
			<br />
			<Link to="/rides">Back to rides</Link>
			<br />
		</div>
	);
};

//!! NOT MVP
//TODO Loop through array of comments per ride.

export default RideDetails;

/* 

Get a single ride A xios call
		//?? api call to the server to retrieve a single object
		a xios
			.get(`http://localhost:5000/api/rides/${id}`, {
				withCredentials: true
			})
			.then((responseFromApi) => {
				console.log(responseFromApi);
				//?? setDetails state to what the API response is. House the response in it by traversing it with .data within the setDetails function.
				setDetails(responseFromApi.data);
			})
			.catch((error) => console.error(error));



Delete a single ride A xios call 

// api call to the delete route in the backend
		a xios
			.delete(`http://localhost:5000/api/rides/${id}`, {
				withCredentials: true //?? making sure only the ride creator can delete said ride.
			})
			.then((results) => {
				// after submitting the form, 'props.history.push' can be used to redirect to 'rides'
				props.history.push('/rides');
			})
			.catch((error) => console.error(error));


*/
