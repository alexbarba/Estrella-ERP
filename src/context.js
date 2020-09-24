import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const apolloClient = new ApolloClient({
  uri: "https://apollo-server-estrella.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});

export const Context = ({ children }) => {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};
