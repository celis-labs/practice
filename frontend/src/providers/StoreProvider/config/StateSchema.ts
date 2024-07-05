import { VacanciesStoreSchema } from "../../../entities/Vacancy/model/types/vacanciesStoreSchema.ts";
import { ResumesStoreSchema } from "../../../entities/Resume/model/types/resumesStoreSchema.ts";
import { CategoryStoreSchema } from "../../../entities/Category/model/types/categoryStoreSchema.ts";

export interface StateSchema {
    vacancies: VacanciesStoreSchema;
    resumes: ResumesStoreSchema;
    category: CategoryStoreSchema;
}
