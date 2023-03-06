
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./components/Home";
import HomeRootView from "./components/HomeRootView";
import Login from "./components/Login";
import UsersView from "./components/UsersView";
const App = () => {
  //const user = useSelector((state) => state.user.username);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children:[
        {
          path:"/",
          element:<HomeRootView />
        },
        {
          path: "/users",
          element: <UsersView />,
        },

      ]
    },
    {
      path: "/login",
      element: <Login />,
    }
  ]);


  return <RouterProvider router={router}/>
};

export default App;
