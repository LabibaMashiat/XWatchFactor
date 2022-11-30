import { useQuery } from '@tanstack/react-query';
import React from 'react';

const AllUsers = () => {
    const { data: users = [], refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
          const res = await fetch(
            `http://localhost:5000/users`
          );
          const data = await res.json();
          return data;
        },
      });
    return (
        <div className="">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>User Name</th>
              <th>User Email</th>
              <th>User Phone</th>
              <th>User Location</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
          
                {
                    users.map(user=><tr>
                        <th>1</th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.location}</td>
                    <td>{user.status}</td>
                    </tr>)
                }
           
          </tbody>
        </table>
      </div>
    );
};

export default AllUsers;