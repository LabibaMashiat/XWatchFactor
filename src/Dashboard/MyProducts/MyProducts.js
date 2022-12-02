
import { useQuery } from '@tanstack/react-query';
import { isDisabled } from '@testing-library/user-event/dist/utils';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthProvider';
import Loading from '../../Loading/Loading';
import AdvertisedItems from '../../Pages/Home/AdvertisedItems/AdvertisedItems';
import ConfirmationModal from '../../Pages/Shared/ConfirmationModal/ConfirmationModal';

const MyProducts = () => {

    const closeModal = () => {
        setDeletingProduct(null);
      };
   
    //   const[addAdvertisedItems,setAddAdvertisedItems]=useState([]); 
    const [deletingProduct, setDeletingProduct] = useState(null);
    const{user}=useContext(AuthContext)
    const { data: myProducts = [], refetch } = useQuery({
        queryKey: ["products",user?.email],
        queryFn: async () => {
          const res = await fetch(
            `http://localhost:5000/products/${user?.email}`,{
              headers:{
                authorization:`bearer ${localStorage.getItem('accessToken')}`
              }
            }
          );
          const data = await res.json();
          return data;
        },
      });
    console.log(myProducts);
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
   
    const handleAdvertised=id=>{
        
        fetch(
          `http://localhost:5000/allProducts/${id}`,
          {
            method: "PUT",
           
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.modifiedCount > 0) {
              toast.success("Advertised Successfully");
              refetch();
            }
          });
    }

    return (
        <div>
            {/* <h1>
                advertsed items={addAdvertisedItems.length}
                {
                    console.log(addAdvertisedItems)
                }
            </h1> */}
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
                myProducts.reverse().map((myProduct,i)=>(
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
                <td>
                {
                    // advertisedButtonDisable?<button className="btn bg-gray-200 btn-sm btn-error" disabled>Advertised</button>:<button onClick={()=>handleAdvertised(myProduct._id)} className="btn bg-orange-400 btn-sm btn-error">Advertise</button>

                    !myProduct.advertised && <button onClick={()=>handleAdvertised(myProduct._id)} className="btn bg-orange-400 btn-sm btn-error">Advertise</button>
                 }
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