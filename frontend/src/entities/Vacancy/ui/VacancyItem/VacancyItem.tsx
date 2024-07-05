import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";

import { IVacancy } from "../../api/interfaces/vacancy.interface.ts";
import { formatSalary } from "../../utils";

const HH_URL = "https://hh.ru/vacancy";

export const VacancyItem = (props: IVacancy) => {
    const {
        title,
        vacancy_id,
        min_salary,
        max_salary,
        currency,
        payment_category,
        experience,
        employer,
        address
    } = props;

    const link = `${ HH_URL }/${ vacancy_id }`;

    return (
        <Card>
            <CardHeader>
                <a href={link}>
                    {title}
                </a>
            </CardHeader>

            <CardBody className="flex items-start justify-between gap-1">
                <span>{formatSalary(min_salary, max_salary, currency, payment_category)}</span>
                <span className="bg-gray-700 w-max p-1 rounded-xl">{experience}</span>
            </CardBody>


            <CardFooter className="flex items-start justify-between gap-2">
                <span>{employer}</span>
                <span>{address}</span>
            </CardFooter>
        </Card>
    )
}