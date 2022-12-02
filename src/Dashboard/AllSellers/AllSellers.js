import { useQuery } from "@tanstack/react-query";
import React from "react";

const AllSellers = () => {
  const { data: allSellers = [], refetch } = useQuery({
    queryKey: ["allSellers"],
    queryFn: async () => {
      const res = await fetch(
        `https://x-watch-factor-server.vercel.app/allSellers`
      );
      const data = await res.json();
      return data;
    },
  });
  //   console.log(allSellers)
  return (
    <div className="">
      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>Seller Name</th>
            <th>Seller Phone</th>
            <th>Seller Email</th>
            <th>Seller Location</th>
          </tr>
        </thead>
        <tbody>
          {allSellers.map((seller, i) => (
            <tr>
              <th>{i + 1}</th>
              <td>{seller.name}</td>
              <td>{seller.phone}</td>
              <td>{seller.email}</td>
              <td>{seller.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllSellers;
