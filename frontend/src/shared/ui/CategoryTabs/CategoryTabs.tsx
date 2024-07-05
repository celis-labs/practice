import { useDispatch, useSelector } from "react-redux";

import { Tab, Tabs } from "@nextui-org/react";

import { getCategoryStore } from "../../../entities/Category/model/reducers/getCategoryStore";
import { categoryStoreActions } from "../../../entities/Category/model/slices/categoryStore.ts";

import { Category } from "../../../entities/Category/enums/category.enum.ts";

export const CategoryTabs = () => {
    const { category } = useSelector(getCategoryStore);

    const dispatch = useDispatch();

    const onSelectControlled = (value: Category): void => dispatch(categoryStoreActions.setCategory(value));

    return (
        <Tabs
            variant="solid"
            radius="full"
            classNames={{
                tab: "rounded-full",
                tabList: "bg-neutral-600",
                panel: "hidden"
            }}
            selectedKey={ category }
            onSelectionChange={ onSelectControlled }
        >
            <Tab key={ Category.VACANCIES }>Вакансии</Tab>
            <Tab key={ Category.RESUMES }>Соискатели</Tab>
        </Tabs>
    )
}