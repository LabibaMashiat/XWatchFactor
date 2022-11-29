import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import ConfirmationModal from '../../Pages/Shared/ConfirmationModal/ConfirmationModal';

const MyProducts = () => {
    const closeModal = () => {
        setDeletingProduct(null);
      };
    const [deletingProduct, setDeletingProduct] = useState(null);
    const{user}=useContext(AuthContext)
    const { data: myProducts = [], refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
          const res = await fetch(
            `http://localhost:5000/products/${user?.email}`
          );
          const data = await res.json();
          return data;
        },
      });
    // console.log(myProducts);
    const handleDeleteProduct=myProduct=>{
        fetch(
            `http://localhost:5000/allproducts/${myProduct._id}`,
            {
              method: "DELETE",
              
            }
          )
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
              if (data.deletedCount > 0) {
                refetch();
                toast.success("Product deleted successfully");
              }
            });
    }

    return (
        <div>
            <div className="w-full">
            <h1>Hello {user?.displayName}!! Your available products are here:</h1>
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Products</th>
              <th>Resale Price</th>
              <th>Location</th>
              <th>Posted Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
                myProducts.map((myProduct,i)=>(
                 <tr key={myProduct._id}>
              <th>{i+1}</th>
              <td>
              <div className="flex flex-col items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={myProduct.picture} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">{myProduct.name}</div>
              <div className="text-sm opacity-50">{myProduct.original_price} $</div>
            </div>
          </div>
              </td>
              <td>{myProduct.resale_price} $</td>
              <td>{myProduct.location}</td>
              <td>{myProduct.posted_date}</td>
              <td>
                  <label
                    onClick={() => setDeletingProduct(myProduct)}
                    htmlFor="confirmation-modal"
                    className="btn bg-orange-400 btn-sm btn-error"
                  >
                    Delete
                  </label>
                </td>
            </tr>
                )
              )
            };
            
          </tbody>
        </table>
      </div>
      {deletingProduct && (
        <ConfirmationModal
          title={`Are you sure you want to delete?`}
          successAction={handleDeleteProduct}
          successButtonName="Delete"
          modalData={deletingProduct}
          closeModal={closeModal}
        ></ConfirmationModal>
      )}
        </div>
    );
};

export default MyProducts;