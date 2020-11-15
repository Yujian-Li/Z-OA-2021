# Coding Assessment - Engineering Intern Program 2021 @ Zendesk

## Technology

Node.js, Express.js, Vue.js, BootstrapVue

(For testing, Jest, Nock, Supertest, and Vue Test Utils are used)

## Requirements

Node (https://nodejs.org/en/download/)

## Project setup

cd server

```
npm install
```

cd zoa2021

```
npm install
```

## Run

Please follow the order:

1. cd server

```
npm start
```

2. cd zoa2021

```
npm run serve
```

Go to the URL in terminal, usually it is http://localhost:8081/

## Usage Instruction

- Click page buttons on the top to navigate to different pages (25 tickets shown per page)
- Click ">" or "<" to go to the next or the previous one page.
- Click ">>" or "<<" to go to the last or the first page.
- Click ticket title (Subjct) to see ticket detail. Click "Ticket List" breadcrumb to go back to the page you were on.
- Pop-up window will show when error occurs.
- A notification will show after tickets update is finished (only if tickets were updating when user requested, which occasionally happens according to https://developer.zendesk.com/rest_api/docs/support/tickets#count-tickets)
