import { combineReducers } from 'redux';
import { LoginReducer, SignupReducer, authReducer } from './slices';
// import { CurrentUserReducer } from './currentUserData';

const rootReducer = combineReducers({
  // createPost: CreatePostReducer,
  // notification: NotificationReducer,
  logIn: LoginReducer,
  signUp: SignupReducer,
  // editPopup:EditPopUpReducer,
  // currentUser: CurrentUserReducer,
  auth: authReducer,
});

export default rootReducer;