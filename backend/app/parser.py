import requests
from bs4 import BeautifulSoup
import re
import urllib.parse

BASE_URL = "https://hh.ru/search/vacancy"
BASE_RESUME_URL = "https://hh.ru/search/resume"

headers = {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,"
              "application/signed-exchange;v=b3;q=0.7",
    "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
    "cache-control": "no-cache",
    "cookie": "__zzatgib-w-hh=MDA0dC0jViV+FmELHw4/aQsbSl1pCENQGC9LXzBcPWkeZntbIERcCwktGUY1JiwIOxNhQ0ZvfFpxIyVlOVURCxIXRF5cVWl1FRpLSiVueCplJS0xViR8SylEXE4KJx0VenAmVg4TVy8NPjteLW8PKhMjZHYhP04hC00+KlwVNk0mbjN3RhsJHlksfEspNVZSCSZLGjFzJQoPDRlBdip3LT1lIGV8XCBJXlV8Jh0Xfm4kDAoPYT4zaWVpcC9gIBIlEU1HGEVkW0I2KBVLcU8cenZffSpCZiZhS10iSFhUCCwVe0M8YwxxFU11cjgzGxBhDyMOGFgJDA0yaFF7CT4VHThHKHIzd2UqP24fZUxcJUlHSWtlTlNCLGYbcRVNCA00PVpyIg9bOSVYCBI/CyYgEghtJ1MKEF5ESHVvG382XRw5YxEOIRdGWF17TEA=Ce0Z6w==; __ddg1_=IXJ9KBeg9qTERZigN2Ww; hhuid=KCAcgIxDKtRanGaFiu4l5Q--; iap.uid=f508133880e0442a89f17a68adc392de; tmr_lvid=1a891eb2b8864564b9ae132b8b4a2cce; tmr_lvidTS=1714247651572; _ym_uid=1714247652399677613; _ym_d=1720027889; _xsrf=5a77bb523bea8afebbcd2dcdadbf836c; hhrole=anonymous; hhtoken=kvxssnUnWhg8b2vqjEyiR1iO0pMk; crypted_hhuid=93073B82EA83974C569A02E3D2AB4DC80AEE2905612D956FB7BBAFD51E64C9BD; redirect_host=hh.ru; region_clarified=hh.ru; display=desktop; GMT=3; domain_sid=wVSKThI91UD7tReFWjOvQ^3A1720106643281; _ym_isad=1; _ym_visorc=w; regions=1^|2019^|2061; total_searches=4; device_magritte_breakpoint=xs; device_breakpoint=xs; tmr_detect=0^7C1720133240408; gsscgib-w-hh=xkWg6VZTPPpoCW6wn6IyB55MHZFl/iIo71TLQVsK0RJZMwqe9XCITyy/EC224Y3zOfzEMn1qu4KXKb76cRSsKven9wK+U8qpi1POAdGKMCu07pZONTD3p7WZm1hvTpEbFngUig1a9foh5p8sqSvgvkYCusEn6iTMZep/I8RTwPn1GNFZe/bwF6OxKe+WSpa/YwJxsNgOjFxVoug/oyDcyZmHOjpbgw04yf6hUaOyRXrgKZnDOMvbL1QCdoSKO22Jzg==; cfidsgib-w-hh=Wk4/o9xQn/vbYCjvP8Z268uhCsC1uvhN81yzQC8S6IwqXcWNTyoFul7XVQN4AGgKpYnkZbGUQ62kUZFBLC1K5j788KbREpgnoLUSR5TzXDHbO1nXU35sUnuPzt4jp+Kbixt8Ft1bQE394iLXf/wNfuvmXcp8AwNB8FauIVo=; cfidsgib-w-hh=Wk4/o9xQn/vbYCjvP8Z268uhCsC1uvhN81yzQC8S6IwqXcWNTyoFul7XVQN4AGgKpYnkZbGUQ62kUZFBLC1K5j788KbREpgnoLUSR5TzXDHbO1nXU35sUnuPzt4jp+Kbixt8Ft1bQE394iLXf/wNfuvmXcp8AwNB8FauIVo=; gsscgib-w-hh=xkWg6VZTPPpoCW6wn6IyB55MHZFl/iIo71TLQVsK0RJZMwqe9XCITyy/EC224Y3zOfzEMn1qu4KXKb76cRSsKven9wK+U8qpi1POAdGKMCu07pZONTD3p7WZm1hvTpEbFngUig1a9foh5p8sqSvgvkYCusEn6iTMZep/I8RTwPn1GNFZe/bwF6OxKe+WSpa/YwJxsNgOjFxVoug/oyDcyZmHOjpbgw04yf6hUaOyRXrgKZnDOMvbL1QCdoSKO22Jzg==; fgsscgib-w-hh=hrEwbda47fe5f65185733e257cc4730caef9a4fc",
    "pragma": "no-cache",
    "priority": "u=0, i",
    "referer": "https://hh.ru/",
    "sec-ch-ua": '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
    "sec-ch-ua-mobile": "?1",
    "sec-ch-ua-platform": '"Android"',
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "same-origin",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
    "user-agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36"
}


def parse_salary(salary_text):
    salary_regex = re.compile(r'(\d[\d\s]*)\s*([–-])?\s*(\d[\d\s]*)?\s*([₽$€])')

    match = salary_regex.search(salary_text)
    if match:
        min_salary_str = match.group(1).replace(' ', '').replace('\u202f', '')
        max_salary_str = match.group(3).replace(' ', '').replace('\u202f', '') if match.group(3) else min_salary_str

        currency = match.group(4)

        min_salary = int(min_salary_str)
        max_salary = int(max_salary_str)

        if 'на руки' in salary_text:
            payment_category = 'на руки'
        elif 'до вычета налогов' in salary_text:
            payment_category = 'до вычета налогов'
        else:
            payment_category = ''

        return min_salary, max_salary, currency, payment_category

    return None, None, None, None


