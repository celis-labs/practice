from pydantic import BaseModel


class VacancyBase(BaseModel):
    title: str
    vacancy_id: str
    min_salary: int
    max_salary: int
    payment_category: str
    currency: str
    experience: str
    employer: str
    address: str
    area: int


class VacancyCreate(VacancyBase):
    pass


class Vacancy(VacancyBase):
    id: int

    class Config:
        orm_mode: True


class ResumeBase(BaseModel):
    title: str
    resume_id: str
    area: int
    age: int
    experience: str


class ResumeCreate(ResumeBase):
    pass


class Resume(ResumeBase):
    id: int

    class Config:
        orm_mode: True
