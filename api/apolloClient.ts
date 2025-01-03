import { ApolloClient, InMemoryCache } from "@apollo/client"

const client = new ApolloClient({
  uri: `${process.env.EXPO_PUBLIC_API_URL}/graphql`,
  cache: new InMemoryCache(),
})

export default client
