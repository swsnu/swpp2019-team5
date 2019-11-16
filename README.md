# WearHouse [![Build Status](https://travis-ci.org/swsnu/swpp2019-team5.svg?branch=master)](https://travis-ci.org/swsnu/swpp2019-team5) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=swsnu_swpp2019-team5&metric=alert_status)](https://sonarcloud.io/dashboard?id=swsnu_swpp2019-team5) [![Coverage Status](https://coveralls.io/repos/github/swsnu/swpp2019-team5/badge.svg?branch=master)](https://coveralls.io/github/swsnu/swpp2019-team5?branch=master)

## Frontend

### Run
```
cd ./front-end/wearhouse
yarn install
yarn start
```

### Testing
```
npm test -- --coverage --watchAll=False
```

## Backend

### Run
Currently running through development sqlite database as there are no credits in our MySQL server
```
cd ./back-end/wearhouse
pip install -r requirements.txt
python3 manage.py runserver --settings=wearhouse.settings.development
```

### Testing
```
coverage run --branch --source='./item','./outfit','./tag','./user','./weather' --omit='manage.py','*/wsgi.py','*/__init__.py','backend/*','dataset/*' manage.py test --settings=wearhouse.settings.development
```
