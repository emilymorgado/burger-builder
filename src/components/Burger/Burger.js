import React from 'react';
// import { withRouter } from 'react-router-dom'; gives direct access to match, history, location
// so you don't have to manually pass it on from the top-level component
// make sure to wrap the export: withRouter(burger)

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

// .reduce() flattens the array of arrays, so we can check if empty
const burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map(ingredKey => {
      return [...Array(props.ingredients[ingredKey])].map((_, i) => {
        return <BurgerIngredient key={ingredKey + i} type={ingredKey} />
      });
    })
    .reduce((arr, elem) => {
      return arr.concat(elem);
    }, []);

    if (transformedIngredients.length === 0) {
      // user message to add ingredients
      transformedIngredients = <p>Please start adding ingredients!</p>
    }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
