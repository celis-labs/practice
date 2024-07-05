import { IVacancy } from "../../api/interfaces/vacancy.interface.ts";

export interface VacanciesStoreSchema {
    loading: boolean;
    query: string;
    experience?: string;
    area?: number;
    vacancies: IVacancy[];
    only_with_salary: boolean;
    salary: number;
}