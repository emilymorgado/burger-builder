import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
  // It makes more sense to retreive this data from the backend
  // See updated Firebase for list of ingredients
  state = {
    purchasing: false,
    loading: false,
    error: false,
  }

  //componentDidMount is a good place for fetching data
  //Keep in mind: parts that are dependent on this data, will break
  // So you need to add a check to them, ensuring
  componentDidMount () {
    console.log("BurgerBuilder.js", this.props)
    // axios.get('https://react-my-burger-9d66b.firebaseio.com/ingredients.json')
    //   .then(response => {
    //     this.setState({ingredients: response.data})
    //   })
    //   .catch(error => {
    //     this.setState({error: true});
    //   })
  }
  // This can also be handled via a reducer
  updatePurchaseState (ingredients) {
    const sum = Object.keys(ingredients)
      .map(ingredKey => {
        return ingredients[ingredKey];
    })
    .reduce((sum, elem) => {
      return sum + elem;
    }, 0);
    return sum > 0;
  }

// 'this' syntax doesn't work as expected when triggered through an event
// When triggered by an event, it doesn't refer to the Class
// add/remove ingredients funtions use arrow functions, which preserve
// 'this' scoping
// Thus, we change this to the arrow function below
  // purchaseHandler () {
  //   this.setState({purchasing: true});
  // }
  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  }

  render () {
    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchaseable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
            price={this.props.price} />
        </Aux>
      );
      orderSummary = <OrderSummary
        ingredients={this.props.ings}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        price={this.props.price} />
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        { burger }
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
    onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
  }
}

// The Modal component wraps the OrderSummary
// This means every time an ingredient changes in OrderSummary,
// OrderSummary will be re-rendered if it is showing
// This is an opportunity for a lifecycle hook
// See: OrderSummary.js

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
