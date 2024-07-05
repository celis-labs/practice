import { createSlice } from "@reduxjs/toolkit";

import { VacanciesStoreSchema } from "../types/vacanciesStoreSchema.ts";

const initialState: VacanciesStoreSchema = {
    loading: false,
    vacancies: [],
    query: '',
    only_with_salary: false,
    salary: 0
};

export const vacanciesStore = createSlice({
    name: 'vacancies',
    initialState,
    reducers: {
        setLoading: (action, state) => {
            action.loading = state.payload;
        },
        setVacancies: (action, state) => {
            action.vacancies = state.payload;
        },
        setQuery: (action, state) => {
            action.query = state.payload;
        },
        setExperience: (action, state) => {
            action.experience = state.payload;
        },
        setArea: (action, state) => {
            action.area = state.payload;
        },
        setOnlyWithSalary: (action, state) => {
            action.only_with_salary = state.payload;
        },
        setSalary: (action, state) => {
            action.salary = state.payload;
        }
    }
});

export const {
    actions: vacanciesStoreActions,
    reducer: vacanciesStoreReducer
} = vacanciesStore;