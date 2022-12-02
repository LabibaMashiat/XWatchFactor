import { useQuery } from "@tanstack/react-query";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLoaderData } from "react-router-dom";
import CheckOutForm from "./CheckOutForm";
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
// console.log(stripePromise)
const Payment = () => {
  const booking = useLoaderData();
  const {
    _id,
    product_id,
    sellers_email,
    picture,
    product_name,
    resale_price,
  } = booking;

  return (
    <div>
      <h1 className="font-bold text-3xl text-center">
        Payment for <i className="text-orange-800 font-serif">X</i>WatchFactor
      </h1>
      <h2 className="mt-4 font-bold">
        You have recently booked : <br />
        <div className="avatar my-6">
          <div className="w-24 mask mask-squircle my-6">
            <img src={picture} alt="" />
          </div>
        </div>
        <span>{product_name}</span>
        <br />
        <u>Resale Price: {resale_price} $</u>
        <br />
        Please Confirm your Payment now!!
      </h2>
      <div className="w-96 my-12">
      <Elements stripe={stripePromise}>
   <CheckOutForm booking={booking}></CheckOutForm>
    </Elements>
      </div>
    </div>
  );
};

export default Payment;
