import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Checkbox, Input } from "@nextui-org/react";

import { useDebounce } from "use-debounce";

import { getResumesStore } from "../../model/reducers/getResumesStore";
import { resumesStoreActions } from "../../model/slices/resumesStore.ts";

export const ResumeSalary = () => {
    const dispatch = useDispatch();
    const { loading, only_with_salary } = useSelector(getResumesStore);

    const [fromTyped, setFromTyped] = useState("");
    const [fromValue] = useDebounce(fromTyped, 1000);

    const [toTyped, setToTyped] = useState("");
    const [toValue] = useDebounce(toTyped, 1000);

    const onFromTyping = (e: FormEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget;

        setFromTyped(value);
    }

    const onToTyping = (e: FormEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget;

        setToTyped(value);
    }

    const setOnlyWithSalary = (value: boolean) => dispatch(resumesStoreActions.setOnlyWithSalary(value));

    useEffect(() => {
        dispatch(resumesStoreActions.setSalaryFrom(fromValue));
        dispatch(resumesStoreActions.setSalaryTo(toValue));
    }, [fromValue, toValue]);

    return (
        <div className="flex flex-col gap-2">
            <span className="relative text-foreground-500">
                Уровень дохода
            </span>

            <div className="flex max-w-40 gap-2">
                <Input
                    disabled={ loading }
                    placeholder="От"
                    onChange={ onFromTyping }
                    value={ fromTyped }
                    type="number"
                />
                <Input
                    disabled={ loading }
                    placeholder="До"
                    onChange={ onToTyping }
                    value={ toTyped }
                    type="number"
                />
            </div>
            <Checkbox
                className="pt-4"
                isSelected={ only_with_salary }
                onValueChange={ setOnlyWithSalary }
            >
                Указан доход
            </Checkbox>
        </div>
    )
}