import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Autocomplete, AutocompleteItem, Spinner } from "@nextui-org/react";

import { getAreas } from "../../api";
import { IArea } from "../../api/interfaces/area.interface.ts";

import { getVacanciesStore } from "../../model/reducers/getVacanciesStore";
import { vacanciesStoreActions } from "../../model/slices/vacanciesStore.ts";

export const VacancyAreaSelector = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<IArea[]>([]);

    const dispatch = useDispatch();
    const { loading, area } = useSelector(getVacanciesStore);

    useEffect(() => {
        setLoading(true);

        getAreas()
            .then(result => {
                setData(result.data);
                setLoading(false);
            })
    }, []);

    const setSelected = (value: string) => dispatch(vacanciesStoreActions.setArea(value));

    if (isLoading) {
        return <Spinner color="white"/>;
    }

    return (
        <div className="flex flex-col gap-2">
            <span className="relative text-foreground-500">
                Регион
            </span>
            <Autocomplete
                label="Выберите регион"
                isDisabled={ loading }
                selectedKeys={ [area] }
                onSelectionChange={ setSelected }
                listboxProps={{
                    emptyContent: 'Не найдено.'
                }}
            >
                {
                    data.map(item =>
                        <AutocompleteItem key={ item.id }>{ item.title }</AutocompleteItem>
                    )
                }
            </Autocomplete>
        </div>
    )
}