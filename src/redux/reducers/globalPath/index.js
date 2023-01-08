import { createSlice } from '@reduxjs/toolkit';



const initialState = {
   path:null
}

const PathSlice = createSlice({
    name: 'path',
    initialState,
    reducers: {
        handlePath(state, action) {
           state.path=action.payload.payload
        },
       

    }
});


export const PathAction = PathSlice.actions;

export default PathSlice;