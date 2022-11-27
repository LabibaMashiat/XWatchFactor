import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main";
import Blog from "../../Pages/Blog/Blog";
import CategoriesDetail from "../../Pages/Home/Categories/CategoriesDetail/CategoriesDetail";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import Signup from "../../Pages/Signup/Signup";


const router = createBrowserRouter([
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
  ]);
  export default router;