
import { createSlice } from '@reduxjs/toolkit';

export const postSlice = createSlice({
    name: 'post',
    initialState: {
        credentials: {},
        deletedPostId: null
    },
    reducers: {

        // profile: (state, action) => {
        //     return {
        //         ...state,
        //         ...action.payload
        //     }
        // },
        deletePostById: (state, action) => {
            console.log("delete : ", action.payload);
            let postIndex = state.indexOf(action.payload)
            state.splice(postIndex, 1)
        },
        updatePostById: (state, action) => {
            console.log("edit : ", action.payload);
            const { _id, updatedPostData } = action.payload;
            const postToUpdate = state.find(post => post.id === _id);
            if (userToUpdate) {
                Object.assign(userToUpdate, updatedUserData);
            }
        }
    }

});

export const { deletePostById, updatePostById } = postSlice.actions;

export const postData = (state) => state.post;

export default postSlice.reducer;