import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { Link } from "react-router-dom";
import UserService from './../../../Services/user-service'
//TODO update server routing to service routing


const UsersList = () => {
	const [ listOfUsers, setListOfUsers ] = useState([]);

	//?? Function to help get all rides from the backend
	const getAllUsers = () => {
		const service = new UserService();

		service
		.getUsers()
		.then((responseFromApi) => {
			setListOfUsers(responseFromApi.data);
		})
		.catch((error) => console.error(error));
	};

	//??useEffect(cbFunction, someValueToMonitor);
	useEffect(getAllUsers, []);

	return (
		<div>
			<div style={{ width: '60%', float: 'left' }}>
				<h2>Community of riders</h2>
				{listOfUsers.map((user) => {
					return (
						<div key={user._id}>
							<Link to={`/users/${user._id}`}>
								<h3>{user.username}</h3>
							</Link>
							<p>{user.description}</p>
						</div>
					);
				})}
			</div>

		</div>
	);
};

export default UsersList;

//TODO Remove 
/* 			<div style={{ width: '40%', float: 'right' }}>
				<AddRideForm getData={getAllUsers} /> getAllRides function is passed down as a prop 'getData'
			<div/> 
			
			
		axios
			.get(`http://localhost:5000/api/users`, { withCredentials: true })
			.then((responseFromApi) => {
				console.log(responseFromApi);
				setListOfUsers(responseFromApi.data);
			})
			.catch((error) => console.error(error));
	};			
			
			
			
			
			
			*/