FROM python:3.6

RUN pip install pipenv

COPY ./foodrest /app
WORKDIR /app/

RUN pipenv run pip install pip==18.0
RUN pipenv lock
RUN pipenv install --system --deploy

CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000"]
