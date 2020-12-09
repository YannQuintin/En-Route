import React , { useState } from 'react';
import './Footer.css';
import { Button } from '../Button/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';


function Footer(props) {
    const [ formState, setFormState ] = useState([]);

    // Function handler for input changes in the form
	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormState({ ...formState, [name]: value });
    };

    // Function handler for form submission
	const handleFormSubmit = (event) => {
		// Prevent default form action
		event.preventDefault();

		// Extract values to use with axios call
		const { email } = formState;

        //TODO this is not linked to MailChimp API 
		axios
			.post(
				'http://localhost:5000/api/email',
				{ email },
				 // Allows for verification of logged in state of the user.
			)
			.then(() => {
				// props.getData();
				//!! use the getAllRides function from RidesList.js to automatically render the data to the Front End
				//?? This is resetting the State
				setFormState([]);
			})
			.catch((error) => console.error(error));
	};

  return (
    <div className='footer-container'>
      <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
          Join the Adventure newsletter to receive the best cycling routes, journey prep tips and gear deals!
        </p>
        <p className='footer-subscription-text'>
          You can unsubscribe at any time.
        </p>
        <div className='input-areas'>
          <form onSubmit={handleFormSubmit}>
            <input
              className='footer-input'
              name='email'
              type='email'
              placeholder='Your Email'
            />
            <Button buttonStyle='btn--outline' onChange={handleInputChange}>Subscribe</Button>
          </form>
        </div>
      </section>
      <div className='footer-links'>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2>About Us</h2>
            <Link to='/about'>Cycling</Link>
            <Link to='/about'>Coffee</Link>
            <Link to='/'>Ride Ambassador </Link>
            <Link to='/'>Terms of Service</Link>
          </div>
{/*           <div class='footer-link-items'>
            <h2>Contact Us</h2>
            <Link to='/'>Contact</Link>
            <Link to='/'>Cycling Trips</Link>
            <Link to='/'>Sponsorships</Link>
          </div> */}
        </div>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2>Services</h2>
            <Link to='/'>Coffee Roasting</Link>
            <Link to='/'>Custom Bikes</Link>
            <Link to='/'>Bike Maintenance</Link>
            <Link to='/'>Race bike rental</Link>
          </div>
{/*           <div className='footer-link-items'>
            <h2>Social Media</h2>
            <Link to='/'>Instagram</Link>
            <Link to='/'>Facebook</Link>
            <Link to='/'>Youtube</Link>
            <Link to='/'>Twitter</Link>
          </div> */}
        </div>
      </div>
      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
            <Link to='/' className='social-logo'>
              En_Route
              <i className='fab fa-typo3' />
            </Link>
          </div>
          <small className='website-rights'>En_Route © 2020</small>
          <div className='social-icons'>
            <Link
              className='social-icon-link facebook'
              to='/'
              target='_blank'
              aria-label='Facebook'
            >
              <i className='fab fa-facebook-f' />
            </Link>
            <Link
              className='social-icon-link instagram'
              to='/'
              target='_blank'
              aria-label='Instagram'
            >
              <i className='fab fa-instagram' />
            </Link>
            <Link
              className='social-icon-link youtube'
              to='/'
              target='_blank'
              aria-label='Youtube'
            >
              <i className='fab fa-youtube' />
            </Link>
            <Link
              className='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='Twitter'
            >
              <i className='fab fa-twitter' />
            </Link>
            <Link
              className='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='LinkedIn'
            >
              <i className='fab fa-linkedin' />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;