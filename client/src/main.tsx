import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App';
import Dashboard from './components/Dashboard';
import SignupForm from './components/SignupForm';
import ResourceList from './components/ResourceList';
import MapView from './components/MapView';
import SearchBooks from './pages/SearchBooks'
import SavedBooks from './pages/SavedBooks'

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
          path: '/signup',
          element: <SignupForm />,
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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
