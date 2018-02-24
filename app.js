const app = require("express")();
const graphqlHTTP = require("express-graphql");
const cors = require("cors");

const schema = require("./schema");

const { PORT = 3000 } = process.env;

app.use(cors());

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
