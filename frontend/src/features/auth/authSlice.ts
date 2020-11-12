import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFirebaseIdToken } from '../../util/firebaseFunctions';
import { User } from '../../interfaces/interfaces'

export const getNewFirebaseIdToken = createAsyncThunk(
  'auth/getNewFirebaseIdToken',
  async () => {
    try {
      let token = await getFirebaseIdToken();
      return token
    } catch (err) {
      console.log(err);
    }
  }
)

interface AuthState {
  currentUser: User | null;
  token: string | null | undefined; 
}


const initialState: AuthState = {currentUser: null, token: null}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        updateCurrentUser: (state, {payload}) => {
            state.currentUser = payload;
        }, 
        updateToken: (state, { payload }) => {
            state.token = payload; 
        }, 
        logoutUser: () =>( {currentUser: null, token: null})
    },
    extraReducers: builder => {
        builder.addCase(getNewFirebaseIdToken.fulfilled, (state, { payload }) => {
          state.token = payload;
        })
    }
})

export const { updateCurrentUser, updateToken, logoutUser } = authSlice.actions;
export default authSlice.reducer;