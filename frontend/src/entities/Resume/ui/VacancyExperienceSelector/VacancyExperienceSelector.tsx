import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Radio, RadioGroup, Spinner } from "@nextui-org/react";

import { getExperience } from "../../api";
import { IExperience } from "../../api/interfaces/experience.interface.ts";

import { getVacanciesStore } from "../../model/reducers/getVacanciesStore";
import { vacanciesStoreActions } from "../../model/slices/vacanciesStore.ts";

export const VacancyExperienceSelector = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<IExperience[]>([]);

    const dispatch = useDispatch();
    const { loading, experience } = useSelector(getVacanciesStore);

    useEffect(() => {
        setLoading(true);

        getExperience()
            .then(result => {
                setData(result.data);
                setLoading(false);
            })
    }, []);

    const setSelected = (value: string) => dispatch(vacanciesStoreActions.setExperience(value));

    if (isLoading) {
        return <Spinner color="white"/>;
    }

    return (
        <RadioGroup
            label="Опыт работы"
            isDisabled={ loading }
            value={ experience }
            onValueChange={ setSelected }
        >
            {
                data.map(item =>
                    <Radio key={ item.value } value={ item.value }>{ item.title }</Radio>
                )
            }
        </RadioGroup>
    )
}