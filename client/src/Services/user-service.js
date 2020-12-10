import axios from "axios";

class UserService {
  constructor() {
    this.service = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true, // indicates whether or not cross-site Access-Control requests should be made using credentials
    });
  }


  // Method to retrieve all user
  getUsers = () => {
    return this.service.get("/api/users").then((response) => response);
  };

  // Method to retrieve a user
  getOneUser = (id) => {
    return this.service.get(`/api/user/${id}`).then((response) => response);
  };

  // Method to update a user
  updateUser = (id, data) => {
    return this.service
      .put(`/api/users/${id}`, data)
      .then((response) => response);
  };

  // Method to delete a user
  removeUser = (id) => {
    return this.service
      .delete(`/api/users/${id}`)
      .then((response) => response);
  };
}

export default UserService;
