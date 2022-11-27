import React from 'react';
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Signup = () => {
    const { register,formState: { errors }, handleSubmit } = useForm();
  const handleSignup=data=>{
    console.log(data);
  }
    return (
        <div className=" flex justify-center items-center">
        <div>
          <h1 className="text-center font-semi-bold text-3xl">Signup</h1>
          <form onSubmit={handleSubmit(handleSignup)}>
              {/* name */}
            <div className="form-control w-full ">
              <label className="label"><span className="label-text">Name</span>
              </label>
              <input {...register("name",{ required: "Your Name is required" })}
                type="text"
                placeholder="Name"
                className="input input-bordered w-full max-w-xs"
              />
              {errors.name && (
              <p className="text-red-600">{errors.name?.message}</p>
            )}
            </div>
            {/* Phone */}
            <div className="form-control w-full ">
              <label className="label"><span className="label-text">Phone</span>
              </label>
              <input {...register("phone")}
                type="text"
                placeholder="Phone"
                className="input input-bordered w-full max-w-xs"
              />
             
            </div>
            {/* Email */}
            <div className="form-control w-full ">
              <label className="label"><span className="label-text">Email</span>
              </label>
              <input {...register("email",{ required: "Email address is required" })}
                type="email"
                placeholder="Email"
                className="input input-bordered w-full max-w-xs"
              />
              {errors.email && (
              <p className="text-red-600">{errors.email?.message}</p>
            )}
            </div>
            {/* password */}
            <div className="form-control w-full ">
              <label className="label"><span className="label-text">Password</span>
              </label>
              <input {...register("password",{ required: "Password is required" })}
                type="password"
                placeholder="Password"
                className="input input-bordered w-full max-w-xs"
              />
              {errors.password && <p className="text-red-600">{errors.password?.message}</p>}
            </div>
  
            <input value='Signup' className="btn bg-orange-800 w-full mt-14" type="submit" />
          </form>
          <p className="mt-5 mx-auto">Already have an account?<Link to='/login'> <u className="text-orange-900"> SignIn</u> </Link></p>
          <div className="divider">OR</div>
          <button className="btn btn-outline w-full mb-5">CONTINUE WITH GOOGLE</button>
        </div>
       
      </div>
    );
};

export default Signup;