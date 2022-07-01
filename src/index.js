import express from 'express';
import router from './routers/app.routes.js';
import { graphqlHTTP } from 'express-graphql';
import resolvers from './graphql/resolvers.js';
import schema from './graphql/schema.js';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true,
}));

app.use('/api', router);

export default app;

