// components/About.js
 
import React from 'react';
import Adventures from '../Adventures/Adventures';
import Trainings from '../Trainings/Trainings';

const About = () => {
  return (
    <div>
      <div style={{width: '40%', float:"left"}}>
        <Adventures/>
      </div>
      <div style={{width: '60%', float:"right"}}>
        <Trainings />
      </div>
    </div>
  )
}
 
export default About;