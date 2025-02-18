import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTrailer } from "../tmdb";

export const fetchTrailer = createAsyncThunk(
    "trailer/fetchTrailer",
    async({ id, type }) => {
        try {
            const trailerResults = await getTrailer(id, type)
            return trailerResults
        } catch(err) {
            console.log("Error trailerResults", err);
            throw err;
        }
    }
)

const trailerSlice = createSlice({
    name: `trailer`,
    initialState : {
        trailer : [],
        status: "loading",
        error : null,
    },
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(fetchTrailer.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.trailer = action.payload;
        })
    }
})
export default trailerSlice.reducer