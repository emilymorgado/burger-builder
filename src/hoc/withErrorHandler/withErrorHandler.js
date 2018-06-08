import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

// This is an anonymous class (a class factory)
// It doesn't need a name because it is returned immediately
const withErrorHandler = ( WrappedComponent, axios ) => {
  return class extends Component {
    state = {
      error: null
    };

// Must return the req and res back to axios, so it can continue running
// res => res is the shortest syntax for returning the response
    // componentDidMount () {
    // This changed to componentWillMount because we want this to run before
    // the child components are rendered
    // This is ok because we aren't causing side effects
    componentWillMount () {
      axios.interceptors.request.use(req => {
        this.setState({error: null});
        return req;
      });
      axios.interceptors.response.use(res => res, error => {
        this.setState({error: error});
      });
    }

    errorConfirmedHandler = () => {
      this.setState({error: null})
    }

      render () {
        return (
          <Aux>
            <Modal
              show={this.state.error}
              modalClosed={this.errorConfirmedHandler} >
              {this.state.error ? this.state.error.message : null}
            </Modal>
            <WrappedComponent {...this.props} />
          </Aux>
        )
      }
  }
}

export default withErrorHandler;
