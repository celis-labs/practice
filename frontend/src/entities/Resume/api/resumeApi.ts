import axios from "axios";

import { IResumeQuery } from "./interfaces/resumeQuery.interface.ts";
import { IResume } from "./interfaces/resume.interface.ts";

import { IArea } from "./../../../shared/interfaces/area.interface.ts";
import { IExperience } from "./../../../shared/interfaces/experience.interface.ts";

const $api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/"
})

export const search = async (query: IResumeQuery) =>
    $api.get<IResume[]>('resumes', {
        params: {
            ...query
        }
    });

export const getAreas = async () =>
    $api.get<IArea[]>('areas');

export const getExperience = async () =>
    $api.get<IExperience[]>('experience');