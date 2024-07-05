import { configureStore } from "@reduxjs/toolkit";

import { StateSchema } from "./StateSchema";

import { vacanciesStoreReducer } from "../../../entities/Vacancy/model/slices/vacanciesStore.ts";

export function createReduxStore(initialState?: StateSchema) {
  return configureStore({
    reducer: {
      vacancies: vacanciesStoreReducer,
    },
    devTools: process.env.NODE_ENV === "development",
    preloadedState: initialState,
  });
}
