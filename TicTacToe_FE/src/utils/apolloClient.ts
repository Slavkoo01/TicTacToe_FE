import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';


const httpLink = createHttpLink({
  uri: 'http://localhost:4000/TicTacToe',
});


const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('JWT'); 
  return {
    headers: {
      ...headers,
      'x-auth-token': token ? token : '', 
    },
  };
});


const client = new ApolloClient({
  link: authLink.concat(httpLink),  
  cache: new InMemoryCache(),
});

export default client;
