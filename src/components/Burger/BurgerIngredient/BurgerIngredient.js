import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './BurgerIngredient.css';

class BurgerIngredient extends Component {
  render () {
    let ingredient = null;

    switch (this.props.type) {
      case ('bread-bottom'):
        ingredient = <div className={classes.BreadBottom}></div>;
        break;
      case ('bread-top'):
        ingredient = (
          <div className={classes.BreadTop}>
            <div className={classes.Seeds1}></div>
            <div className={classes.Seeds2}></div>
          </div>
        );
        break;
      case ('meat'):
        ingredient = <div className={classes.Meat}></div>;
        break;
      case ('cheese'):
        ingredient = <div className={classes.Cheese}></div>;
        break;
      case ('salad'):
        ingredient = <div className={classes.Salad}></div>;
        break;
      case ('bacon'):
        ingredient = <div className={classes.Bacon}></div>;
        break;
      default:
        ingredient = null;
    }
    return ingredient;
  };
};

// This is the only validation in the project
// Reminder: this kind of validation requires
// the component to be stateful
// so only do this kind of validation when it really makes sense
BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired
}

export default BurgerIngredient;
