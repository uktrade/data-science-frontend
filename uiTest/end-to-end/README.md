## Setup

Pre-requisites:

Ensure you have [node](https://nodejs.org/en/download/) v8 installed then install dependencies:

`$ npm install`

## Coding standards

StandardJS will run as part of the build, ensure you run the command below before committing:

`$ npm run lint`

## Running the tests

### Environment variables

to run locally, ensure you have the following environment variables set:

```
export TEST_USER=
export TEST_PASSWORD=
export LOGIN_URL=
```

to run in browserstack, ensure you have the following environment variables set:

```
export BROWSERSTACK_USERNAME=
export BROWSERSTACK_ACCESS_KEY=
```

the above environment variable values can be found in confluence:

`https://uktrade.atlassian.net/wiki/spaces/DT/pages/727515737/End+to+end+testing+environment+variables`

after setting up the environment variables, run the following commands to execute the tests:

`$(data-science-frontend/uiTest/end-to-end) npm run test`
