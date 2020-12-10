import React, { useState } from "react";
import './App.css';
import { Switch, Route } from "react-router-dom";

import Signup from "../Auth/SignUp";
import Login from "../Auth/Login";
import ProtectedRoute from "../Auth/ProtectedRoutes";


import Navbar from "../../components/Navbar/Navbar";
import RideList from "../../components/Pages/Rides/RideList";
import RideDetails from '../../components/Pages/Rides/RideDetails';
import Home from '../../components/Pages/Home/Home';
import About from './../Pages/About/About';
import Footer from '../Footer/Footer';
import ProfileDetails from '../../components/Pages/Users/ProfileDetails';
import UserList from '../../components/Pages/Users/UserList'
import Adventures from './../Pages/Adventures/Adventures'




import AuthService from "../../Services/auth.services";


function App() {
  
  //?? App.js state to pass the user session around the routes.
  const [ loggedInUser, setLoggedInUser] = useState(null);

  const service = new AuthService();

    //?? Function to help fetch a logged in user
    const fetchUser = () => {
      if (loggedInUser === null) {
        service
          .isAuthenticated()
          .then((response) => {
            setLoggedInUser(response);
          })
          .catch((err) => {
            setLoggedInUser(false); //?? Using boolean here so we can do conditional rendering.
          });
      }
    };


  //?? Function to help get the loggedIn user
  const getLoggedInUser = (userObject) => setLoggedInUser(userObject);

  //?? The function is run to check if the user is logged in.
  fetchUser();

  return (
    <section className="App">
      <Navbar userInSession={loggedInUser} getUser={getLoggedInUser} />
      <Switch>
        <Route
          exact
          path="/signup"
          render={() => <Signup getUser={getLoggedInUser} />}
        />
        <Route
          exact
          path="/login"
          render={() => <Login getUser={getLoggedInUser} />}
        />
        <Route
          exact
          user={loggedInUser}
          path="/"
          render={() => <Home getUser={getLoggedInUser} />}
        />
        <Route
          exact
          user={loggedInUser}
          path="/about"
          render={() => <About getUser={getLoggedInUser} />}
        />
        <Route
          user={loggedInUser}
          path="/adventures"
          render={() => <Adventures getUser={getLoggedInUser} />}
        />
        <ProtectedRoute
          exact
          user={loggedInUser}
          path="/rides/:id"
          component={RideDetails}
        />
        <Route
          exact
          user={loggedInUser}
          path="/rides"
          render={() => <RideList getUser={getLoggedInUser}/>}
        />
        <ProtectedRoute
          user={loggedInUser}
          path="/users"
          render={() => <UserList getUser={getLoggedInUser} />}
        />
        <Route
          user={loggedInUser}
          path="/user/:id"
          component={ProfileDetails}
        />
      </Switch>
      <Footer/>
    </section>
  );
};
export default App;


/* 

return loggedInUser ? (
    <section className="App">
      <Navbar userInSession={loggedInUser} getUser={getLoggedInUser} />
      <Home />
      <Switch>
        <ProtectedRoute
          user={loggedInUser}
          path="/rides/:id"
          component={RideDetails}
        />
        <ProtectedRoute
          user={loggedInUser}
          path="/rides"
          component={RideList}
        />
        <ProtectedRoute
          user={loggedInUser}
          path="/users"
          component={UserList}
        />
        <ProtectedRoute
          user={loggedInUser}
          path="/user/:id"
          component={ProfileDetails}
        />
      </Switch>
      <Footer/>
    </section>
  ) : (
    <section className="App">
      <Navbar userInSession={loggedInUser} getUser={getLoggedInUser} />
      <Home />
      <About />
      <Switch>
        <Route //?? Here we are setting up the prop route so that the user can be passed on to the app from signup to the App.js
          exact
          path="/signup" //?? Passing this function down as a Prop to Signup component.
          render={() => <Signup getUser={getLoggedInUser} />} //?? the render method allow us to pass on a callback function with that functionality returning the Signup Component which has the getUser prop.
        /> 
        <Route
          exact
          path="/login"
          render={() => <Login getUser={getLoggedInUser} />}
        />
        <ProtectedRoute
          user={loggedInUser}
          path="/rides/:id"
          component={RideDetails}
        />
        <ProtectedRoute
          user={loggedInUser}
          path="/rides"
          component={RideList}
        />
      </Switch>
      
      <Footer/>
    </section>
  );

*/