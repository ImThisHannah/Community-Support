// import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import store from './redux/store';
import client from './utils/apolloClient'; // Ensure this path is correct or create the file

import App from './App';
import Dashboard from './components/Dashboard';
import SignupForm from './components/SignupForm';
import ResourceList from './components/ResourceList';
import MapView from './components/MapView';
import VolunteerPage from './pages/VolunteerPage'; // Import the VolunteerPage component

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className="display-2">Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: '/volunteers',
        element: <VolunteerPage />
      },
      {
        path: '/signup',
        element: <SignupForm handleModalClose={() => {}} />,
      },
      {
        path: '/resources',
        element: <ResourceList />,
      },
      {
        path: '/requests',
        element: <h2>Requests Page (Coming Soon)</h2>, // Placeholder
      },
      {
        path: '/map',
        element: <MapView />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </Provider>
);
