const app = require("express")();
const graphqlHTTP = require("express-graphql");

const schema = require("./schema");

const { PORT = 3000 } = process.env;

app.get("/", (req, res) => {
  res.json({ status: "OK", source: "development" });
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(PORT);
