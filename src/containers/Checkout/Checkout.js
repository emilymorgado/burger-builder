import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render () {
    let summary = <Redirect to='/' />
    if (this.props.ings) {
      const purchasedRedirect = this.props.purhcased ? <Redirect to="/" /> : null;
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ings}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler} />
          <Route
            path={this.props.match.path + '/contact-data'}
            component={ContactData} />
        </div>
      );
    }
    return summary;
  }
};
// Line 26 went from one, to the other, to redux
// {/* component={ContactData} /> changed to above so we can pass props to it*/}
// render={(props) => (<ContactData ingredients={this.props.ings} price={this.state.totalPrice} {...props} />)}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};

// connect(mapStateToProps)(Checkout)
// connect(mapStateToProps, mapDispatchToProps)(Checkout)
// connect(null, mapDispatchToProps)(Checkout)

export default connect(mapStateToProps)(Checkout);
