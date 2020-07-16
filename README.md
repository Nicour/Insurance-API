# Nicolás Urman's asessment

This application allows to authenticate and then read clients and policies collections

#  Code style

  

This project use

  ![enter image description here](https://camo.githubusercontent.com/d0f65430681b67b7104f6130ada8c098ec5f66ba/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f636f64652532307374796c652d7374616e646172642d627269676874677265656e2e7376673f7374796c653d666c6174)

  

##  Installation

  

To run this API on your local machine, first of all you need to clone this repository.

Then run the following commands in the following order:

  

```bash

npm install

```

```bash

npm run start

```

  

##  Usage

  

This API runs on port 3000, so the base URL is http://localhost:3000/
You can run it on your browser or use some tool as Postman.

## API Endpoints

| HTTP Method | URL                         | Description                  |
| ----------- | --------------------------- | ---------------------------- |
| GET         | /policies                   |  Get all policies            |
| GET         | /clients                    | Get all clients              |


##  Functions


| Name             |  Description                                                  |
| ---------------- |-------------------------------------------------------------- |
| login            |  This function logs in with a "client_id" and a "client_secret". The response includes a token that is stored and used to authenticate the user and only deliver the required information if the token is still valid. Also, this function store the date when the token was created and the date when it will expire, to make easier there future validation.                                    |
| axiosForClients  | This function make a GET request to 'https://dare-nodejs-assessment.herokuapp.com/api/clients' and returns the list of clients|
| getClients       | This function check if the token is still valid. If its valid call to the **axiosForClients** function. If not, first calls the **login** function and then calls the **axiosForClients** function                           |
| axiosForPolicies | This function make a GET request to 'https://dare-nodejs-assessment.herokuapp.com/api/policies' and returns the list of clients|
| getPolicies      | This function check if the token is still valid. If its valid call to the **axiosForPolicies** function. If not, first calls the **login** function and then calls the **axiosForPolicies** function                          |

  

