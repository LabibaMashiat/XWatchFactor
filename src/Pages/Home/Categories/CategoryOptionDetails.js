import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { FaCartPlus,FaBookmark,FaCheckCircle } from 'react-icons/fa';
import { AuthContext } from '../../../contexts/AuthProvider';
import useBuyer from '../../../hooks/useBuyer';
import MainCategoryOptions from './MainCategoryOptions/MainCategoryOptions';

const CategoryOptionDetails = ({product,setBookingProduct}) => {

  const{user}=useContext(AuthContext);
  const[isBuyer]=useBuyer(user?.email);
  const{picture,name,location,resale_price,original_price,years_of_use,sellers_name,posted_date,sellers_email,sellers_phone,product_description,_id}=product
   const handleWishList=product=>{
   
    const wishlist={
      product_id: _id,
      email:user?.email, }

    fetch("http://localhost:5000/products/wishlists", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(wishlist),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        if(result.acknowledged){
        toast.success("Product successfully added to wishlist");
        
        }
      });
   }
   const { data: wishLists = []} = useQuery({
    queryKey: ["products/wishlists",user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/products/wishlists/${user?.email}`,{
            headers:{
                authorization:`bearer ${localStorage.getItem('accessToken')}`
              }
        }
      );
      const data = await res.json();
      return data;
    },
  });
  console.log(wishLists);
   
    return (
        <div className="card bg-base-100 shadow-2xl w-72">
        <figure><img src={picture} alt="product" className=' h-40'/></figure>
        <div className="card-body">
          <h2 className="font-bold"> <u>Product Name:</u> {name}</h2>
          <p className='font-semi-bold'><u>Resale Price</u> : {resale_price} $</p>
          <p className='font-semi-bold'><u>Original Price</u> : {original_price} $</p>
          <p className='font-semi-bold'><u>Years of Use</u> : {years_of_use}</p>
          <p className='font-semi-bold'><u>Product Description</u> : {product_description}</p>
          <div className='flex'>
          <p className='font-semi-bold flex'><u>Sellers Name</u> : {sellers_name} </p><FaCheckCircle className='bg-green-300 rounded'></FaCheckCircle>
          </div>
          <p className='font-semi-bold'><u>Sellers Email</u> : {sellers_email}</p>
          <p className='font-semi-bold'><u>Sellers Phone</u> : {sellers_phone}</p>
          <p className='font-semi-bold'><u>Location</u> : {location}</p>
          <p className='font-semi-bold'><u>Posted Date</u> : {posted_date}</p>
         <div>
        {
          isBuyer && 
         <div>
           <label onClick={()=>setBookingProduct(product)} htmlFor="booking-modal" className="btn bg-orange-700 p-1 rounded w-full">Book Now< FaCartPlus className='mx-3 w-8 h-8'></FaCartPlus></label>
           <button onClick={()=>handleWishList(product)} className="btn bg-violet-500 p-1 mt-3 rounded w-full">Add to WishList < FaBookmark className='mx-3 '></FaBookmark></button>
           </div>
 }
        
         </div>
        </div>
        
      </div>
    );
};

export default CategoryOptionDetails;