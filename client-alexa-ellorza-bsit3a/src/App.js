import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


import Main from './pages/Main/Main';
import Home from './pages/Main/Movie/Home/Home';
import View from './pages/Main/Movie/View/View';
import Login from './pages/Public/Login/Login';
import Register from './pages/Public/Register/Register';


import MovieContextProvider from './context/MovieContext';


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
        path: '', // Home page 
        element: <Home />,
      },
      {
        path: '/main/view/:movieId?', // Movie details page
        element: <View />,
      },
    ],
  },
]);


function App() {
  return (
    <div className="App">
      <MovieContextProvider>
       
        <RouterProvider router={router} />
      </MovieContextProvider>
    </div>
  );
}

export default App;
