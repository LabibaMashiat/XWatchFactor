import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const MyOrders = () => {
    const{user}=useContext(AuthContext);
    const { data: myOrders = [], refetch } = useQuery({
        queryKey: ["bookings",user?.email],
        queryFn: async () => {
          const res = await fetch(
            `http://localhost:5000/bookings/${user?.email}`,{
              headers:{
                authorization:`bearer ${localStorage.getItem('accessToken')}`
              }
            }
          );
          const data = await res.json();
          return data;
        },
      });
      console.log(myOrders);
    return (
        <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Avatar</th>
              <th>Product Name</th>
              <th>Resale Price</th>
              <th>Seller's Email</th>
              <th>Payment</th>
            
            </tr>
          </thead>
          <tbody>
            
          {
            myOrders.map((myOrder,i)=>(
                <tr key={myOrder._id}>
                <th>{i+1}</th>
                <td>
                <div className="avatar">
  <div className="w-24 rounded-full">
   <img src={myOrder.picture} alt="" />
  </div>
</div>
                </td>
                <td>{myOrder.product_name}</td>
                <td>{myOrder.resale_price}</td>
                <td>{myOrder.sellers_email}</td>
               {
                !myOrder.paid &&  <td><Link to={`/dashboard/payment/${myOrder._id}`}><button className='bg-orange-600 px-3 py-1 text-white rounded font-bold'>Pay</button></Link></td>
               }
               {
                myOrder.paid &&  <td><button disabled className='bg-gray-200 px-3 py-1 text-white rounded font-bold'>Paid</button></td>
               }
              </tr>
            ))
          }
          </tbody>
        </table>
      </div>
    );
};

export default MyOrders;