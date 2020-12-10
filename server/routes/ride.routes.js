const { Router } = require('express');
const mongoose = require('mongoose');
const router = Router();

const Ride = require('../models/ride.model');
//const Comment = require("./comment.model");

// Create a ride
// Get a specific ride
// Update specific ride
// Delete ride
// 

/* POST - creates a new ride */
router.post('/rides', (req, res) => {
	const { title, description,  imageUrl, meetingDate, meetingTime, startLocation , endLocation, rideLength, ridePace } = req.body;

	Ride.create({
		title,
		description,
		imageUrl,
		meetingDate,
		meetingTime,
		startLocation,
		endLocation,
		rideLength,
		ridePace,
		publisher: req.user_id
	})
		.then((response) => {
			res.status(200).json(response);

			//?? Could use .send if needed to extract anything else than a json
			//?? res.startus(200).send(response) 
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

/* GET - retrieves all the rides from the database */
router.get('/rides', (req, res) => {
	Ride.find()
		.populate('comments') // we use populate to show the comments data associated with the rides.
		.then((allTheRides) => {
			res.status(200).json(allTheRides);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

/* GET route => to get a specific rides/detailed view */
router.get('/rides/:id', (req, res) => {
	const { id } = req.params;

	// Check if the incoming id is a valid ObjectId type
	//Mongoose checks if the ObjectID is valid
	if (!mongoose.Types.ObjectId.isValid(id)) {
		res.status(400).json({ message: 'Whoopsies, the specified ID is not valid.' }); // key-value pairing happens here
		return;
	}

	// Our rides have array of comments' ids and
	// we can use .populate() method to get the whole comment objects
	Ride.findById(id)
		.populate("comments")
		.then((ride) => {
			res.status(200).json(ride);
		})
		.catch((error) => {
			res.status(500).json(error);
		});
});

/* PUT route => to update a specific ride */
router.put('/rides/:id', (req, res) => {
	const { id } = req.params;

	// Check if the incoming id is a valid ObjectId type
	if (!mongoose.Types.ObjectId.isValid(id)) {
		res.status(400).json({ message: 'Whoopsies, the specified ride ID is not valid.' }); // key-value pairing happens here
		return;
	}

	Ride.findByIdAndUpdate(id, req.body)
		.then(() => {
			res.status(200).json({
				message: `Ride with ${id} is updated successfully.`
			});
		})
		.catch((error) => {
			res.status(500).json(error);
		});
});

// DELETE route => to delete a specific ride
router.delete('/rides/:id', (req, res) => {
	const { id } = req.params;

	// Check if the incoming id is a valid ObjectId type
	if (!mongoose.Types.ObjectId.isValid(id)) {
		res.status(400).json({ message: 'Whoopsies, the specified ID is not valid.' });
		return;
	}

	Ride.findByIdAndRemove(id)
		.then(() => {
			res.status(200).json({
				message: `Oh well! The ride ${id} is removed successfully.`
			});
		})
		.catch((error) => {
			res.status(500).json(error);
		});
});

module.exports = router;
