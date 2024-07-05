import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Spinner, Tab, Tabs } from "@nextui-org/react";

import { VacancyItem } from "../entities/Vacancy/ui/VacancyItem";

import { getVacanciesStore } from "../entities/Vacancy/model/reducers/getVacanciesStore";
import { vacanciesStoreActions } from "../entities/Vacancy/model/slices/vacanciesStore.ts";

import { search } from "../entities/Vacancy/api";

import { VacancySalary } from "../entities/Vacancy/ui/VacancySalary";
import { VacancyQuery } from "../entities/Vacancy/ui/VacancyQuery";
import { VacancyAreaSelector } from "../entities/Vacancy/ui/VacancyAreaSelector";
import { VacancyExperienceSelector } from "../entities/Vacancy/ui/VacancyExperienceSelector";

import cls from "./MainLayout.module.scss";

export const MainLayout = () => {
    const { vacancies, loading, query, area, experience, only_with_salary, salary } = useSelector(getVacanciesStore);

    const [isError, setError] = useState(false);

    const dispatch = useDispatch();

    const makeSearch = () => {
        dispatch(vacanciesStoreActions.setLoading(true));
        setError(false);

        let salaryValue = Number(salary);
        if (isNaN(salaryValue)) {
            salaryValue = 0;
        }

        search({
            text: query,
            area,
            experience,
            only_with_salary,
            salary: salaryValue
        })
            .then(res => {
                dispatch(vacanciesStoreActions.setVacancies(res.data));
                dispatch(vacanciesStoreActions.setLoading(false));
            })
            .catch(err => {
                console.error(err);

                setError(true);
                dispatch(vacanciesStoreActions.setLoading(false));
            })
    };

    useEffect(makeSearch, [query, area, experience, only_with_salary, salary]);

    const renderVacancies = () => (
        <>
            {
                loading
                    ?
                    <div className={ cls.Spinner }>
                        <Spinner color="white"/>
                    </div>
                    :
                    <div className="flex flex-col max-h w-full p-4 gap-2">
                        <span className="text-xl font-bold">Вакансий: { vacancies.length ?? 0 }</span>
                        {
                            vacancies.map((vacancy, index) => (
                                <VacancyItem key={ index } {...vacancy}/>
                            ))
                        }
                    </div>
            }
        </>
    );

    return (
        <div className={ cls.Container }>
            <div className={ cls.SettingsBox }>
                <div className={ cls.Settings }>
                    <div>
                        <Tabs
                            variant="solid"
                            radius="full"
                            classNames={{
                                tab: "rounded-full",
                                tabList: "bg-neutral-600",
                                panel: "hidden"
                            }}
                        >
                            <Tab>Вакансии</Tab>
                            <Tab>Соискатели</Tab>
                        </Tabs>
                    </div>
                    <VacancyQuery/>
                    <VacancyExperienceSelector/>
                    <VacancySalary/>
                    <VacancyAreaSelector/>
                </div>
            </div>

            <div className={ cls.Vacancies }>
                {
                    isError ? (
                        <div className={ cls.Error }>
                            <span>Произошла ошибка</span>
                            <button onClick={ makeSearch }>Попробовать еще раз</button>
                        </div>
                    ) : (
                        renderVacancies()
                    )
                }
            </div>
        </div>
    )
}