def extract_age(age_string):
    match = re.search(r'\d+', age_string)
    if match:
        return int(match.group())
    return None


async def parse_vacancies(params):
    query_params = {
        "ored_clusters": params.get("ored_clusters", True),
        "area": params.get("area", 1),
        "hhtmFrom": params.get("hhtmFrom", "vacancy_search_list"),
        "hhtmFromLabel": params.get("hhtmFromLabel", "vacancy_search_line"),
        "text": params.get("text", ""),
        "enable_snippets": params.get("enable_snippets", False),
        "salary": params.get("salary", 0),
        "only_with_salary": params.get("only_with_salary", True),
        "experience": params.get("experience", "")
    }

    search_field = params.get("search_field", ["name", "company_name", "description"])
    for i, field in enumerate(search_field):
        query_params[f"search_field[{i}]"] = field

    query_string = urllib.parse.urlencode(query_params)
    full_url = f"{BASE_URL}?{query_string}"

    response = requests.get(full_url, headers=headers)
    response.raise_for_status()

    html = response.text

    soup = BeautifulSoup(html, 'html.parser')
    data = soup.find_all('div', {'data-qa': lambda x: x and x.startswith('vacancy-serp__vacancy')})
    parsed_data = []

    for vacancy in data:
        try:
            link_element = vacancy.find('a', {'data-qa': 'vacancy-serp__vacancy_response'})
            href = link_element['href'] if link_element else None

            title_element = vacancy.find('span', {'data-qa': 'serp-item__title'}) if link_element else None
            title = title_element.text if title_element else ""

            vacancy_id = re.search(r'vacancyId=(\d+)', href).group(1) if href else None

            narrow_container = vacancy.find('div', {'class': lambda x: x and x.startswith('compensation-labels')})

            salary_element = narrow_container.find('span',
                                                   {'class': lambda x: x and x.startswith('compensation-text')})
            salary = salary_element.text if salary_element else None

            min_salary, max_salary, currency, payment_category = parse_salary(salary)

            experience_element = narrow_container.find('span',
                                                       {'data-qa': 'vacancy-serp__vacancy-work-experience'})

            experience = experience_element.text if experience_element else None

            info_section = vacancy.find('div', {'class': lambda x: x and x.startswith('info-section')})
            employer_element = info_section.find('a',
                                                 {
                                                     'data-qa': 'vacancy-serp__vacancy-employer'}) if info_section else None
            employer = employer_element.text if employer_element else None

            address_element = info_section.find('span', {
                'data-qa': 'vacancy-serp__vacancy-address_narrow'}) if info_section else None
            address = address_element.find('span').text if address_element else None

            parsed_data.append({
                'title': title,
                'vacancy_id': vacancy_id,
                'min_salary': min_salary,
                'max_salary': max_salary,
                'payment_category': payment_category,
                'currency': currency,
                'experience': experience,
                'employer': employer,
                'address': address,
                'area': query_params['area']
            })
        except:
            pass

    return parsed_data


async def parse_resumes(params):
    query_params = {
        "text": params.get("text", ""),
        "area": params.get("area", 1),
        "relocation": params.get("relocation", "living_or_relocation"),
        "gender": params.get("gender", "unknown"),
        "salary_from": params.get("salary_from", 0),
        "salary_to": params.get("salary_to", 0),
        "order_by": params.get("order_by", "relevance"),
        "search_period": params.get("search_period", 0),
        "logic": params.get("logic", "normal"),
        "pos": params.get("pos", "full_text"),
        "exp_period": params.get("exp_period", "all_time"),
        "hhtmFrom": params.get("hhtmFrom", "resume_search_catalog"),
        "hhtmFromLabel": params.get("hhtmFromLabel", "resume_search_line")
    }

    query_string = urllib.parse.urlencode(query_params)
    full_url = f"{BASE_RESUME_URL}?{query_string}"

    response = requests.get(full_url, headers=headers)
    response.raise_for_status()

    html = response.text

    soup = BeautifulSoup(html, 'html.parser')

    data = soup.find_all('main', {'data-qa': lambda x: x and x.startswith('resume-serp__results-search')})
    parsed_data = []

    print(len(data))

    for resume in data[0]:
        try:
            resume_element = resume.find('div', {'data-qa': 'resume-serp__resume'})

            link_element = resume_element.find('a', {'data-qa': 'serp-item__title'})
            href = link_element['href'] if link_element else None

            pattern = r'/resume/([a-zA-Z0-9]+)'

            match = re.search(pattern, href)
            resume_id = match.group(1) if match else None

            title = link_element.find('span').text if link_element else None

            age_element = resume_element.find('span', {'data-qa': 'resume-serp__resume-age'})
            age_text = age_element.find('span').text if age_element else None
            age = extract_age(age_text)

            experience_element = resume_element.find('div', {'data-qa': 'resume-serp__resume-excpirience-sum'})
            experience_texts = [span.text for span in experience_element.find_all('span')]

            experience = ' '.join(experience_texts)
            print(experience)

            # last_experience_container = resume_element.find('div', {'data-qa': 'resume-serp_resume-item-content'})
            # last_experience_element = last_experience_container.find('div')
            #
            # last_experience_place = last_experience_element.find('span', {'class': 'bloko-text bloko-text_strong'})
            # last_experience_link = last_experience_element.find('label', {'data-qa': 'last-experience-link'})

            parsed_data.append({
                'title': title,
                'resume_id': resume_id,
                'area': query_params['area'],
                'age': age,
                'experience': experience
            })
        except:
            pass

    return parsed_data
