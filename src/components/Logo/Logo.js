import React from 'react';

// We need to import the image to make webpack aware of
// our using it here
import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.css';

const logo = (props) => (
  <div className={classes.Logo}>
    <img src={burgerLogo} alt="MyBurger" />
  </div>
);

export default logo;


// This is a valid solution to making styles media sensitive
// <div className={classes.Logo} style={{height: props.height}}>
//   <img src={burgerLogo} alt="MyBurger" />
// </div>
