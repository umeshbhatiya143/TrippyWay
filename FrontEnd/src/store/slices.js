import { createSlice} from '@reduxjs/toolkit';

// Slice for managing the visibility state of login and signup modals
const modalVisibilitySlice = createSlice({
    name: 'modalVisibility',
    initialState: {
        login: false,
        signup: false,
    },
    reducers: {
        toggleLogin: (state) => {
            state.login = !state.login;
        },
        toggleSignup: (state) => {
            state.signup = !state.signup;
        },
    },
});

export const { toggleLogin, toggleSignup } = modalVisibilitySlice.actions;
export const modalVisibilityReducer = modalVisibilitySlice.reducer

// Slice for managing authentication status and user data
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        userData: null,
    },
    reducers: {
        loginUser: (state, action) => {
            state.isLoggedIn = true;
            state.userData = action.payload;  // Assuming payload contains user data
        },
        logoutUser: (state) => {
            state.isLoggedIn = false;
            state.userData = null;
        },
    },
});

export const { loginUser, logoutUser } = authSlice.actions;
export const authSliceReducer = authSlice.reducer
