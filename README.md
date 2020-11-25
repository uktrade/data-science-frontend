# Data Hub - Find Exporters Front-End
I'm testing if the visual tests work with no codebase changes


## Build Status

[![CircleCI](https://circleci.com/gh/uktrade/data-science-frontend/tree/develop.svg?style=svg)](https://circleci.com/gh/uktrade/data-science-frontend/tree/develop)

## Setup

Pre-requisites:

Ensure you install [node](https://nodejs.org/en/download/) v10+ 
And also [redis](https://redis.io/topics/quickstart)

Then run:

`$ yarn`

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

`$ yarn lint`

## Running the tests

Tests are written in jest and can be executed by running the command below:

`$ yarn test:unit`

## Starting the application

Run the command below to start the application:

`$ yarn develop`

## Functional tests

### Setup

You will need to have DataScience FE application running against the mocking service.
When starting the app, ensure the `BACKEND_URL` in the `.env` file has the path of your local sandbox instance.

i.e `export BACKEND_URL=http://localhost:5555`

### Running the tests

Notice that before running the tests the application should be up and running.

By default cypress will run on electron headlessly, you can read more about it [here](https://docs.cypress.io/guides/core-concepts/launching-browsers.html#Electron-Browser)

Execute all the tests on `specs` in chrome browser:

`$ yarn test:functional -- --browser chrome`

### Running the tests manually in cypress interface

`$ yarn test:functional:watch`

### Running a specific spec

`$ yarn test:functional -- cypress/specs/company-filter-spec.js`

## End to End tests

### Setup

And ensure the following environment variables are set with the correct values:

```
export BACKEND_KEY=
export BACKEND_USER=
```

### Running the tests

to run in browserstack, ensure you have the following environment variables set:

```
export BROWSERSTACK_USERNAME=
export BROWSERSTACK_ACCESS_KEY=
```

the above required environment variable values can be found in confluence:

`https://uktrade.atlassian.net/wiki/spaces/DT/pages/727515737/End+to+end+testing+environment+variables`

after setting up the environment variables, run the following commands to execute the tests:

`$(data-science-frontend) npm run test:end-to-end`

## Visual Testing

The aim of this suite is taking screenshots from pages and comparing to baselines
to ensure consistency between builds.

### Folder structure

Screenshots will be stored in the root of the project. We commit the baselines and ignore the comparison diff images. If we need to update the baseline screenshot we need to delete the old baseline and rerun the test (it will then copy the new screenshot saved in comparison folder into the baseline folder)

```
- visual-screenshots
  - baseline
  - comparison
  - diff
```

### Browserstack environment variables

to run in browserstack, ensure you have the following environment variables set:

```
export BROWSERSTACK_USERNAME=xxx
export BROWSERSTACK_ACCESS_KEY=xxx
```
### Running the tests
After setting up the environment variables, run the following command to execute the tests:

`$ npm run test:visual`
