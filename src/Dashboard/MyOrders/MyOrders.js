import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';

const MyOrders = () => {
    const{user}=useContext(AuthContext);
    const { data: myOrders = [], refetch } = useQuery({
        queryKey: ["bookings",user?.email],
        queryFn: async () => {
          const res = await fetch(
            `http://localhost:5000/bookings/${user?.email}`
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
              </tr>
            ))
          }
          </tbody>
        </table>
      </div>
    );
};

export default MyOrders;