import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Importing pages/components
import Main from './pages/Main/Main';
import Home from './pages/Main/Movie/Home/Home';
import View from './pages/Main/Movie/View/View';
import Login from './pages/Public/Login/Login';
import Register from './pages/Public/Register/Register';

// Importing context provider
import MovieContextProvider from './context/MovieContext';

// Optional: Image import (currently unused in the code)

// Setting up the router with routes and nested routes
const router = createBrowserRouter([
  {
    path: '/', // Login route
    element: <Login />,
  },
  {
    path: '/register', // Registration route
    element: <Register />,
  },
  {
    path: '/main', // Main layout route
    element: <Main />,
    children: [
      {
        path: '', // Home page (default nested route)
        element: <Home />,
      },
      {
        path: '/main/view/:movieId?', // Movie details page
        element: <View />,
      },
    ],
  },
]);

// Main App component
function App() {
  return (
    <div className="App">
      <MovieContextProvider>
        {/* RouterProvider wraps the entire routing setup */}
        <RouterProvider router={router} />
      </MovieContextProvider>
    </div>
  );
}

export default App;
