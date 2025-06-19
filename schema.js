// Destructure apollo-server-express instance to construct gql tenplate string
const { gql } = require('apollo-server-express');

// Construct the schema objects
const typeDefs = gql`
    type Country {
        id: ID!
        name: String!
        code: String!
        continent: String!
        languages: [String]
        cities: [City!]
    }

    type City {
        id: ID!
        name: String!
        population: Int
        country: Country!
    }
        
    type Query {
        countries(continent: String, language: String): [Country!]!
        country(code: String!): Country
        cities(countryCode: String): [City!]!
    }
    
    type Mutation {
        addCountry(name: String!, code: String!, continent: String!, languages: [String]): Country!
        addCity(name: String!, population: Int, countryCode: String!): City!
    }
`;

module.exports = typeDefs;