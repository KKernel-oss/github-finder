import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';

import { REMOVE_ALERT, SET_ALERT } from '../types';

const AlertState = (props) => {
  const initialState = {
    alert: null,
  };

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  const setAlertFunc = (message, type) => {
    dispatch({ type: SET_ALERT, payload: { message: message, type: type } });
    setTimeout(() => {
      dispatch({ type: REMOVE_ALERT });
    }, 3000);
  };

  return (
    <AlertContext.Provider value={{ alert: state.alert, setAlertFunc }}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
