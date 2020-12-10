import axios from 'axios';

//?? Services are used for anything that requires communication with an API.

class AuthService {
	constructor() {
		this.service = axios.create({
			baseURL: process.env.REACT_APP_BASE_URL,
			withCredentials: true //?? indicates whether or not cross-site Access-Control requests should be made using credentials
		});
	}

	// Method to use in our SignUp component
	signup = (username, password) => {
		return this.service.post('/api/signup', { username, password }).then((response) => response.data);
	};

	/* Login method  */
	login = (username, password) => {
		return this.service.post('/api/login', { username, password }).then((response) => response.data);
	};

	/* Check if user is authenticated method */
	isAuthenticated = () => {
		return this.service.get('/api/loggedin').then((response) => response.data);
	};

	/* Logout method  */
	logout = () => {
		return this.service.post('/api/logout', {}).then((response) => response.data);
	};
}

export default AuthService;
