import { createSlice } from '@reduxjs/toolkit'
import { Error } from '../../types/types'

interface UserState {
    currentUser: {
        _id: string
        username: string
        email: string
    } | null
    error: Array<Error> | string | null
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
        signInStart: (state) => {
            state.loading = true
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload // is the data from the backend
            state.loading = false
            state.error = null
        },
        signInFailure: (state, action) => {
            state.error = action.payload
            state.loading = false
        },

        // Update user
        updateUserStart: (state) => {
            state.loading = true
        },
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload
            state.loading = false
            state.error = null
        },
        updateUserFailure: (state, action) => {
            state.error = action.payload
            state.loading = false
        },

        // Delete user
        deleteUserStart: (state) => {
            state.loading = true
        },
        deleteUserSuccess: (state) => {
            state.currentUser = null
            state.loading = false
            state.error = null
        },
        deleteUserFailure: (state, action) => {
            state.error = action.payload
            state.loading = false
        },

        // Logout user
        LogutUserStart: (state) => {
            state.loading = true
        },
        LogutUserSuccess: (state) => {
            state.currentUser = null
            state.loading = false
            state.error = null
        },
        LogutUserFailure: (state, action) => {
            state.error = action.payload
            state.loading = false
        },
    },
})

export const {
    signInStart,
    signInSuccess,
    signInFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    LogutUserStart,
    LogutUserSuccess,
    LogutUserFailure,
} = userSlice.actions

export default userSlice.reducer
