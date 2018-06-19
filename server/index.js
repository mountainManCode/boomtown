const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const config = require('./config');
const initLoaders = require('./api/loaders');
const initResolvers = require('./api/resolvers');
const typeDefs = require('./api/schema');

config(app);

// the config file is passed throught the app
const postgresResource = require('./api/resources/postgresResource');
const firebaseResource = require('./api/resources/firebaseResource')(app);

// postgresResource returns a promise so the start app gets called once the database is connected and postgresResource returns
postgresResource(app).then(postgresResource => start(postgresResource));

app.use('*', cors());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'public')));
}

const start = postgresResource => {
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers: initResolvers({
      postgresResource,
      firebaseResource
    })
  });

  // Where we will send all of our GraphQL requests
  app.use(
    '/graphql',
    bodyParser.json(),
    graphqlExpress({
      schema,
      context: {
        loaders: initLoaders({
          postgresResource,
          firebaseResource
        })
      }
    })
  );

  // A route for accessing the GraphiQL tool
  app.use(
    '/graphiql',
    graphiqlExpress({
      endpointURL: '/graphql'
    })
  );
  app.listen(app.get('PORT'), () => {
    console.log(app.get('PORT'));
    console.log(
      `GraphQL is now running on http://localhost:${app.get('PORT')}/graphql`
    );
  });
};
