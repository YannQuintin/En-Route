import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AuthService from '../../Services/auth.services';
import { useHistory } from 'react-router-dom';

const initialState = { username: '', password: '' }; //?? allows for the Hook to pass the state

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const  Signup = (props) => {
  const classes = useStyles();
  const [ regForm, setRegForm ] = useState(initialState);
  const [ regErrorMsg, setRegErrorMsg ] = useState("");

  const service = new AuthService();

  const history = useHistory();

    // Form submission handler
	const handleFormSubmit = (event) => {
		event.preventDefault();

		const { username, password } = regForm; //??Getting these from the state
    

		// Use the service.signup method to make a call to the back end and sign the user up
		service //?? sending the username & password from State using the service 'signup'
			.signup(username, password)
			.then((response) => {
				setRegForm(initialState);
        props.getUser(response); //?? Not entirely sure what is happening here
        history.push('/rides')
				console.log("SIGN UP RESPONSE", response);
			})
			.catch((error) => {
                console.log(error.response)
				const { message } = error.response;
				setRegErrorMsg(message);
			});
	};

    	// Change handler
	const handleChange = (event) => {
		const { name, value } = event.target;
		setRegForm({ ...regForm, [name]: value });
	};

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleFormSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="User Name"
            name="username"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
           <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> 
          <Button
            type="submit"
            value="Signup"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Let's Ride!
          </Button>
          <br />
			{regErrorMsg && <span style={{ color: 'red' }}>{regErrorMsg}</span>}
          <Grid container>
            <Grid item xs>
              <Link href="/" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
			
              <Link href="/login" variant="body2">
                {"Already a member? Login"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>

    </Container>
  );
}

//!! Malcom's code tryout

/* 
import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthService from "./../../Services/auth.services";

const initialState = { username: "", password: "" };

const Signup = (props) => {
  const [regForm, setRegForm] = useState(initialState);
  const [regErrorMsg, setRegErrorMsg] = useState("");

  const service = new AuthService();

  // Form submission handler
  const handleFormSubmit = (event) => {
    event.preventDefault();

    const { username, password } = regForm;

    // Use the service.signup method to make a call to the back end and sign the user up
    service
      .signup(username, password)
      .then((response) => {
        setRegForm(initialState);
        props.getUser(response);
      })
      .catch((error) => {
        const { message } = error.response.data;
        setRegErrorMsg(message);
        console.log(error);
      });
  };

  // Change handler
  const handleChange = (event) => {
    const { name, value } = event.target;
    setRegForm({ ...regForm, [name]: value });
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={regForm.username}
          onChange={handleChange}
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={regForm.password}
          onChange={handleChange}
        />

        <input type="submit" value="Signup" />
      </form>
      <br />

      {regErrorMsg && <span style={{ color: "red" }}>{regErrorMsg}</span>}

      <p>
        Already have account?
        <Link to={"/"}> Login</Link>
      </p>
    </div>
  );
}; */

export default Signup;