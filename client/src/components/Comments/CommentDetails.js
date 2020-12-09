import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EditCommentForm from "../Comments/Form/EditCommentForm";

const CommentDetails = (props) => {
  const [CommentDetails, setCommentDetails] = useState({});


  // function to make api call to the backend
  const getTheComment = () => {
    const { commentId, id } = props.match.params;

    axios
      .get(`http://localhost:5000/api/rides/${id}/comments/${commentId}`)
      .then((responseFromApi) => {
        console.log(responseFromApi);
        setCommentDetails(responseFromApi.data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(getTheComment, [props.match.params]);


	// function to delete the ride
	const deleteComment = () => {
		// get the 'id' from url via 'props.match.params' object
		const { id } = props.match.params;

		// api call to the delete route in the backend
		axios
			.delete(`http://localhost:5000/api/comment/${id}`, {
				withCredentials: true //?? making sure only the ride creator can delete said ride.
			})
			.then((results) => {
				// after submitting the form, 'props.history.push' can be used to redirect to 'rides'
				props.history.push('/comments');
			})
			.catch((error) => console.error(error));
	};

// function to render the edit form.
const renderEditForm = () => {
  // Check if there is some value in the details state
  if (!CommentDetails.title) {
    // run the api call if the state isn't filled
    getTheComment();
  } else {
    return (
      <EditCommentForm //?? render the edit form
        theRide={CommentDetails} //!! pass down the details from state as props to form, in order render existing details to edit form.
        getTheRide={getTheComment}
        {...props} //?? pass down the ride, to use the history push to help us redirect to RideList
      />
    );
  }
};

  const ownershipCheck = (comment) => {
		if (props.loggedInUser && comment.publisher === props.loggedInUser._id) {
		  return (
			<div>
			  <div>{renderEditForm()} </div>
			  <button onClick={() => deleteComment(CommentDetails._id)}>
				Delete comment
			  </button>
			</div>
		  );
		}
	  };

  return (
    <div>
      <h1>{CommentDetails.title}</h1>
      <p>{CommentDetails.description}</p>
      {ownershipCheck(CommentDetails)}
      <br />
      <Link to={`/comments/${props.match.params.id}`}>
        Back to parent ride
      </Link>
    </div>
  );
};

export default CommentDetails;
