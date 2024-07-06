from sqlalchemy import Column, Integer, String
from .db.db import Base


class Vacancy(Base):
    __tablename__ = 'vacancies'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    vacancy_id = Column(String, unique=True, index=True)
    min_salary = Column(Integer)
    max_salary = Column(Integer)
    payment_category = Column(String)
    currency = Column(String)
    experience = Column(String)
    employer = Column(String)
    address = Column(String)
    area = Column(Integer)


class Resume(Base):
    __tablename__ = 'resumes'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    resume_id = Column(String, unique=True, index=True)
    area = Column(Integer)
    age = Column(Integer)
    experience = Column(String)
    address = Column(String)
