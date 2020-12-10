import React, { useState }from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AuthService from '../../Services/auth.services';

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

export default function Login(props) {
  const classes = useStyles();
  const [ loginState, setLoginState ] = useState(initialState);
  const [regErrorMsg, setRegErrorMsg ] = useState("");

  const service = new AuthService();

    // Form submission handler
	const handleFormSubmit = (event) => {
		event.preventDefault();

		const { username, password } = loginState;
		// Use the service.signup method to make a call to the back end and sign the user up
    service
      .login(username, password)
      .then((response) => {
        setLoginState({ username: "", password: "" });
        props.getUser(response);
      })
      .catch((error) => {
        const { message } = error.response.data;
        setRegErrorMsg(message);
        console.log(error);
      });
	};

  // Function to handle changes in the input fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginState({ ...loginState, [name]: value });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleFormSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            value={loginState.username}
            type="username"
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
            label="Password"
            type="password"
            name="password"
            id="password"
            autoComplete="current-password"
            value={loginState.password}
            onChange={handleChange}

          />
          <Button
            type="submit"
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
            
              <Link href="/signup" variant="body2">
              {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>

    </Container>
  );
}