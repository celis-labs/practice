import { useSelector } from "react-redux";

import { VacancyView } from "./views/VacancyView";
import { ResumeView } from "./views/ResumeView";

import { getCategoryStore } from "../entities/Category/model/reducers/getCategoryStore";

import { Category } from "../entities/Category/enums/category.enum.ts";

export const MainLayout = () => {
    const { category } = useSelector(getCategoryStore);

    if (category == Category.RESUMES) {
        return <ResumeView/>;
    }

    return <VacancyView/>;
}
