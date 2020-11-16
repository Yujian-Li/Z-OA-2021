# Coding Assessment - TicketViewer

## Technology

Node.js, Express.js, Vue.js, BootstrapVue

(For testing, Jest, Nock, Supertest, and Vue Test Utils are used)

## Requirements

Node.js (https://nodejs.org/en/download/)

## Project setup
```
cd server

npm install
```
```
cd zoa2021

npm install
```

## To Run

Please follow the 3 steps:

1. Run server (port 8080 need to be free)
```
cd server

npm start
```

2. Run frontend
```
cd zoa2021

npm run serve
```

3. Go to the URL shown in terminal, usually it is http://localhost:8081/

## To run test

1. Stop server if it is running.

2. Frontend test:
```
cd zoa2021

npm test
```
3. Backend test:
```
cd server

npm test
```

## Usage Instruction

- Click page buttons on the top to navigate to different pages (25 tickets shown per page)
- Click ">" or "<" to go to the next or the previous one page.
- Click ">>" or "<<" to go to the last or the first page.
- Click ticket title (Subjct) to see ticket detail. Click "Ticket List" breadcrumb to go back to the page you were on.
- Pop-up window will show when error occurs.
- A notification will show after tickets update is finished (only if tickets were updating when user requested, which occasionally happens according to https://developer.zendesk.com/rest_api/docs/support/tickets#count-tickets)
