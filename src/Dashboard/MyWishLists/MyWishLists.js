import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { FaCartPlus, FaCheckCircle } from "react-icons/fa";
import { AuthContext } from "../../contexts/AuthProvider";
import BookingModal from "../../Pages/Home/Categories/BookingModal/BookingModal";
import CategoryOptionDetails from "../../Pages/Home/Categories/CategoryOptionDetails";

const MyWishLists = () => {
  const { user } = useContext(AuthContext);
  const [bookingProduct, setBookingProduct] = useState(null);
  const { data: products = [], refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(
        `https://x-watch-factor-server.vercel.app/products`
      );
      const data = await res.json();
      return data;
    },
  });
  const { data: wishLists = [] } = useQuery({
    queryKey: ["products/wishlists", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `https://x-watch-factor-server.vercel.app/products/wishlists/${user?.email}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = await res.json();
      return data;
    },
  });
  console.log(products);
  console.log(wishLists);
  //   const result=products.filter(prod=>prod._id===(wishLists.map(w=>w.product_id)));
  let i, j, res;
  const result = [];

  for (i = 0; i < products.length; i++) {
    for (j = 0; j < wishLists.length; j++) {
      if (products[i]._id === wishLists[j].product_id) {
        res = products[i];
        result.push(res);
      }
    }
  }
  console.log(result);

  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {result.map((res) => (
          <div className="card bg-base-100 shadow-2xl w-72">
            <figure>
              <img src={res.picture} alt="product" className=" h-40" />
            </figure>
            <div className="card-body">
              <h2 className="font-bold">
                {" "}
                <u>Product Name:</u> {res.name}
              </h2>
              <p className="font-semi-bold">
                <u>Resale Price</u> : {res.resale_price} $
              </p>
              <p className="font-semi-bold">
                <u>Original Price</u> : {res.original_price} $
              </p>
              <p className="font-semi-bold">
                <u>Years of Use</u> : {res.years_of_use}
              </p>
              <p className="font-semi-bold">
                <u>Product Description</u> : {res.product_description}
              </p>
              <div className="flex">
                <p className="font-semi-bold flex">
                  <u>Sellers Name</u> : {res.sellers_name}{" "}
                </p>
                <FaCheckCircle className="bg-green-300 rounded"></FaCheckCircle>
              </div>
              <p className="font-semi-bold">
                <u>Sellers Email</u> : {res.sellers_email}
              </p>
              <p className="font-semi-bold">
                <u>Sellers Phone</u> : {res.sellers_phone}
              </p>
              <p className="font-semi-bold">
                <u>Location</u> : {res.location}
              </p>
              <p className="font-semi-bold">
                <u>Posted Date</u> : {res.posted_date}
              </p>
              <div>
                {
                  <div>
                    <label
                      onClick={() => setBookingProduct(res)}
                      htmlFor="booking-modal"
                      className="btn bg-orange-700 p-1 rounded w-full"
                    >
                      Book Now<FaCartPlus className="mx-3 w-8 h-8"></FaCartPlus>
                    </label>
                  </div>
                }
              </div>
            </div>
          </div>
        ))}
      </div>
      {bookingProduct && (
        <BookingModal
          bookingProduct={bookingProduct}
          setBookingProduct={setBookingProduct}
        ></BookingModal>
      )}
    </section>
  );
};

export default MyWishLists;
