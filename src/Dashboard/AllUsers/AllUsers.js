import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmationModal from '../../Pages/Shared/ConfirmationModal/ConfirmationModal';

const AllUsers = () => {
    const[deletingUser,setDeletingUser]=useState(null);
    const closeModal = () => {
        setDeletingUser(null);
      };
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
      const handleDeleteUser=user=>{
        fetch(
            `http://localhost:5000/users/${user._id}`,
            {
              method: "DELETE",
              
            }
          )
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
              if (data.deletedCount > 0) {
                refetch();
                toast.success("User deleted successfully");
              }
            });
    }
    return (
       <div>
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
              <th></th>
            </tr>
          </thead>
          <tbody>
          
                {
                    users.map((user,i)=><tr key={user._id}>
                        <th>{i+1}</th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.location}</td>
                    <td>{user.status}</td>
                    <td>
                  <label
                    onClick={() => setDeletingUser(user)}
                    htmlFor="confirmation-modal"
                    className="btn bg-orange-400 btn-sm btn-error"
                  >
                    Delete
                  </label>
                </td>
                    </tr>)
                }
           
          </tbody>
        </table>
      </div>
       {deletingUser && (
        <ConfirmationModal
          title={`Are you sure you want to delete?`}
          successAction={handleDeleteUser}
          successButtonName="Delete"
          modalData={deletingUser}
          closeModal={closeModal}
        ></ConfirmationModal>
      )}
       </div>
    );
};

export default AllUsers;