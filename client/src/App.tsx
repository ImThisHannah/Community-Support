import './App.css';
import { Outlet } from 'react-router-dom';
import {

  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import ResourceList from './components/ResourceList';
import MapView from './components/MapView';
import SignupForm from './components/SignupForm';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="/login">L</a>
        <a className="nav-link" href="/dashboard">Dashboard</a>
        <a className="nav-link" href="/volunteer">Volunteer</a>
      </nav>
    </div>
      <Outlet />
      <div className="container mt-4">
        <div className="image-grid">
          <img src="images/Project_3_img_1.jpeg" alt="Image 1" />
          <img src="images/Project_3_img_4.jpg" alt="Image 2" />
          <img src="images/community.jpg" alt="Image 3" />
          {/* <img src="/images/image4.jpg" alt="Image 4" /> */}
          {/* <img src="/images/image5.jpg" alt="Image 5" /> */}
          {/* <img src="/images/image6.jpg" alt="Image 6" /> */}
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
