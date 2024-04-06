
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        credentials: {}
    },
    reducers: {
        login: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        },
        logout: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        },
        profile: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        }
    }

});

export const { login, logout, profile } = userSlice.actions;

export const userData = (state) => state.user;

export default userSlice.reducer;