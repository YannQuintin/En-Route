import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import AddRideForm from "./Forms/AddRideForm";
import RideService from '../../../Services/ride-service'


const RideList = () => {
	const [ listOfRides, setListOfRides ] = useState([]);

	//?? Function to help get all rides from the backend
	const getAllRides = () => {
		const service = new RideService();

		service
		.getRides()
		.then((responseFromApi) => {
		  setListOfRides(responseFromApi.data);
		  console.log(responseFromApi.data)
		})
		.catch((error) => console.error(error));
	};

	//??useEffect(cbFunction, someValueToMonitor);
	useEffect(getAllRides, []);



	return (
		<div>
		  <div style={{ width: "60%", float: "right" }}>
			<h2>Upcoming rides</h2>
			{listOfRides
			  ? listOfRides.map((ride) => {
				  return (
					<div key={ride.id}>
					  <Link to={`/rides/${ride._id}`}>
						<h3>{ride.title}</h3>
					  </Link>
					  <p>{ride.description} </p>
					  <p>{ride.meetingTime} </p>
					  <p>{ride.startLocation} </p>
					  <p>{ride.endLocation} </p>
					  <p>{ride.rideLength} </p>
					  <p>{ride.ridePace} </p>

					</div>
				  );
				})
			  : `Loading...`}
		  </div>
		  <div style={{ width: "40%", float: "left" }}>
			<AddRideForm getData={getAllRides} />
		  </div>
		</div>
	  );
};

export default RideList;

/* //TODO Toggle appearence of Add ride form


		<div>
			<div style={{ width: '60%', float: 'left' }}>
				<h2>All rides from the Backend</h2>
				{listOfRides.map((ride) => {
					return (
						<div key={ride._id}>
							<Link to={`/rides/${ride._id}`}>
								<h3>{ride.title}</h3>
							</Link>
							<p>{ride.description} </p>
						</div>
					);
				})}
			</div>

		</div>


			<div style={{ width: '40%', float: 'right' }}>
				<AddRideForm getData={getAllRides} />  //?? getAllRides function is passed down as a prop 'getData'
                
				</div>

*/