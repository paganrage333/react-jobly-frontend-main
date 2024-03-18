# Jobly

Jobly is a mock app where users can view job postings and apply for open positions. The frontend was built with React and the backend was built with Node, Express, and PostgreSQL.

To see a live demo: 

Sign up on your own or use this demo account:

* Username: demouser
* Password: password   

---

Jobly is a React-based job app featuring account creation, profile editing, protected routes, and pretty nice styling!

## Technologies
* React.js
* Node Express.js
* PostgreSQL

## Features
* Profile editing
* Apply to jobs
* Account creation, login, logout -> uses authorization and authentication middleware to protect private routes
* Search Companies & Jobs: browse and search hiring companies and view the jobs posted by each company.

## Getting Started on the Server (backend)
* Clone the repository
* `cd server`
* `npm i`
* `createdb jobly`
* `createdb jobly_test`
* `psql jobly < data.sql`
* `npm start`
* `npm test` to run the tests

## Getting Started on the Client (frontend)
* `npm i`
* `npm run start`
* `npm run test` to run the tests

