import { configureStore } from "@reduxjs/toolkit";

import { StateSchema } from "./StateSchema";

import { vacanciesStoreReducer } from "../../../entities/Vacancy/model/slices/vacanciesStore.ts";
import { resumesStoreReducer } from "../../../entities/Resume/model/slices/resumesStore.ts";
import { categoryStoreReducer } from "../../../entities/Category/model/slices/categoryStore.ts";

export function createReduxStore(initialState?: StateSchema) {
  return configureStore({
    reducer: {
      vacancies: vacanciesStoreReducer,
      resumes: resumesStoreReducer,
      category: categoryStoreReducer
    },
    devTools: process.env.NODE_ENV === "development",
    preloadedState: initialState,
  });
}
