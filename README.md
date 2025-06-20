# Country City Explorer API

A GraphQL API for exploring and managing data about countries and their cities. This project allows you to query, filter, and mutate data about countries and their cities, supporting relationships and flexible queries via GraphQL.

## Table of Contents

- [Country City Explorer API](#country-city-explorer-api)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Prerequisites](#prerequisites)
  - [Setup and Installation](#setup-and-installation)
  - [Running the Application](#running-the-application)
  - [Testing with Apollo GraphQL Studio](#testing-with-apollo-graphql-studio)
  - [API Schema Overview](#api-schema-overview)
    - [Query Types](#query-types)
    - [Mutation Types](#mutation-types)
    - [Object Types](#object-types)
  - [Example Queries \& Mutations](#example-queries--mutations)
    - [Fetch all countries](#fetch-all-countries)
    - [Fetch countries by continent](#fetch-countries-by-continent)
    - [Fetch a specific country and its cities](#fetch-a-specific-country-and-its-cities)
    - [Fetch cities by country code](#fetch-cities-by-country-code)
    - [Add a new country](#add-a-new-country)
    - [Add a new city](#add-a-new-city)
  -[License](#license)

## Features

- Query for lists of countries and cities.
- Filter countries by continent or language.
- Fetch a specific country by its code.
- Fetch cities belonging to a specific country.
- Add new countries and cities to the database.
- Resolves relationships between countries and cities.

## Technologies Used

- **Node.js:** JavaScript runtime environment.
- **Express.js:** Web application framework for Node.js.
- **Apollo Server:** GraphQL server for Express.js.
- **GraphQL:** Query language for your API.
- **MongoDB:** NoSQL document database.
- **Mongoose:** ODM library for MongoDB and Node.js.
- **dotenv:** Module to load environment variables from a `.env` file.

## Prerequisites

- Node.js (v14.x or later recommended)
- npm (comes with Node.js) or yarn
- A running MongoDB instance (local or cloud-hosted like MongoDB Atlas)

## Setup and Installation

1.  **Clone the repository (if applicable):**
    ```bash
    git clone git@github.com:RoystonDAlmeida/country-city-explorer-GraphQL-API.git
    cd country-city-explorer-GraphQL-API/
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add your MongoDB connection URI:
    ```env
    MONGODB_CONNECTION_URI=your_mongodb_connection_string_here
    ```
    Replace `your_mongodb_connection_string_here` with your actual MongoDB connection string.

## Running the Application

1.  **Start the server:**
    ```bash
    npm start
    ```

2.  The server will start, and you should see a message like:
    `Server ready at http://localhost:4000/graphql`

    You can access the GraphQL Playground/IDE at `http://localhost:4000/graphql` in your browser to interact with the API.

## Testing with Apollo GraphQL Studio

You can also test your GraphQL queries and mutations using [Apollo GraphQL Studio](https://studio.apollographql.com/):

1. Go to [Apollo Studio Explorer](https://studio.apollographql.com/sandbox/explorer).
2. Enter your server endpoint: `http://localhost:4000/graphql`.
3. Write and run your queries or mutations in the Explorer interface.
4. You can use the example queries and mutations provided below or in the API documentation.

Apollo Studio provides a powerful interface for building, running, and debugging GraphQL operations, and is a great alternative to the built-in playground.

## API Schema Overview

### Query Types

- `countries(continent: String, language: String): [Country!]!`: Fetches a list of countries. Can be filtered by `continent` or `language`.
- `country(code: String!): Country`: Fetches a single country by its unique `code`.
- `cities(countryCode: String): [City!]!`: Fetches a list of cities. Can be filtered by `countryCode`.

### Mutation Types

- `addCountry(name: String!, code: String!, continent: String!, languages: [String]): Country!`: Adds a new country.
- `addCity(name: String!, population: Int, countryCode: String!): City!`: Adds a new city and associates it with a country via `countryCode`.

### Object Types

**`Country`**
```graphql
type Country {
    id: ID!
    name: String!
    code: String!
    continent: String!
    languages: [String]
    cities: [City!]
}
```

**`City`**
```graphql
type City {
    id: ID!
    name: String!
    population: Int
    country: Country!
}
```

## Example Queries & Mutations

### Fetch all countries
```graphql
query {
  countries {
    id
    name
    code
  }
}
```

### Fetch countries by continent
```graphql
query {
  countries(continent: "Asia") {
    name
    code
  }
}
```

### Fetch a specific country and its cities
```graphql
query {
  country(code: "US") {
    name
    continent
    cities {
      name
      population
    }
  }
}
```

### Fetch cities by country code
```graphql
query {
  cities(countryCode: "CA") {
    name
    population
  }
}
```

### Add a new country
```graphql
mutation {
  addCountry(name: "Japan", code: "JP", continent: "Asia", languages: ["Japanese", "English"]) {
    id
    name
    code
  }
}
```

### Add a new city
```graphql
mutation {
  addCity(name: "Tokyo", population: 100, countryCode: "JP") {
    id
    name
    country {
      name
    }
  }
}
```

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).