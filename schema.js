const axios = require("axios");
const {
  GraphQLString,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList
} = require("graphql");

const HomeworldType = new GraphQLObjectType({
  name: "homeworld",
  description: "Planet instance",
  fields: () => ({
    name: {
      type: GraphQLString,
      resolve: planet => planet.data.name
    },
    climate: {
      type: GraphQLString,
      resolve: planet => planet.data.climate
    },
    gravity: {
      type: GraphQLString,
      resolve: planet => planet.data.gravity
    },
    population: {
      type: GraphQLString,
      resolve: planet => planet.data.population
    }
  })
});
const CharacterType = new GraphQLObjectType({
  name: "characters",
  description: "...",
  fields: () => ({
    name: {
      type: GraphQLString,
      resolve: character => character.data.name
    },
    birthYear: {
      type: GraphQLString,
      resolve: character => character.data.birth_year
    },
    gender: {
      type: GraphQLString,
      resolve: character => character.data.gender
    },
    homeworld: {
      type: HomeworldType,
      resolve: character => axios(character.data.homeworld)
    }
  })
});
const FilmType = new GraphQLObjectType({
  name: "Film",
  description: "...",
  fields: () => ({
    title: {
      type: GraphQLString,
      resolve: film => film.data.title
    },
    characters: {
      type: new GraphQLList(CharacterType),
      resolve: character =>
        Promise.all(character.data.characters.map(char => axios(char)))
    }
  })
});

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    description: "...",

    fields: () => ({
      film: {
        type: FilmType,
        args: {
          id: { type: GraphQLInt }
        },
        resolve: (root, args) =>
          axios
            .get(`https://swapi.co/api/films/${args.id}`)
            .then(response => response)
      }
    })
  })
});
