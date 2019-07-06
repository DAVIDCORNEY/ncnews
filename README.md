# NorthCoders NC News API

A RESTful API built to serve data to a reddit style website DC News. The API is built using Express.js, Node.js, Knex.js and PostgreSQL.


## Getting Started  

Please follow the steps below to run the API on your machine.

### Prerequisites  

Check if you already have node.js by typing the following command in your terminal:
```
node –v
```

If node is not already installed, please follow instructions at [Node.js](https://nodejs.org/en/) (npm will be installed with Node).

Check if git is installed on your machine by typing the following command in your terminal:
```
git –version
```
If git is not installed, please follow instructions at [git](https://git-scm.com/downloads)

You will also need [PostgreSQL](https://www.postgresql.org/) 

### Installing  

To run this API you will need to clone it to your local machine and install all it dependencies.

Clone this GitHub repository into the folder you want to install it
```
git clone https://github.com/DAVIDCORNEY/ncnews.git
```
Make a file knexfile.js and copy the following code into it
```
const ENV = process.env.NODE_ENV || "development";
const { DB_URL } = process.env;

const baseConfig = {
  client: "pg",
  migrations: {
    directory: "./db/migrations"
  },
  seeds: {
    directory: "./db/seeds"
  }
};

const customConfigs = {
  production: {
    connection: `${DB_URL}?ssl=true`
  },
  development: {
    connection: {
      database: "ncnews"
    }
  },
test: {
    connection: {
      database: "ncnews_test"
    }
  }
};

module.exports = { ...baseConfig, ...customConfigs[ENV] };
```
Install all the dependencies
```
npm install
```
Start your database [PostgreSQL](https://www.postgresql.org/)

In the terminal run the following commands

Set up the database
```
npm run setup-dbs
```
Seed the development database
```
npm run seed
```
Run the server locally
```
npm run dev
```

The API can be accessed at localhost:9090

## API Endpoints

All the available endpoints on the API can be found by clicking [here](https://dc-news.herokuapp.com/api) 

## Running the tests  

All tests are available in the app.spec.js file inside the spec folder.

Testing was carried out with Mocha, Chai, Chai-sorted and Supertest

To run tests, type the following in the terminal
```
npm test
```
## Deployment  

The app has been deployed with [Heroku](https://www.heroku.com/)

## Built With  

- [Node.js](https://nodejs.org/en/) – JS runtime
- [Express.js](https://expressjs.com/) (v4.16.4) - Web application framework for Node.js 
- [PostgreSQL](https://www.postgresql.org/) - Relational database 
- [Knex.js](https://knexjs.org/) (v0.16.5) - SQL query builder used with Postgres 
- [node-postgres(pg)](https://node-postgres.com/) (v7.10.0) - node.js modules for interfacing with the PostgreSQL database 
- [nodemon](https://nodemon.io/) (v1.19.0)

## Authors  

David Corney

## Acknowledgments  

Thank you to all the tutors at Northcoders Manchester.







