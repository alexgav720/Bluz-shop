// import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import { BASE_URL } from "../../utils/constants";

export const createUser = createAsyncThunk(
    'users/createUsers',
    async (payload, thunkAPI) => {
        try {
            const res = await axios.post(`${BASE_URL}/auth/local/register`, payload);
            // console.log(res.data)
            return res.data;
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const loginUser = createAsyncThunk(
    'users/loginUser',
    async (payload, thunkAPI) => {
        try {
            const res = await axios.post(`${BASE_URL}/auth/local`, payload);
            const login = await axios(`${BASE_URL}/users/me?populate=*`, {
                headers: {
                    Authorization: `Bearer ${res.data.jwt}`
                }
            })
            // console.log(login.data)
            return login.data;
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
        cart: [],
        formType: "signup",
        showForm: false,
    },
    reducers: {
        addItemToCart: (state, { payload }) => {
            let newCart = [...state.cart];
            const found = state.cart.find(({ id }) => id === payload.id)
            
            if (found) {
                newCart = newCart.map((item) => {
                    return item.id === payload.id
                    ? { ...item, quantity: payload.quantity || item.quantity + 1 }
                    : item
                });
            } else newCart.push({ ...payload, quantity: 1 });
            state.cart = newCart;
        },
        removeItemFromCart: (state, { payload }) => {
            state.cart = state.cart.filter(({id})=>id !== payload)
        },
        toggleForm: (state, { payload }) => {
            state.showForm = payload
        },
        toggleFormType: (state, { payload }) => {
            state.formType = payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createUser.fulfilled, (state, { payload }) => {
            state.currentUser = payload.user;
        });
        builder.addCase(loginUser.fulfilled, (state, { payload }) => {
            state.currentUser = payload;
        });
    },
});

export const { addItemToCart, removeItemFromCart, toggleForm, toggleFormType } = userSlice.actions

export default userSlice.reducer;