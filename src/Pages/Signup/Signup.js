import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../../contexts/AuthProvider';
import useToken from '../../hooks/useToken';

const Signup = () => {
    const { createUser, updateUser } = useContext(AuthContext);
    const { data: users=[] ,isLoading,refetch} = useQuery({
      queryKey: ["users"],
      queryFn: async () => {
        const res = await fetch(
          "http://localhost:5000/users"
        );
        const data = await res.json();
        return data;
      },
    });
    const [signUpError, setSignUpError] = useState("");
    const[createdUserEmail,setCreatedUserEmail]=useState('');
    const [token]=useToken(createdUserEmail);
    const navigate = useNavigate();
    const { register,formState: { errors }, handleSubmit } = useForm();
    if(token){
      navigate('/');
    }
  const handleSignup=data=>{
    // console.log(data);
    setSignUpError("")
    createUser(data.email, data.password)
    .then((result) => {
        toast("User Created Successfully");
        const user = result.user;
        console.log(user);
        const updateInfo = {
            displayName: data.name,
          };
          updateUser(updateInfo)
            .then(() => {
              saveUser(data.name,data.location, data.phone,data.status ,data.email);
            })
            .catch((err) => console.log(err));
    })
        .catch((er) => {
            console.error(er);
            setSignUpError(er.message);
          });
  };
  const saveUser = (name,location, phone,status, email) => {
    const user = { name,location, phone, email,status };
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("savedUser", data);
        if(data.acknowledged){
          setCreatedUserEmail(email);
            
          
        }
      });
  };
  
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
            {/* Location */}
            <div className="form-control w-full ">
              <label className="label"><span className="label-text">Location</span>
              </label>
              <input {...register("location")}
                type="text"
                placeholder="Location"
                className="input input-bordered w-full max-w-xs"
              />
             
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
             {/* Status */}
            <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Status</span>
          </label>
          <select
            {...register("status",{ required: "Please select your Status" })}
            className="select select-bordered w-full max-w-xs"
          >
           
           
            <option>
                Buyer
            </option>
            <option>
                Seller
            </option>
            
          </select>
          {errors.satus && (
            <p className="text-red-600">{errors.status?.message}</p>
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
            {signUpError && <p className="text-red-600">{signUpError}</p>}
          </form>
          <p className="mt-5 mx-auto">Already have an account?<Link to='/login'> <u className="text-orange-900"> SignIn</u> </Link></p>
        </div>
       
      </div>
    );
};

export default Signup;