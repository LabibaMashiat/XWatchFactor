import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaTrashAlt, FaUserLock, FaCrown } from "react-icons/fa";
import ConfirmationModal from "../../Pages/Shared/ConfirmationModal/ConfirmationModal";

const AllUsers = () => {
  const [verifyseller, setVerifySeller] = useState(false);
  const [deletingUser, setDeletingUser] = useState(null);
  const closeModal = () => {
    setDeletingUser(null);
  };
  const handleSellerVerify = (id) => {
    fetch(`https://x-watch-factor-server.vercel.app/verifiedSeller/${id}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          toast.success("Seller Verification Succesful");
          refetch();
        }
      });
  };
  const handleAdmin = (id) => {
    fetch(`https://x-watch-factor-server.vercel.app/users/admin/${id}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          toast.success("Make Admin Successful");
          refetch();
        }
      });
  };
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(`https://x-watch-factor-server.vercel.app/users`);
      const data = await res.json();
      return data;
    },
  });
  const handleDeleteUser = (user) => {
    fetch(`https://x-watch-factor-server.vercel.app/users/${user._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          refetch();
          toast.success("User deleted successfully");
        }
      });
  };
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table max-w-lg">
          <thead>
            <tr>
              <th></th>
              <th>User Name</th>
              <th>User Email</th>
              <th>User Phone</th>
              <th>User Location</th>
              <th>Status</th>
              <th>Delete User</th>
              <th>Verify Seller</th>
              <th>Make Admin</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={user._id}>
                <th>{i + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.location}</td>
                <td>{user.status}</td>
                <td>
                  <label
                    onClick={() => setDeletingUser(user)}
                    htmlFor="confirmation-modal"
                    // className="btn bg-orange-400 btn-sm btn-error"
                  >
                    <FaTrashAlt className="w-6 h-6"></FaTrashAlt>
                  </label>
                </td>
                <td>
                  {user.status === "Seller" && !user.seller_verified && (
                    <button onClick={() => handleSellerVerify(user._id)}>
                      <FaUserLock className="w-6 h-6"></FaUserLock>
                    </button>
                  )}
                </td>
                <td>
                  {user?.role !== "admin" && (
                    <button onClick={() => handleAdmin(user._id)}>
                      <FaCrown className="w-6 h-6"></FaCrown>
                    </button>
                  )}
                </td>
              </tr>
            ))}
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
