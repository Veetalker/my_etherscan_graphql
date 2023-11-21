const { ApolloServer } = require("apollo-server"); 
const { importSchema } = require("graphql-import");
const EtherDataSource = require("./datasource/ethDatasource");

// Import the GraphQL schema from the schema.graphql file
const typeDefs = importSchema("./schema.graphql");  

require("dotenv").config();

const resolvers = {
  Query: {
    etherBalanceByAddress: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.etherBalanceByAddress(),

    totalSupplyOfEther: (root, _args, { dataSources }) =>  
      dataSources.ethDataSource.totalSupplyOfEther(),

    latestEthereumPrice: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getLatestEthereumPrice(),

    blockConfirmationTime: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

// Create Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  
  // Create dataSources function that returns ethDataSource 
  dataSources: () => ({
    ethDataSource: new EtherDataSource(), 
  }),
});

// Set timeout to 0 to disable timeouts
server.timeout = 0;

// Start the server
server.listen("9000").then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
