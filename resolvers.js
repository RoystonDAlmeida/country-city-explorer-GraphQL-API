const Country = require('./models/Country');
const City = require('./models/City');

// Grouping of resolvers to the GrphQL type they correspond to
const resolvers = {
  Query: {
    // Define the resolvers for various queries with object type 'Query'

    countries: async (_, { continent, language }) => {
      let filter = {};
      if (continent) filter.continent = continent;
      if (language) filter.languages = language;
      return Country.find(filter);
    },
    country: async (_, { code }) => Country.findOne({ code }),
    cities: async (_, { countryCode }) => {
      if (countryCode) {
        const country = await Country.findOne({ code: countryCode });
        if (!country) return [];
        return City.find({ country: country._id });
      }
      return City.find();
    }
  },

  // Define field resolvers
  Country: {
    cities: (parent) => City.find({ country: parent._id })
  },
  City: {
    country: (parent) => Country.findById(parent.country)
  },

  // Define mutation resolvers on 'Mutation' type schema object
  Mutation: {
    addCountry: async (_, { name, code, continent, languages }) => {
      const country = new Country({ name, code, continent, languages });
      return country.save();
    },
    addCity: async (_, { name, population, countryCode }) => {
      const country = await Country.findOne({ code: countryCode });
      if (!country) throw new Error('Country not found');
      const city = new City({ name, population, country: country._id });
      return city.save();
    }
  }
};

module.exports = resolvers;
