import { useQuery } from '@tanstack/react-query';
import React from 'react';

const AllBuyers = () => {
    const { data: allBuyers = [], refetch } = useQuery({
        queryKey: ["allBuyers"],
        queryFn: async () => {
          const res = await fetch(
            `http://localhost:5000/allBuyers`
          );
          const data = await res.json();
          return data;
        },
      });
    //   console.log(allBuyers)
    return (
        <div className="">
  <table className="table w-full">
    <thead>
      <tr>
        <th></th>
        <th>Buyer Name</th>
        <th>Buyer Phone</th>
        <th>Buyer Email</th>
        <th>Buyer Location</th>
      </tr>
    </thead>
    <tbody>

      {
        allBuyers.map((buyer,i)=><tr>
            <th>{i+1}</th>
            <td>{buyer.name}</td>
            <td>{buyer.phone}</td>
            <td>{buyer.email}</td>
            <td>{buyer.location}</td>
          </tr>)
      }

     
    </tbody>
  </table>
</div>
    );
};

export default AllBuyers;