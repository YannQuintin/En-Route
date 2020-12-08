const { Router } = require('express');
const mongoose = require('mongoose');
const router = Router();

const User = require('../models/user.model');
//const Comment = require("./comment.model");


/* GET - retrieves all the users from the database */
router.get('/users', (req, res) => {
	User.find()
		// .populate('rides') // we use populate to show the comments data associated with the rides.
		.then((allTheUsers) => {
			res.status(200).json(allTheUsers);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

/* GET route => to get a specific ride/detailed view */
router.get('/user/:id', (req, res) => {
	const { id } = req.params;

	// Check if the incoming id is a valid ObjectId type
	//Mongoose checks if the ObjectID is valid
	if (!mongoose.Types.ObjectId.isValid(id)) {
		res.status(400).json({ message: 'Whoopsies, the specified ID is not valid.' }); // key-value pairing happens here
		return;
	}

	// Our rides have array of comments' ids and
	// we can use .populate() method to get the whole comment objects
	User.findById(id)
		.populate("rides") //TODO add to profile page.
		.populate("comments") //TODO 
		.then((user) => {
			res.status(200).json(user);
		})
		.catch((error) => {
			res.status(500).json(error);
		});
});

/* PUT route => to update a specific user */
router.put('/users/:id', (req, res) => {
	const { id } = req.params;

	// Check if the incoming id is a valid ObjectId type
	if (!mongoose.Types.ObjectId.isValid(id)) {
		res.status(400).json({ message: 'Whoopsies, the specified user ID is not valid.' }); // key-value pairing happens here
		return;
	}

	User.findByIdAndUpdate(id, req.body)
		.then(() => {
			res.status(200).json({
				message: `User with ${id} is updated successfully.`
			});
		})
		.catch((error) => {
			res.status(500).json(error);
		});
});

// DELETE route => to delete a specific ride
router.delete('/users/:id', (req, res) => {
	const { id } = req.params;

	// Check if the incoming id is a valid ObjectId type
	if (!mongoose.Types.ObjectId.isValid(id)) {
		res.status(400).json({ message: 'Whoopsies, the specified ID is not valid.' });
		return;
	}

	Ride.findByIdAndRemove(id)
		.then(() => {
			res.status(200).json({
				message: `Oh well! The user profile ${id} is removed successfully.`
			});
		})
		.catch((error) => {
			res.status(500).json(error);
		});
});

module.exports = router;
