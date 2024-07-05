export interface IVacancyQuery {
    text: string;
    salary?: number;
    only_with_salary?: boolean;
    area?: number;
    experience?: string;
}