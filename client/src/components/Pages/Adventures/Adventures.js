import React from 'react';
 
const Adventures = () => {
  const trips = [
    {
      name:"My daily ride",
      city: "Oudekerk",
      country:"North Holland",
      ridingType:"Low Intensity Training",
      Description:"On this recurrent ride, I enjoy being able to do a long and steady ride without too much wind and with many other cyclists",
    },
    {
        name:"My dream ride",
        city: "Mont Ventoux",
        country:"France - Provence",
        ridingType:"High Intensity Training",
        Description:"On this recurrent ride, I enjoy being able to do a long and steady ride without too much wind and with many other cyclists",
      },
      {
        name:"My daily ride",
        city: "Oudekerk",
        country:"North Holland",
        ridingType:"Low Intensity Training",
        Description:"On this recurrent ride, I enjoy being able to do a long and steady ride without too much wind and with many other cyclists",
      }
  ]

 
  return (
    <div className="">
      <h2>Adventures:</h2>
      {trips.map((eachRide, index) => {
        return (
          <div className="experience-content" key={index}>
            <h3>{eachRide.name}</h3>
            <p>{eachRide.city}, {eachRide.country}</p>
            <h5>{eachRide.ridingType}</h5>
            <p>{eachRide.Description}</p>
          </div>
          )
      })}
    </div>
  )
}
 
export default Adventures;