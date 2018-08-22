import React, {Component} from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

// We can see here that it is updating unneccesarily because of Modal
// We can change Modal to a Class component
// and test shouldComponentUpdate and WillUpdate
// This actually will end up improving performance
// OrderSummary should be a functional component
  // componentWillUpdate() {
  //   console.log('[OrderSummary] WillUpdate');
  // }

  render () {
    const ingredientSummary = Object.keys(this.props.ingredients)
      .map(ingredKey => {
        return <li key={ingredKey}>
            <span style={{textTransform: 'capitalize'}}>{ingredKey}</span>: {this.props.ingredients[ingredKey]}
          </li>
      });
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
        <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
      </Aux>
    )
  }
}

export default OrderSummary;
