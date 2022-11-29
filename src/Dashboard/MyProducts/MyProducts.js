import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const MyProducts = () => {
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

    return (
        <div className="w-full">
            <h1>Hello {user?.displayName}!! Your available products are here:</h1>
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Products</th>
              <th>Resale Price</th>
              <th>Original Price</th>
              <th>Posted Date</th>
            </tr>
          </thead>
          <tbody>
            {
                myProducts.map(myProduct=><>
                 <tr>
              <th>1</th>
              <td>
              <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={myProduct.picture} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">{myProduct.name}</div>
              <div className="text-sm opacity-50">{myProduct.location}</div>
            </div>
          </div>
              </td>
              <td>{myProduct.resale_price} $</td>
              <td>{myProduct.original_price} $</td>
              <td>{myProduct.posted_date}</td>
            </tr></>
             

                )
            }
            
          </tbody>
        </table>
      </div>
    );
};

export default MyProducts;