import * as React from 'react';
// import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Login from './pages/Public/Login/Login';
import Dashboard from './pages/Main/Dashboard/Dashboard';
import Main from './pages/Main/Main';
import Movie from './pages/Main/Movie/Movie';
import Lists from './pages/Main/Movie/Lists/Lists';
import Form from './pages/Main/Movie/Form/Form';
import Register from './pages/Public/Register/Register';
import CastNCrews from './pages/Main/Movie/CastNCrews/CastNCrews';
import Videos from './pages/Main/Movie/Videos/Videos'; 
import { AuthProvider } from './context/context';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: 'admin/login',
    element: <Login />
  },
  {
    path: 'admin/register',
    element: <Register />
  },
  {
    path: '/main',
    element: <Main />,
    children: [
      {
        path: '/main/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/main/movies',
        element: <Movie />,
        children: [
          {
            path: '/main/movies',
            element: <Lists />,
          },
          {
            path: '/main/movies/form/:movieId?',
            element: <Form />,
            children: [
              {
                path: '/main/movies/form/:movieId/CastNCrews',
                element: <CastNCrews />,
              },
              {
                path: '/main/movies/form/:movieId/videos',
                  element: <Videos />,
                
              },
              {
                path: '/main/movies/form/:movieId/Photos',
                element: (
                  <h1>Change this for photos CRUD functionality component.</h1>
                ),
              },
            ],
          },
        ],
      },
    ],
  },{
    path: '/home',
    // element: <Client/>,
    children: [
        {
          path: '',
          // element: <Home/>
        },
        {
          path: 'movie/:movieId',
          // element: <Movie/>
        }
    ]
  }
]);


function App() {
  return (
    <AuthProvider>
    <div className='App'>
      <RouterProvider router={router} />
    </div>
    </AuthProvider>
  );
}
export default App;