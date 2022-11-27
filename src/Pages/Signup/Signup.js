import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../../contexts/AuthProvider';

const Signup = () => {
    const { createUser, updateUser } = useContext(AuthContext);
    const [signUpError, setSignUpError] = useState("");
    const navigate = useNavigate();
    const { register,formState: { errors }, handleSubmit } = useForm();
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
              saveUser(data.name,data.location, data.phone, data.email);
            })
            .catch((err) => console.log(err));
    })
        .catch((er) => {
            console.error(er);
            setSignUpError(er.message);
          });
  };
  const saveUser = (name,location, phone, email) => {
    const user = { name,location, phone, email };
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
            navigate('/login')
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
          <div className="divider">OR</div>
          <button className="btn btn-outline w-full mb-5">CONTINUE WITH GOOGLE</button>
        </div>
       
      </div>
    );
};

export default Signup;