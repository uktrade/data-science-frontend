# Data Hub - Find Exporters Front-End



## Build Status

[![CircleCI](https://circleci.com/gh/uktrade/data-science-frontend/tree/develop.svg?style=svg)](https://circleci.com/gh/uktrade/data-science-frontend/tree/develop)

## Setup

Pre-requisites:

Ensure you install [node](https://nodejs.org/en/download/) v8+ 
And also [redis](https://redis.io/topics/quickstart)

Then run:

`$ npm install`

You will also need to have to create a `.env` file in the root of the project
with the below environment variables:

```
export LOG_LEVEL=debug
export SSO_BYPASS=true
export SESSION_SECRET=x
export SSO_DOMAIN=x
export SSO_CLIENT=x
export SSO_SECRET=x
export SSO_PATH_AUTH=x
export SSO_PATH_TOKEN=x
export SSO_PATH_INTROSPECT=x
export SSO_REDIRECT_URI=x
export BACKEND_URL=x
export BACKEND_KEY=""
export BACKEND_USER=x
export NODE_ENV=development
export DASHBOARD_POWERBI_USERNAME=x
export DASHBOARD_POWERBI_PASSWORD=x
export DASHBOARD_POWERBI_CLIENTID=x
export DASHBOARD_POWERBI_GROUPID=x
export DASHBOARD_POWERBI_REPORTID=x
export DASHBOARD_POWERBI_EMBEDURL=x
export DASHBOARD_GOOGLEDS_EMBEDURL=x
```

Notice that the only environment variables you need to modify are:

```
BACKEND_URL
BACKEND_KEY
BACKEND_USER
```

The above needs to be changed according to the backend environment you want to point to.

## Coding standards

[StandardJS](https://standardjs.com/) will run as part of the build, ensure you run the command below before committing:

`$ npm run lint`

## Running the tests

Tests are written in jest and can be executed by running the command below:

`$ npm run test:unit`

## Starting the application

Run the command below to start the application:

`$ npm run watch`

## Functional tests

### Setup

Pre-requisites:

Ensure you have [node](https://nodejs.org/en/download/) v8 installed then install dependencies:

`$ npm install`

You will also need to have DataScience FE application running against the mocking service.
When starting the app, ensure the `BACKEND_URL` in the `.env` file has the following value:

`export BACKEND_URL=https://dit-find-exporters.getsandbox.com:443`

### Coding standards

Eslint will run as part of the build, assure you run the command below before committing:

`$ npm run lint`

### Running the tests

Notice that before running the tests the application should be up and running.

By default cypress will run on electron headlessly, you can read more about it [here](https://docs.cypress.io/guides/core-concepts/launching-browsers.html#Electron-Browser)

Execute all the tests on `specs` in chrome browser:

`$ npm run test:functional -- --browser chrome`

### Running the tests manually in cypress interface

`$ npm run test:functional:watch`

### Running a specific spec

`$ npm run test:functional -- cypress/specs/company-filter-spec.js`
