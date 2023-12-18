import {
    createSlice,
    nanoid,
    createAsyncThunk,
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";
const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

const postAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date)
});

const initialState = postAdapter.getInitialState({
    status: "idle", // "idle" | "loading" | "succeeded" | "failed"
    error: null
});

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    try {
        const response = await axios.get(POSTS_URL);
        return response.data;
    } catch (error) {
        return error.message;
    }
});

export const addNewPost = createAsyncThunk("posts/addNewPost", async (initialPost) => {
    try {
        const response = await axios.post(POSTS_URL, initialPost);
        return response.data;
    } catch (error) {
        console.log(error.message);
    }
});

export const updatePost = createAsyncThunk("posts/updatePost", async (updatedPost) => {
    try {
        const response = await axios.put(`${POSTS_URL}/${updatedPost.id}`, updatedPost);
        return response.data;
    } catch (error) {
        console.log(error.message);
    }
});

export const deletePostById = createAsyncThunk("posts/deletePost", async (postId) => {
    try {
        const response = await axios.delete(`${POSTS_URL}/${postId}`);
        if (response?.status === 200) {
            return postId;
        }
    } catch (error) {
        console.log(error.message);
    }
});

export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.posts.push(action.payload);
            },
            prepare({ title, body, userId }) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        body,
                        userId,
                        date: new Date().toISOString(),
                        reactions: {
                            thumbsUp: 0,
                            hooray: 0,
                            heart: 0,
                            rocket: 0,
                            eyes: 0
                        }
                    }
                }
            }
        },
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload;
            const existingPost = state.entities[postId];
            if (existingPost) {
                existingPost.reactions[reaction]++;
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = "succeeded";
                let min = 1;
                const loadedPosts = action.payload.map(post => {
                    post.date = sub(new Date(), { minutes: min++ }).toISOString();
                    post.reactions = {
                        thumbsUp: 0,
                        hooray: 0,
                        heart: 0,
                        rocket: 0,
                        eyes: 0
                    }
                    return post;
                });
                postAdapter.upsertMany(state, loadedPosts);
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                console.log("Post added successfully")
                action.payload.userId = Number(action.payload.userId);
                action.payload.date = new Date().toISOString();
                action.payload.reactions = {
                    thumbsUp: 0,
                    hooray: 0,
                    heart: 0,
                    rocket: 0,
                    eyes: 0
                }
                postAdapter.addOne(state, action.payload);
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log("Update failed");
                    console.log(action.payload)
                    return;
                }
                action.payload.date = new Date().toISOString();
                postAdapter.upsertOne(state, action.payload);
            })
            .addCase(deletePostById.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log("Delete failed");
                    console.log(action.payload)
                    return;
                }
                const { postId } = action.payload;
                postAdapter.removeOne(state, postId);
            });
    }
})

// getSelectors creates these selectors and we rename them with aliases using ES6 destructuring
export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds
} = postAdapter.getSelectors(state => state.posts);

export const getPostStatus = (state) => state.posts.status;
export const getPostError = (state) => state.posts.error;

export const selectPostsByUserId = createSelector(
    [selectAllPosts, (state, userId) => userId],
    (posts, userId) => posts.filter(post => post.userId === Number(userId))
);

export const { postAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;