# Frontend

## Запуск
1. Установите зависимости:
```bash
npm install
```
2.
   1. Запуск в Dev-mode:
   ```bash
   npm run dev
   ```
   2. Сборка проекта:
   ```bash
   npm run build
   npm run preview
   ```

# Backend

## Методы:
- [vacancies](#vacancies)
- [resumes](#resumes)
- [areas](#areas)
- [experience](#experience)

### vacancies
Получает список вакансий с фильтрацией
#### Параметры

| Параметр         | Тип параметра | Описание параметра                         |
|------------------|---------------|--------------------------------------------|
| area             | number        | ID региона в HH.ru                         |
| text             | string        | Query параметр                             |
| salary           | number        | Минимальная З/п                            |
| only_with_salary | boolean       | Показывать вакансии только с указанной З/п |
| experience       | string        | Опыт работы                                |

#### Результат

Возвращает объекты со следующими полями:
- `title`: заголовок вакансии
- `vacancy_id`: ID вакансии
- `min_salary`: Минимальная З/п
- `min_salary`: Максимальная З/п (если ее нет, то значение будет равно значению минимальной зарплаты)
- `payment_category`: Тип выплаты (до вычета налогов/на руки и т.д.)
- `currency`: Валюта в которой будет выплачиваться З/п
- `experience`: Опыт работы
- `employer`: Работадатель
- `address`: Адрес
- `area`: ID региона в HH.ru


### resumes
Получает список резюме с фильтрацией
#### Параметры

| Параметр    | Тип параметра | Описание параметра        |
|-------------|---------------|---------------------------|
| area        | number        | ID региона в HH.ru        |
| text        | string        | Query параметр            |
| relocation  | string        | Переезд                   |
| gender      | string        | Пол                       |
| salary_from | number        | Минимальное значение З/п  |
| salary_to   | number        | Максимальное значение З/п |

#### Результат

Возвращает объекты со следующими полями:
- `title`: заголовок резюме
- `resume_id`: ID резюме
- `area`: ID региона в HH.ru
- `age`: Возраст кандидата
- `experience`: Опыт работы

## Запуск
1. Создание venv:
   ```bash
   python -m venv .venv
   ```
2. Вход в окружение:
   ### Linux:
   ```bash
   source ./.venv/bin/activate
   ```
   ### Windows:
   ```bash
   .\.venv\Scripts\activate.bat
   ```
3. Установка зависимостей:
   ```bash
   pip install -r requirements.txt 
   ```
4. Замените данные для бд в .env и alembic.ini
5. Создайте миграцию:
   ```bash
   alembic revision --autogenerate -m ""
   alembic upgrade head   
   ```
6. Запустите API:
   ```bash
   uvicorn app.main:app --reload    
   ```