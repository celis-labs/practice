import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Input } from "@nextui-org/react";

import { useDebounce } from "use-debounce";

import { getResumesStore } from "../../model/reducers/getResumesStore";
import { resumesStoreActions } from "../../model/slices/resumesStore.ts";

export const ResumeQuery = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector(getResumesStore);

    const [typed, setTyped] = useState("");
    const [value] = useDebounce(typed, 1000);

    const onTyping = (e: FormEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget;

        setTyped(value);
    }

    useEffect(() => {
        dispatch(resumesStoreActions.setQuery(value));
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