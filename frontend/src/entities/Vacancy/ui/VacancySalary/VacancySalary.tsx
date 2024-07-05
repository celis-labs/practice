import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {Checkbox, Input} from "@nextui-org/react";

import { useDebounce } from "use-debounce";

import { getVacanciesStore } from "../../model/reducers/getVacanciesStore";
import { vacanciesStoreActions } from "../../model/slices/vacanciesStore.ts";

export const VacancySalary = () => {
    const dispatch = useDispatch();
    const { loading, only_with_salary } = useSelector(getVacanciesStore);

    const [typed, setTyped] = useState("");
    const [value] = useDebounce(typed, 1000);

    const onTyping = (e: FormEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget;

        setTyped(value);
    }

    const setOnlyWithSalary = (value: boolean) => dispatch(vacanciesStoreActions.setOnlyWithSalary(value));

    useEffect(() => {
        dispatch(vacanciesStoreActions.setSalary(value));
    }, [value]);

    return (
        <div className="flex flex-col gap-2">
            <span className="relative text-foreground-500">
                Уровень дохода
            </span>

            <Input
                disabled={loading}
                placeholder="З/п от"
                onChange={onTyping}
                value={typed}
            />
            <Checkbox
                isSelected={ only_with_salary }
                onValueChange={ setOnlyWithSalary }
            >Указан доход</Checkbox>
        </div>
    )
}