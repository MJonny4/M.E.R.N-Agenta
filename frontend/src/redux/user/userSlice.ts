import { createSlice } from '@reduxjs/toolkit'
import { Error } from '../../types/types'

interface UserState {
    currentUser: {
        _id: string
        username: string
        email: string
    } | null
    error: null | string | Array<Error>
    loading: boolean
}

const initialState: UserState = {
    currentUser: null,
    error: null,
    loading: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Login user
        loginStart: (state) => {
            state.loading = true
            state.error = null
        },
        loginSuccess: (state, action) => {
            state.currentUser = action.payload // is the data from the backend
            state.error = null
            state.loading = false
        },
        loginFailure: (state, action) => {
            state.error = action.payload
            state.loading = false
        },

        // Register user
        registerStart: (state) => {
            state.loading = true
            state.error = null
        },
        registerSuccess: (state) => {
            // state.currentUser = action.payload // register != login automatically
            state.error = null
            state.loading = false
        },
        registerFailure: (state, action) => {
            state.error = action.payload
            state.loading = false
        },

        // Logout user
        logoutStart: (state) => {
            state.loading = true
            state.error = null
        },
        logoutSuccess: (state) => {
            state.currentUser = null
            state.error = null
            state.loading = false
        },
        logoutFailure: (state, action) => {
            state.error = action.payload
            state.loading = false
        },

        // Clear error
        clearError: (state) => {
            state.error = null
        },
    },
})

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    registerStart,
    registerSuccess,
    registerFailure,
    logoutStart,
    logoutSuccess,
    logoutFailure,
    clearError,
} = userSlice.actions

export default userSlice.reducer
