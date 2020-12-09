import React from 'react';
import './Cards.css';
import CardItem from './CardItems';
import Training from './../../Assets/images/img-3-velodrom.jpg';

function Cards() {
  return (
    <div className='cards'>
      <h1>Checkout those tips to make your adventures, daily <br/> rides and hard training ever better!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src={Training}
              text='Find the right time and place to train'
              label='Training'
              path='/cycling'
            />
            <CardItem
              src='./../../Assets/images/img-9-nutrition.jpg'
              alt='nutrition'
              text='Do not get the munchies while riding! Here are our tips to nail sport nutrition!'
              label='Nutrition'
              path='/cycling'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='./../../Assets/images/img-7-mates.jpg'
              text='Where should your and your mates ride the next adventure?'
              label='Adventure'
              path='/cycling'
            />
            <CardItem
              src='./../../Assets/images/img-2-steep-pave.jpg'
              text='Tired of your routine local rides? Checkout these routes and spice up your rides!'
              label='Local map'
              path='/cycling'
            />
            <CardItem
              src='./../../Assets/images/img-8-exhaustion.jpg'
              text='Ride through the Morrocan Atlas mountain range and push your limits!'
              label='Journey'
              path='/sign-up'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
