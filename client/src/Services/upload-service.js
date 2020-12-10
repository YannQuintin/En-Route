import axios from "axios";

//?? Services are used for anything that requires communication with an API.


class UploadService {
  constructor() {
    this.service = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true,
    });
  }

  // Method to use for uploading a file
  upload = (theFile) => {
    return this.service
      .post("/upload", theFile)
      .then((response) => response.data)
      .catch((err) => {
        console.error(err);
        throw err;
      });
  };
}

export default UploadService;