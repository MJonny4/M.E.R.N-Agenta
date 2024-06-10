import { Reducer, UnknownAction, combineReducers, configureStore } from '@reduxjs/toolkit'
import userSlice, { UserState } from './user/userSlice'
import { createTransform, persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const getTokenCookie = () => {
    return document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=')
        return parts[0] === 'token' ? decodeURIComponent(parts[1]) : r
    }, '')
}

const tokenTransform = createTransform(
    (inboundState, _key) => {
        return inboundState
    },
    (outboundState, _key) => {
        return {
            ...(outboundState as object),
            token: getTokenCookie(),
        }
    },
    { whitelist: ['user'] },
)

const rootReducer = combineReducers({
    user: userSlice,
})

const persistConfig = {
    key: 'root',
    storage,
    version: 1,
    transforms: [tokenTransform],
}

const persistedReducer = persistReducer<Partial<{ user: UserState | undefined }>, UnknownAction>(
    persistConfig,
    rootReducer as Reducer<Partial<{ user: UserState | undefined }>, UnknownAction>,
)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
