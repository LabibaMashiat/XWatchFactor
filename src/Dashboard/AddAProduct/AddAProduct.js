import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import Loading from "../../Loading/Loading";

const AddAProduct = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("https://x-watch-factor-server.vercel.app/users");
      const data = await res.json();
      return data;
    },
  });
  const currentUser = users.filter((us) => us?.email === user?.email);
  // console.log(currentUser[0]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const imgHostKey = process.env.REACT_APP_imgbb_key;
  const handleAddProducts = (data) => {
    //  console.log(data)
    const picture = data.picture[0];
    console.log(picture);
    const formData = new FormData();
    formData.append("image", picture);
    const url = `https://api.imgbb.com/1/upload?key=${imgHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((picData) => {
        console.log(picData);
        if (picData.success) {
          console.log(picData.data.url);
          const product = {
            picture: picData.data.url,
            name: data.name,
            resale_price: data.resale_price,
            original_price: data.original_price,
            years_of_use: data.years_of_use,
            product_description: data.product_description,
            location: data.location,
            sellers_name: data.sellers_name,
            sellers_email: data.email,
            sellers_phone: data.phone,
            posted_date: data.posted_date,
            category_value: data.category_value,
          };
          //   save products to database
          fetch("https://x-watch-factor-server.vercel.app/products", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(product),
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              if (result.acknowledged) {
                toast.success("Product successfully added");
                navigate("/dashboard/myProducts");
              }
            });
        }
      });
    if (isLoading) {
      return <Loading></Loading>;
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit(handleAddProducts)}>
        {/* name */}
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Product Name</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            {...register("name", { required: "Product Name is required" })}
          />
          {errors.name && (
            <p className="text-red-600">{errors.name?.message}</p>
          )}
        </div>
        {/* Location */}
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Location</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            // defaultValue={currentUser[0]?.location}
            {...register("location")}
          />
        </div>
        {/* Resale Price */}
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Resale Price</span>
          </label>
          <input
            type="number"
            className="input input-bordered w-full max-w-xs"
            {...register("resale_price", {
              required: "Resale Price is required",
            })}
          />
          {errors.resale_price && (
            <p className="text-red-600">{errors.resale_price?.message}</p>
          )}
        </div>
        {/* Original Price */}
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Original Price</span>
          </label>
          <input
            type="number"
            className="input input-bordered w-full max-w-xs"
            {...register("original_price", {
              required: "Original Price is required",
            })}
          />
          {errors.original_price && (
            <p className="text-red-600">{errors.original_price?.message}</p>
          )}
        </div>
        {/* Years of Use */}
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Years of Use</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            {...register("years_of_use", { required: "Used Time is required" })}
          />
          {errors.years_of_use && (
            <p className="text-red-600">{errors.years_of_use?.message}</p>
          )}
        </div>
        {/* seller's name */}
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Sellers Name</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            defaultValue={user?.displayName && user.displayName}
            // defaultValue={currentUser[0]?.name}
            readOnly
            {...register("sellers_name")}
          />
        </div>
        {/* sellers email */}
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            className="input input-bordered w-full max-w-xs"
            defaultValue={user?.email}
            // defaultValue={currentUser[0]?.email}
            readOnly
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-600">{errors.email?.message}</p>
          )}
        </div>
        {/* sellers phone */}
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Phone</span>
          </label>
          <input
            type="number"
            className="input input-bordered w-full max-w-xs"
            // defaultValue={currentUser[0]?.phone}
            // readOnly
            {...register("phone")}
          />
        </div>
        {/* product description */}
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Product Description</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            {...register("product_description", {
              required: "Product description is required",
            })}
          />
          {errors.product_description && (
            <p className="text-red-600">
              {errors.product_description?.message}
            </p>
          )}
        </div>
        {/* Category_value */}
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Category</span>
          </label>
          <select
            {...register("category_value", {
              required: "Product Category is required",
            })}
            className="select select-bordered w-full max-w-xs"
          >
            <option value="1">Male</option>
            <option value="2">Kids</option>
            <option value="3">Female</option>
          </select>
          {errors.category_value && (
            <p className="text-red-600">{errors.category_value?.message}</p>
          )}
        </div>
        {/* posted date */}
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Posted Date</span>
          </label>
          <input
            type="date"
            className="input input-bordered w-full max-w-xs"
            {...register("posted_date", {
              required: "Please Select Current Date",
            })}
          />
          {errors.posted_date && (
            <p className="text-red-600">{errors.posted_date?.message}</p>
          )}
        </div>
        {/* Photo */}
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Product Photo</span>
          </label>
          <input
            type="file"
            className="input input-bordered w-full max-w-xs"
            {...register("picture")}
          />
          {errors.picture && (
            <p className="text-red-600">{errors.picture?.message}</p>
          )}
        </div>

        <input
          className="btn bg-orange-800 w-auto my-6"
          type="submit"
          value="Add Product"
        />
      </form>
    </div>
  );
};

export default AddAProduct;
