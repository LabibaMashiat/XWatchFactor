import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const handleLogin=data=>{
    console.log(data);
  }
  return (
    <div className=" flex justify-center items-center">
      <div>
        <h1 className="text-center font-semi-bold text-3xl">Login</h1>
        <form onSubmit={handleSubmit(handleLogin)}>
            {/* email */}
          <div className="form-control w-full ">
            <label className="label"><span className="label-text">Email</span>
            </label>
            <input {...register("email")}
              type="email"
              placeholder="Email"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          {/* password */}
          <div className="form-control w-full ">
            <label className="label"><span className="label-text">Password</span>
            </label>
            <input {...register("password")}
              type="password"
              placeholder="Password"
              className="input input-bordered w-full max-w-xs"
            />
          </div>

          <input value='Login' className="btn bg-orange-800 w-full mt-14" type="submit" />
        </form>
        <p className="mt-5 mx-auto">New to <span className="font-bold"><i className="text-orange-900 font-serif">X</i>WatchFactor</span>? <Link to='/signup'> <u className="text-orange-900">Create New Account.</u> </Link></p>
        <div className="divider">OR</div>
        <button className="btn btn-outline w-full mb-5">CONTINUE WITH GOOGLE</button>
      </div>
     
    </div>
  );
};

export default Login;
