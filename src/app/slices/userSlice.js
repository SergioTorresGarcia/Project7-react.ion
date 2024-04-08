
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
            console.log("delete : ", action.payload);
            let userIndex = state.indexOf(action.payload)
            state.splice(userIndex, 1)
        },
        updateUserById: (state, action) => {
            console.log("edit : ", action.payload);
            const { id, updatedUserData } = action.payload;
            const userToUpdate = state.find(user => user.id === id);
            if (userToUpdate) {
                Object.assign(userToUpdate, updatedUserData);
            }
        }
    }

});

export const { login, logout, profile, deleteUserById, updateUserById } = userSlice.actions;

export const userData = (state) => state.user;

export default userSlice.reducer;