import axios from "axios";

class UserService {
  constructor() {
    this.service = axios.create({
      baseURL: 'http://localhost:5000/api',
      withCredentials: true, // indicates whether or not cross-site Access-Control requests should be made using credentials
    });
  }


  // Method to retrieve all user
  getUsers = () => {
    return this.service.get("/users").then((response) => response);
  };

  // Method to retrieve a user
  getOneUser = (id) => {
    return this.service.get(`/user/${id}`).then((response) => response);
  };

  // Method to update a user
  updateUser = (id, data) => {
    return this.service
      .put(`/users/${id}`, data)
      .then((response) => response);
  };

  // Method to delete a user
  removeUser = (id) => {
    return this.service
      .delete(`/users/${id}`)
      .then((response) => response);
  };
}

export default UserService;
