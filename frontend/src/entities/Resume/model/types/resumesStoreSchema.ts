import { IResume } from "../../api/interfaces/resume.interface.ts";

export interface ResumesStoreSchema {
    loading: boolean;
    query: string;
    area?: number;
    resumes: IResume[];
    only_with_salary: boolean;
    salary_from?: number;
    salary_to?: number;
}