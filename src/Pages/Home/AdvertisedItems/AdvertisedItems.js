import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import BookingModal from "../Categories/BookingModal/BookingModal";
import CategoryOptionDetails from "../Categories/CategoryOptionDetails";

const AdvertisedItems = () => {
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
  const advertisedproducts = products.filter((pr) => pr.advertised);
  console.log(advertisedproducts);
  return (
    <section>
      <div>
        {advertisedproducts.length && (
          <h1 className="text-orange-700 text-center font-semi-bold text-4xl mt-5">
            Advertised Items
          </h1>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center">
          {advertisedproducts.map((advertisedProduct) => (
            <CategoryOptionDetails
              key={advertisedProduct._id}
              product={advertisedProduct}
              setBookingProduct={setBookingProduct}
            ></CategoryOptionDetails>
          ))}
        </div>
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

export default AdvertisedItems;
