const { Router } = require('express');
const mongoose = require('mongoose');
const Comment = require('../models/comment.model');
const Ride = require('../models/ride.model');

const router = Router();

// GET route => to retrieve a specific comment
router.get('/rides/:ridesId/comments/:commentId', (req, res) => {
	const { commentId } = req.params;

	// Find a comment by a given comment id.
	Comment.findById(commentId)
		.then((comment) => {
			res.status(200).json(comment);
		})
		.catch((error) => {
			res.status(500).json(error);
		});
});

// GET route => to retrieve all comments
router.get('/comments', (req, res) => {
	// Find a comment by a given comment id.
	Comment.find()
		.populate('ride')
		.then((comment) => {
			res.status(200).json(comment);
		})
		.catch((error) => {
			res.status(500).json(error);
		});
});

// POST route => to create a new comment
router.post("/comments", (req, res) => {
    const { title, description, publisher, rideId } = req.body;
  
    Comment.create({
      title,
      description,
      publisher,
      ride: rideId,
    })
      .then((response) => {
        return Ride.findByIdAndUpdate(rideId, {
          $push: { comments: response._id },
        });
      })
      .then((theResponse) => {
        res.status(200).json(theResponse);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
});

// PUT route => to update a specific comment
router.put("/comments/:id", (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }
  
    Comment.findByIdAndUpdate(id, req.body)
      .then(() => {
        res.status(200).json({
          message: `The comment with ${id} is updated successfully.`,
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });

// DELETE route => to delete a specific comment
router.delete("/comments/:id", (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Whoopsies, the specified comment ID is not valid." });
      return;
    }
  
    Comment.findByIdAndRemove(id)
      .then(() => {
        res.status(200).json({
          message: `Comment with ${id} is removed successfully.`,
        });
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  });
  
  module.exports = router;