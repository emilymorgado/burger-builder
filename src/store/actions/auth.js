import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    }
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCI55r9dSmfl8LgNMb9hMfrl6YhD2pc9Fk';
    if (!isSignup) {
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCI55r9dSmfl8LgNMb9hMfrl6YhD2pc9Fk';
    }
    axios.post(url, authData)
      .then(response => {
        console.log('/actions/auth.js', response);
        dispatch(authSuccess(response.data));
      })
      .catch(err => {
        console.log('/actions/auth.js', err);
        dispatch(authFail(err));
      })
  };
};
