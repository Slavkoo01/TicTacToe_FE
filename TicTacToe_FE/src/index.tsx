import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'; 
import { ApolloProvider } from '@apollo/client';
import client from './utils/apolloClient';

const rootElement = document.getElementById('root')!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <ApolloProvider client={client}>
      <App />
  </ApolloProvider>
);
