import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Input } from "@nextui-org/react";

import { useDebounce } from "use-debounce";

import { getVacanciesStore } from "../../model/reducers/getVacanciesStore";
import { vacanciesStoreActions } from "../../model/slices/vacanciesStore.ts";

export const VacancyQuery = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector(getVacanciesStore);

    const [typed, setTyped] = useState("");
    const [value] = useDebounce(typed, 1000);

    const onTyping = (e: FormEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget;

        setTyped(value);
    }

    useEffect(() => {
        dispatch(vacanciesStoreActions.setQuery(value));
    }, [value]);

    return (
        <Input
            disabled={ loading }
            placeholder="Поиск..."
            onChange={ onTyping }
            value={ typed }
        />
    )
}