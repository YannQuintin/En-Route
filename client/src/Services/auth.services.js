import axios from 'axios';

//?? Services are used for anything that requires communication with an API.

class AuthService {
	constructor() {
		this.service = axios.create({
			baseURL: REACT_APP_BASE_URL, //?? Our auth service is setting up the service which is able to send auth requests to the backend.
			withCredentials: true //?? indicates whether or not cross-site Access-Control request should be made using credentials
		});
	}

	/* SignUp method  */
	signup = (username, password) => {
        return this.service
        .post('/signup', { username, password })
        .then((response) => response.data);
	};

	/* Login method  */
	login = (username, password) => {
        return this.service
        .post('/login', { username, password })
        .then((response) => response.data);
	};

	/* Check if user is authenticated method */
	isAuthenticated = () => {
        return this.service
        .get('/loggedin')
        .then((response) => response.data);
	};

	/* Logout method  */
	logout = () => {
        return this.service
        .post('/logout', {})
        .then((response) => response.data);
	};
}

export default AuthService;
