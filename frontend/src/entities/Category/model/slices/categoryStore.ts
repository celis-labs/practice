import { createSlice } from "@reduxjs/toolkit";

import { CategoryStoreSchema } from "../types/categoryStoreSchema.ts";

import { Category } from "../../enums/category.enum.ts";

const initialState: CategoryStoreSchema = {
    category: Category.VACANCIES
};

export const categoryStore = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setCategory: (action, state) => {
            action.category = state.payload;
        }
    }
});

export const {
    actions: categoryStoreActions,
    reducer: categoryStoreReducer
} = categoryStore;