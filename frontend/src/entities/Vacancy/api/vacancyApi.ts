import axios from "axios";

import { IVacancyQuery } from "./interfaces/vacancyQuery.interface.ts";
import { IVacancy } from "./interfaces/vacancy.interface.ts";
import { IArea } from "../../../shared/interfaces/area.interface.ts";
import { IExperience } from "../../../shared/interfaces/experience.interface.ts";

const $api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/"
})

export const search = async (query: IVacancyQuery) =>
    $api.get<IVacancy[]>('vacancies', {
        params: {
            ...query
        }
    });

export const getAreas = async () =>
    $api.get<IArea[]>('areas');

export const getExperience = async () =>
    $api.get<IExperience[]>('experience');