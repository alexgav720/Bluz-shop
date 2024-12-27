import { configureStore } from "@reduxjs/toolkit";

import categoriesSlice from "./categories/categoriesSlice";
import productsSlice from "./Products/ProductsSlice";
import { apiSlice } from "./api/apiSlice";
import userSlice from "./user/userSlice";



export const store = configureStore({
    reducer: {
        categories: categoriesSlice.reducer,
        products: productsSlice.reducer,
        user: userSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})