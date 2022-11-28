import { createBrowserRouter } from "react-router-dom";
import AddAProduct from "../../Dashboard/AddAProduct/AddAProduct";
import DashboardLayout from "../../layout/DashboardLayout";
import Main from "../../layout/Main";
import Blog from "../../Pages/Blog/Blog";
import CategoriesDetail from "../../Pages/Home/Categories/CategoriesDetail/CategoriesDetail";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import NotFoundPages from "../../Pages/NotFoundPages/NotFoundPages";
import Signup from "../../Pages/Signup/Signup";
import PrivateRoute from "../PrivateRoute/PrivateRoute";


const router = createBrowserRouter([
  {path:"/*",
  element:<NotFoundPages></NotFoundPages>

  },
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'/blog',
            element:<Blog></Blog>
        },
        {
            path:'/login',
            element:<Login></Login>
        },
        {
            path:'/signup',
            element:<Signup></Signup>
        },
        {
            path:'/categories/:id',
            element:<CategoriesDetail></CategoriesDetail>,
            loader: ({ params }) =>
          fetch(
            `http://localhost:5000/categories/${params.id}`
          ),
        },
      ]
    },
    {
      path:'/dashboard',
      element:<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
      children:[
       {
        path:'/dashboard/addProduct',
        element:<AddAProduct></AddAProduct>
       }
      ]
    },
  ]);
  export default router;