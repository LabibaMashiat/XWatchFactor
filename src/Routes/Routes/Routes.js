import { createBrowserRouter } from "react-router-dom";
import AddAProduct from "../../Dashboard/AddAProduct/AddAProduct";
import AllBuyers from "../../Dashboard/AllBuyers/AllBuyers";
import AllSellers from "../../Dashboard/AllSellers/AllSellers";
import AllUsers from "../../Dashboard/AllUsers/AllUsers";
import MyBuyers from "../../Dashboard/MyBuyers/MyBuyers";
import MyOrders from "../../Dashboard/MyOrders/MyOrders";
import MyProducts from "../../Dashboard/MyProducts/MyProducts";
import MyWishLists from "../../Dashboard/MyWishLists/MyWishLists";
import Payment from "../../Dashboard/Payment/Payment";
import DashboardLayout from "../../layout/DashboardLayout";
import Main from "../../layout/Main";
import Blog from "../../Pages/Blog/Blog";
import CategoriesDetail from "../../Pages/Home/Categories/CategoriesDetail/CategoriesDetail";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import NotFoundPages from "../../Pages/NotFoundPages/NotFoundPages";
import Signup from "../../Pages/Signup/Signup";
import AdminRoute from "../AdminRoute/AdminRoute";
import BuyerRoute from "../BuyerRoute/BuyerRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import SellerRoute from "../SellerRoute/SellerRoute";


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
        element:<SellerRoute><AddAProduct></AddAProduct></SellerRoute>
       },
       {
        path:'/dashboard/myProducts',
        element:<SellerRoute><MyProducts></MyProducts></SellerRoute>,
        
       },
       {
        path:'/dashboard/myOrders',
        element:<BuyerRoute><MyOrders></MyOrders></BuyerRoute>,
        
       },
       {
        path:'/dashboard/myWishLists',
        element:<BuyerRoute><MyWishLists></MyWishLists></BuyerRoute>,
        
       },
       {
        path:'/dashboard/allUsers',
        element:<AdminRoute><AllUsers></AllUsers></AdminRoute>
        
       },
       {
        path:'/dashboard/allSellers',
        element:<AdminRoute><AllSellers></AllSellers></AdminRoute>
        
       },
       {
        path:'/dashboard/allBuyers',
        element:<AdminRoute><AllBuyers></AllBuyers></AdminRoute>
        
       },
       {
        path:'/dashboard/myBuyers',
        element:<SellerRoute><MyBuyers></MyBuyers></SellerRoute>
        
       },
       {
        path:'/dashboard/payment/:id',
        element:<Payment></Payment>,

      loader:({params}) =>fetch(`http://localhost:5000/bookings?/${params.id}`,{
        headers:{
                 authorization:`bearer ${localStorage.getItem('accessToken')}`
              }
      })
      },
      ]
    },
  ]);
  export default router;