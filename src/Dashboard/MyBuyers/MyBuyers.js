import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';

const MyBuyers = () => {
    const{user}=useContext(AuthContext);
    const { data: myBuyers = [], refetch } = useQuery({
        queryKey: ["allbookings",user?.email],
        queryFn: async () => {
          const res = await fetch(
            `http://localhost:5000/allbookings/${user?.email}`
          );
          const data = await res.json();
          return data;
        },
      });
    return (
        <div>
            <div className="overflow-x-auto">
  <table className="table w-full">
    <thead>
      <tr>
        <th></th>
        <th>Avatar</th>
        <th>Product Name</th>
        <th>Buyer Name</th>
        <th>Buyer Email</th>
        <th>Buyer Phone</th>
        <th>Buyer Location</th>
        <th></th>
      </tr>
    </thead>
    <tbody>

      {
        myBuyers.reverse().map((b,i)=><tr key={b._id}>
            <th>{i+1}</th>
              <td><div className="avatar">
  <div className="w-24 rounded-full">
    <img src={b.picture} alt=""/>
  </div>
</div></td>
              <td>{b.product_name}</td>
              <td>{b.buyers_name}</td>
              <td>{b.buyers_email}</td>
              <td>{b.buyers_phone}</td>
              <td>{b.buyers_location}</td>
              <td>
              {
                b.paid &&
                <button disabled className='bg-orange-300 p-2 rounded'>Paid</button>
              }
              </td>
              
            </tr>)
      }
    </tbody>
  </table>
</div>
        </div>
    );
};

export default MyBuyers;