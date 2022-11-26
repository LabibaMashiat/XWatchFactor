import React from "react";
import people1 from "../../../images/reviews/people1.jpg";
import people2 from "../../../images/reviews/people2.jpg";
import people3 from "../../../images/reviews/people3.jpg";

const Reviews = () => {
  const reviewDetails = [
    {
      _id: 1,
      name: "Alex Martin",
      image: people1,
      rev: "Last week bought a second hand watch from here.The product was so good and  behaviour of the seller was so friendly.Thanks to XWatchFactor for providing second hand watches to us who can not effort to buy expensive watches.Best of Luck!",
    },
    {
      _id: 2,
      name: "Helena Andrew",
      image: people3,
      rev: "As a student I can not buy expensive watch from shop at such a high rate.But one of my friends told about this website and I bought a watch from here few days back.Service was good ",
    },
    
    {
      _id: 3,
      name: "Moris Jonathan",
      image: people2,
      rev: "Recently I sold one of my watches to XWatchFactor.And surprisingly the watch was sold within one day.I was very much pleased with this site.Highly recommended and trusted website.",
    },
  ];
  return (

    <div>
        <h4 className="text-4xl font-semi-bold text-center my-16 text-orange-800"> User Reviews</h4>
        <div className="
    grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
       
      {reviewDetails.map((review) => (
        
          <div className="card bg-base-100 shadow-xl w-80" key={review._id}>
            <div className="card-body">
              <div className="avatar">
                <div className="w-24 rounded-full">
                  <img src={review.image} alt="" />
                </div>
              </div>
              <h4 className="text-black font-bold">{review.name}</h4>
              <p>{review.rev}</p>
            </div>
          </div>
       
      ))}
    </div>
    </div>
  );
};

export default Reviews;
