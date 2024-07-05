import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";

import { IResume } from "../../api/interfaces/resume.interface.ts";
import { formatAge } from "../../utils";

const HH_URL = "https://hh.ru/resume";

export const ResumeItem = (props: IResume) => {
    const {
        title,
        resume_id,
        address,
        age,
        experience
    } = props;

    const link = `${ HH_URL }/${ resume_id }`;

    return (
        <Card>
            <CardHeader>
                <a href={link}>
                    {title}
                </a>
            </CardHeader>

            <CardBody className="flex items-start justify-between gap-2">
                <span className="flex gap-2 items-center content-center">
                    <span>Возраст</span>
                    <span className="bg-gray-700 w-max p-1 rounded-xl">{formatAge(age)}</span>
                </span>
                <span className="flex gap-2 items-center content-center">
                    <span>Опыт работы</span>
                    <span className="bg-gray-700 w-max p-1 rounded-xl">{experience}</span>
                </span>
            </CardBody>

            <CardFooter className="flex items-start justify-between gap-2">
                <span>{address}</span>
            </CardFooter>
        </Card>
    )
}