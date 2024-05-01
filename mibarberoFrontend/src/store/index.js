import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user.slice";
import playerSlice from "./slices/player.slice";
export default configureStore({
    reducer: {
        userSlice,
        playerSlice,
    },
});
