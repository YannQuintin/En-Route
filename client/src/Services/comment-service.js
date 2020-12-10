import axios from "axios";

class CommentService {
  constructor() {
    this.service = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true, // indicates whether or not cross-site Access-Control requests should be made using credentials
    });
  }

  // Create new comment
  createComment = (data) => {
    return this.service.post("/api/comments", data).then((response) => response);
  };

  // Get a specific comment
  getOneComment = (RideId, commentId) => {
    return this.service
      .get(`/api/rides/${RideId}/comments/${commentId}`)
      .then((response) => response);
  };
}

export default CommentService;