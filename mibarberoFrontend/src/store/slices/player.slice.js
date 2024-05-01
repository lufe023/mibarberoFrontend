import { createSlice } from "@reduxjs/toolkit";

export const playerSlice = createSlice({
    name: "player",
    initialState: {
        userId: "",
        playingVideo: "",
        playingList: "",
        playingIndex: "null",
        userPlayLists: null,
    },
    reducers: {
        setPlayerData: (state, action) => {
            return {
                ...state,
                ...action.payload,
            };
        },

        updatePlayingIndex: (state, action) => {
            return {
                ...state,
                playingIndex: action.payload,
            };
        },

        updatePlayingList: (state, action) => {
            return {
                ...state,
                playingList: action.payload,
            };
        },
        updatePlayingVideo: (state, action) => {
            return {
                ...state,
                playingVideo: action.payload,
            };
        },

        updateUserPlaylists: (state, action) => {
            return {
                ...state,
                userPlayLists: action.payload,
            };
        },
        // Agrega otras acciones según sea necesario
    },
});

export const {
    setPlayerData,
    updatePlayingList,
    updatePlayingVideo,
    updateUserPlaylists,
    updatePlayingIndex,
} = playerSlice.actions;

export default playerSlice.reducer;
