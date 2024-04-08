
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        credentials: {},
        deletedUserId: null
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
        },
        deleteUserById: (state, action) => {
            console.log("hello : ", action.payload);
            let userIndex = state.indexOf(action.payload)
            state.splice(userIndex, 1)
        }
    }

});

export const { login, logout, profile, deleteUserById } = userSlice.actions;

export const userData = (state) => state.user;

export default userSlice.reducer;