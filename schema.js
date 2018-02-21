const axios = require("axios");
const {
  GraphQLString,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt
} = require("graphql");

const FilmType = new GraphQLObjectType({
  name: "Film",
  description: "...",
  fields: () => ({
    title: {
      type: GraphQLString,
      resolve: film => film.data.title
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
