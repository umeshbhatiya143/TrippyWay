import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: "false",
    loggedIn: false,
    userData: null,
}

// login reducer
export const LoginSlice = createSlice({
    name: 'logIn',
    initialState,
    reducers: {
        setShowLogin: (state) => {
            state.value = state.value === "false" ? "true" : "false"
        },
    },
})

// Action creators are generated for each case reducer function
export const { setShowLogin } = LoginSlice.actions
export const LoginReducer = LoginSlice.reducer

// signUp reducer
export const SignupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
        setShowSignup: (state) => {
            state.value = state.value === "false" ? "true" : "false"
        },
    },
})

// Action creators are generated for each case reducer function
export const { setShowSignup } = SignupSlice.actions
export const SignupReducer = SignupSlice.reducer

// user auth
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state) => {
            state.loggedIn = true;
        },
        logout: (state) => {
            state.loggedIn = false;
        },
    },
});

export const { login, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;