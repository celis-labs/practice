import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { Spinner } from "@nextui-org/react";

import { search } from "../../../entities/Resume/api";

import { CategoryTabs } from "../../../shared/ui/CategoryTabs";

import { getResumesStore } from "../../../entities/Resume/model/reducers/getResumesStore";
import { resumesStoreActions } from "../../../entities/Resume/model/slices/resumesStore.ts";

import { ResumeItem } from "../../../entities/Resume/ui/ResumeItem";
import { ResumeQuery } from "../../../entities/Resume/ui/ResumeQuery";
import { ResumeSalary } from "../../../entities/Resume/ui/ResumeSalary";
import { ResumeAreaSelector } from "../../../entities/Resume/ui/ResumeAreaSelector";

import cls from "../../MainLayout.module.scss";

export const ResumeView = () => {
    const { resumes, loading, query, area, salary_from, salary_to, only_with_salary } = useSelector(getResumesStore);

    const [isError, setError] = useState(false);

    const dispatch = useDispatch();

    const makeSearch = () => {
        dispatch(resumesStoreActions.setLoading(true));
        setError(false);

        let salaryFromValue = Number(salary_from);
        if (isNaN(salaryFromValue)) {
            salaryFromValue = 0;
        }

        let salaryToValue = Number(salary_to);
        if (isNaN(salaryToValue)) {
            salaryToValue = 0;
        }

        search({
            text: query,
            area,
            salary_from: salaryFromValue,
            salary_to: salaryToValue,
            only_with_salary
        })
            .then(res => {
                dispatch(resumesStoreActions.setResumes(res.data));
                dispatch(resumesStoreActions.setLoading(false));
            })
            .catch(err => {
                console.error(err);

                setError(true);
                dispatch(resumesStoreActions.setLoading(false));
            })
    };

    useEffect(makeSearch, [query, area, salary_from, salary_to, only_with_salary]);

    const renderResumes = () => (
        <>
            {
                loading
                    ?
                    <div className={ cls.Spinner }>
                        <Spinner color="white"/>
                    </div>
                    :
                    <div className="flex flex-col max-h w-full p-4 gap-2">
                        <span className="text-xl font-bold">Резюме: { resumes.length ?? 0 }</span>
                        {
                            resumes.map((resume, index) => (
                                <ResumeItem key={ index } {...resume}/>
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
                        <CategoryTabs/>
                    </div>
                    <ResumeQuery/>
                    <ResumeAreaSelector/>
                    <ResumeSalary/>
                </div>
            </div>

            <div className={ cls.Items }>
                {
                    isError ? (
                        <div className={ cls.Error }>
                            <span>Произошла ошибка</span>
                            <button onClick={ makeSearch }>Попробовать еще раз</button>
                        </div>
                    ) : (
                        renderResumes()
                    )
                }
            </div>
        </div>
    )
}