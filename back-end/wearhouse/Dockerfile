FROM python:3.6.8

VOLUME /app
WORKDIR /app

COPY requirement.txt .
COPY . .

RUN pip install -r requirement.txt
RUN pip install uwsgi

CMD uwsgi \
    --wsgi-file wearhouse/wsgi.py \
    --http :8000
