FROM python:3.7

WORKDIR /app/
COPY ./foodrest/requirements.txt /app/
RUN pip install --requirement /app/requirements.txt

COPY ./foodrest /app

CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000"]
