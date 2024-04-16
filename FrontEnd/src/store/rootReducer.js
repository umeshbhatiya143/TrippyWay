import { combineReducers } from 'redux';
import {modalVisibilityReducer, authSliceReducer  } from './slices';

const rootReducer = combineReducers({
  modalVisibility: modalVisibilityReducer,
  auth: authSliceReducer,
});

export default rootReducer;