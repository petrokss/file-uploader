require('dotenv').config()
const express = require('express');
const logger = require('morgan');

const graphqlSchema = require('./graphql/schema');
const graphqlResolvers = require('./graphql/resolvers');

const { graphqlHTTP } = require('express-graphql');
const connectToDb = require('./mongo');

const run = async () => {
  const app = express();
  const db = await connectToDb();

  app.use(logger('dev'));

  app.use('/graphql', graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers(db),
    graphiql: true,
  }));

  const port = process.env.PORT || '3000';
  app.listen(port, () => console.log(`🚀 Server ready at http://localhost:${port}`));
};

run();