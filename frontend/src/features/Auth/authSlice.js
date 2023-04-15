import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'

// Get user from LocalStorage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    // if we recieved a user from local storage. Store its data to the object.
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// Register User
export const register = createAsyncThunk('auth/register', async(user, thunkAPI)=>{
    try{
        // authService.register comes from out function we pass in the user we get from input
        return await authService.register(user)
    }catch(error){
        // if we get an Erro from the Server. Ex if user exist or inserted wrong password.
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
        // we get an error we will pass it to:
        // .addCase(register.rejected state.message = action.payload
      return thunkAPI.rejectWithValue(message)

    }
})

// Login User
export const login = createAsyncThunk('auth/login', async(user, thunkAPI)=>{
    try{
        return await authService.login(user)
    }catch(error){
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
        return thunkAPI.rejectWithValue(message)

    }
})

export const logout = createAsyncThunk('auth/logout', 
    async() => {
    await authService.logout()
})

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        // After we have dispatched the state we want to reset the state to its initial state.
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        // This is Redux Tool Kit
        builder
        .addCase(register.pending, (state) => {
            state.isLoading = true
        })
        .addCase(register.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(register.rejected, (state, action)=>{
            state.isLoading = false
            state.isError = true
            // The message comes from thunkAPI.rejectWithValue(message)
            state.message = action.payload
            state.user = null
        })
        .addCase(login.pending, (state) => {
            state.isLoading = true
        })
        .addCase(login.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(login.rejected, (state, action)=>{
            state.isLoading = false
            state.isError = true
            // The message comes from thunkAPI.rejectWithValue(message)
            state.message = action.payload
            state.user = null
        })
        .addCase(logout.fulfilled, (state) =>{
            state.user = null;
        })
    },
})

export const {reset} = authSlice.actions;
export default authSlice.reducer;

