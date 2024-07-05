from sqlalchemy.orm import Session
from . import models, schemas


def create_vacancy(db: Session, vacancy: schemas.VacancyCreate):
    db_vacancy = models.Vacancy(**vacancy.dict())
    db.add(db_vacancy)
    db.commit()
    db.refresh(db_vacancy)
    return db_vacancy


def get_vacancy_by_id(db: Session, vacancy_id: str):
    return db.query(models.Vacancy).filter(models.Vacancy.vacancy_id == vacancy_id).first()


def get_vacancies(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Vacancy).offset(skip).limit(limit).all()


def create_resume(db: Session, resume: schemas.ResumeCreate):
    db_resume = models.Resume(**resume.dict())
    db.add(db_resume)
    db.commit()
    db.refresh(db_resume)
    return db_resume


def get_resume_by_id(db: Session, resume_id: str):
    return db.query(models.Resume).filter(models.Resume.resume_id == resume_id).first()


def get_resumes(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Resume).offset(skip).limit(limit).all()
