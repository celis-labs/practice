import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Autocomplete, AutocompleteItem, Spinner } from "@nextui-org/react";

import { getAreas } from "../../api";
import { IArea } from "../../../../shared/interfaces/area.interface.ts";

import { getResumesStore } from "../../model/reducers/getResumesStore";
import { resumesStoreActions } from "../../model/slices/resumesStore.ts";

export const ResumeAreaSelector = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<IArea[]>([]);

    const dispatch = useDispatch();
    const { loading, area } = useSelector(getResumesStore);

    useEffect(() => {
        setLoading(true);

        getAreas()
            .then(result => {
                setData(result.data);
                setLoading(false);
            })
    }, []);

    const setSelected = (value: string) => dispatch(resumesStoreActions.setArea(value));

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