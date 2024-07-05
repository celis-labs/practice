import json
import aiofiles

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Set
from .database import get_db
from . import crud, schemas, parser
from .redis_client import redis
from .utils import get_usd_to_rub_rate

router = APIRouter()


@router.get('/resumes/')
async def get_resumes(
        text: str = Query(""),
        area: int = Query(1),
        relocation: str = Query("living"),
        gender: str = Query("unknown"),
        salary_from: int = Query(0),
        salary_to: int = Query(0),
        order_by: str = Query("relevance"),
        search_period: int = Query(0),
        logic: str = Query("normal"),
        pos: str = Query("full_text"),
        exp_period: str = Query("all_time"),
        hhtmFrom: str = Query("resume_search_catalog"),
        hhtmFromLabel: str = Query("resume_search_line"),
        skip: int = Query(0),
        limit: int = Query(10),
        db: Session = Depends(get_db)
):
    params = {
        "text": text,
        "area": area,
        "relocation": relocation,
        "gender": gender,
        "salary_from": salary_from,
        "salary_to": salary_to,
        "order_by": order_by,
        "search_period": search_period,
        "logic": logic,
        "pos": pos,
        "exp_period": exp_period,
        "hhtmFrom": hhtmFrom,
        "hhtmFromLabel": hhtmFromLabel
    }

    cache_key = f"hh_{text}_{area}_{relocation}_{gender}_{salary_from}_{salary_to}"

    cached_data = await redis.get(cache_key)
    if cached_data:
        return json.loads(cached_data)

    try:
        parsed_resumes = await parser.parse_resumes(params)

        seen_resumes_ids: Set[str] = set()
        parsed_unique_resumes = []

        for resume_data in parsed_resumes:
            try:
                resume_id = resume_data['resume_id']
                if resume_id not in seen_resumes_ids:
                    existing_resume = crud.get_resume_by_id(db, resume_id)

                    if not existing_resume:
                        crud.create_resume(db, schemas.ResumeCreate(**resume_data))

                    seen_resumes_ids.add(resume_id)
                    parsed_unique_resumes.append(resume_data)
            except Exception as e:
                print(f"Error processing resume_id {resume_data['resume_id']}: {e}")
                pass

        db_resumes = crud.get_resumes(db, skip=skip, limit=limit)

        filtered_resumes = []
        for resume in db_resumes:
            if resume.resume_id not in seen_resumes_ids:
                # if experience and vacancy.experience != experience:
                #     continue

                title_matched = False

                if text in resume.title.lower():
                    title_matched = True

                if not title_matched:
                    continue

                filtered_resumes.append(resume)

        filtered_db_resumes_schemas = [schemas.Resume(**v.__dict__) for v in filtered_resumes]

        all_resumes = parsed_unique_resumes + filtered_db_resumes_schemas

        await redis.set(cache_key, json.dumps(
            [resume if isinstance(resume, dict) else resume.dict() for resume in all_resumes]), ex=60)

        return parsed_resumes
    except:
        pass

    return None


@router.get("/vacancies/")
async def get_vacancies(
        ored_clusters: bool = Query(True),
        area: int = Query(1),
        hhtmFrom: str = Query("vacancy_search_list"),
        hhtmFromLabel: str = Query("vacancy_search_line"),
        search_field: List[str] = Query(["name", "company_name", "description"]),
        text: str = Query(""),
        enable_snippets: bool = Query(False),
        salary: int = Query(0),
        only_with_salary: bool = Query(True),
        experience: str = Query(""),
        skip: int = Query(0),
        limit: int = Query(10),
        db: Session = Depends(get_db)
):
    params = {
        "ored_clusters": ored_clusters,
        "area": area,
        "hhtmFrom": hhtmFrom,
        "hhtmFromLabel": hhtmFromLabel,
        "search_field": search_field,
        "text": text,
        "enable_snippets": enable_snippets,
        "salary": salary,
        "only_with_salary": only_with_salary,
        "experience": experience
    }

    cache_key = f"hh_{text}_{salary}_{area}_{experience}_{only_with_salary}"

    cached_data = await redis.get(cache_key)
    if cached_data:
        return json.loads(cached_data)

    try:
        parsed_vacancies = await parser.parse_vacancies(params)

        seen_vacancy_ids: Set[str] = set()
        parsed_unique_vacancies = []

        for vacancy_data in parsed_vacancies:
            try:
                vacancy_id = vacancy_data['vacancy_id']
                if vacancy_id not in seen_vacancy_ids:
                    existing_vacancy = crud.get_vacancy_by_id(db, vacancy_id)

                    if not existing_vacancy:
                        crud.create_vacancy(db, schemas.VacancyCreate(**vacancy_data))

                    seen_vacancy_ids.add(vacancy_id)
                    parsed_unique_vacancies.append(vacancy_data)
            except:
                pass

        db_vacancies = crud.get_vacancies(db, skip=skip, limit=limit)

        filtered_vacancies = []
        for vacancy in db_vacancies:
            if vacancy.vacancy_id not in seen_vacancy_ids:
                if 0 < salary and vacancy.min_salary > salary > vacancy.max_salary:
                    continue

                if experience and vacancy.experience != experience:
                    continue

                title_matched = False

                for field in search_field:
                    if field in vacancy.title.lower():
                        title_matched = True
                        break

                if not title_matched:
                    continue

                filtered_vacancies.append(vacancy)

        filtered_db_vacancies_schemas = [schemas.Vacancy(**v.__dict__) for v in filtered_vacancies]

        all_vacancies = parsed_unique_vacancies + filtered_db_vacancies_schemas

        await redis.set(cache_key, json.dumps(
            [vacancy if isinstance(vacancy, dict) else vacancy.dict() for vacancy in all_vacancies]), ex=60)

        return all_vacancies

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/areas/")
async def get_areas():
    try:
        async with aiofiles.open("areas.json", mode="r", encoding="utf-8") as file:
            areas = await file.read()
        return json.loads(areas)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/experience/")
async def get_experience():
    try:
        async with aiofiles.open("experience.json", mode="r", encoding="utf-8") as file:
            experience = await file.read()
        return json.loads(experience)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/convert/")
async def convert_usd_to_rub(amount: float = Query(..., gt=0)):
    try:
        rate = await get_usd_to_rub_rate()
        rub_amount = amount * rate

        return {"amount_usd": amount, "amount_rub": rub_amount, "rate": rate}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
