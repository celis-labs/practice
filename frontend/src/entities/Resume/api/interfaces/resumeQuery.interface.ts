export interface IResumeQuery {
    text: string;
    salary_from?: number;
    salary_to?: number;
    only_with_salary?: boolean;
    area?: number;
}