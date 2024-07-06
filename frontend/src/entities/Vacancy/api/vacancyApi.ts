import axios from "axios";

import { IVacancyQuery } from "./interfaces/vacancyQuery.interface.ts";
import { IVacancy } from "./interfaces/vacancy.interface.ts";
import { IArea } from "../../../shared/interfaces/area.interface.ts";
import { IExperience } from "../../../shared/interfaces/experience.interface.ts";

import { API_URL } from "../../../config.ts";

const $api = axios.create({
    baseURL: API_URL
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