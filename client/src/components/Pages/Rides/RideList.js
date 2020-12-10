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

/* 	const dateSortedRideList = () => {
		listOfRides.meetingDate.sort((a, b) => {
			return a.meetingDate - b.meetingDate;
		}
		)
	}

	{(dateSortedRideList && dateSortedRideList[0].meetingDate)
		? dateSortedRideList.map((ride) => { */


//TODO Regex date & time 

/* 

Regex Date
dd/mm/yyyy, dd-mm-yyyy or dd.mm.yyyy

^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$

Regex Time

^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$
12:00

*/

	return (
		<div className="rides__container">
		  <div style={{ width: "60%", float: "right" }}>
			<h2>Upcoming rides</h2>
			{ listOfRides
			  ? listOfRides.map((ride) => {
				  return (
					<div  key={ride.id}>
					  <Link to={`/rides/${ride._id}`}>
						<h3>{ride.title}</h3>
					  </Link>
					  <p>{ride.description} </p>
					  <p>{ride.meetingDate} </p>
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