import React from 'react';
 
const trainings = () => {
  const trainingPlan = [
    {
        trainingPlan:"Off Season training",
        platform:"Strava & Zwift",
    },
    {
        trainingPlan:"Off Season training",
        platform:"Strava & Zwift",
    },
    {
        trainingPlan:"Off Season training",
        platform:"Strava & Zwift",
    }
  ]
 
  return (
    <div>
      <h2>Trainings & Session:</h2>
      {trainingPlan.map((eachTraining, index) => {
        return (
          <div key={index}>
            <h3>{eachTraining.trainingPlan}</h3>
            <p>{eachTraining.platform}</p>
          </div>
          )
      })}
    </div>
  )
}
 
export default trainings;