import { createSlice } from "@reduxjs/toolkit";

import { ResumesStoreSchema } from "../types/resumesStoreSchema.ts";

const initialState: ResumesStoreSchema = {
    loading: false,
    resumes: [],
    query: '',
    only_with_salary: false,
    salary_from: 0,
    salary_to: 0
};

export const resumesStore = createSlice({
    name: 'resumes',
    initialState,
    reducers: {
        setLoading: (action, state) => {
            action.loading = state.payload;
        },
        setResumes: (action, state) => {
            action.resumes = state.payload;
        },
        setQuery: (action, state) => {
            action.query = state.payload;
        },
        setArea: (action, state) => {
            action.area = state.payload;
        },
        setOnlyWithSalary: (action, state) => {
            action.only_with_salary = state.payload;
        },
        setSalaryFrom: (action, state) => {
            action.salary_from = state.payload;
        },
        setSalaryTo: (action, state) => {
            action.salary_to = state.payload;
        }
    }
});

export const {
    actions: resumesStoreActions,
    reducer: resumesStoreReducer
} = resumesStore;