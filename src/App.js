import { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './Components/Login';
import Home from './Components/Home';
import { UserHook } from './Components/Context/userContext';

function App() {
  const {user, authentication} = UserHook();
  const routes = createBrowserRouter([
    { path:'/', element:user?<Home />:<Login/> },
    {path:'/login', element: <Login />},
  ])
  
  useEffect(() => {
    authentication();
  }, [])

  return (
    <div className="app">
      <RouterProvider router={routes} >
      </RouterProvider>
    </div>
  );
}

export default App;
