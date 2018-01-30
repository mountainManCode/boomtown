const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");

const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");

const { makeExecutableSchema } = require("graphql-tools");

const config = require("./config");

const typeDefs = require("./api/schema");
const initResolvers = require("./api/resolvers");

const app = express();
config(app);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: initResolvers(app)
});

// const createLoaders = require("./api/loaders");

app.use("*", cors());
// Where we will send all of our GraphQL requests

app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));
// A route for accessing the GraphiQL tool

app.use(
  "/graphiql",
  graphiqlExpress({
    endpointURL: "/graphql"
  })
);
app.listen(app.get("PORT"), () =>
  console.log(
    `GraphQL is now running on http://localhost:${app.get("PORT")}/graphql`
  )
);
