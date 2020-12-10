import axios from "axios";

class RideService {
  constructor() {
    this.service = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true, // indicates whether or not cross-site Access-Control requests should be made using credentials
    });
  }

  /* process.env.REACT_APP_BASE_URL */

  // Create a Ride
  createRide = (data) => {
    return this.service
      .post("/api/rides", data)
      .then((response) => response);
  };

  // Method to retrieve all ride
  getRides = () => {
    return this.service.get("/api/rides").then((response) => response);
  };

  // Method to retrieve a ride
  getOneRide = (id) => {
    return this.service.get(`/api/rides/${id}`).then((response) => response);
  };

  // Method to update a ride
  updateRide = (id, data) => {
    return this.service
      .put(`/api/rides/${id}`, data)
      .then((response) => response);
  };

  // Method to delete a ride
  removeRide = (id) => {
    return this.service
      .delete(`/api/rides/${id}`)
      .then((response) => response);
  };
}

export default RideService;