import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";

const Login = () => {
    const{signIn}= useContext(AuthContext);
    const[loginError,setLoginError]=useState('');
    const navigate=useNavigate();
  const { register,formState: { errors }, handleSubmit } = useForm();


  const handleLogin=data=>{
    setLoginError('');
    console.log(data);
    signIn(data.email,data.password)
    .then(result=>{
        const user=result.user;
        console.log(user);
        navigate('/')
        
    })
    .catch(er=>{
        console.error(er);
        setLoginError(er.message)

    })
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

          <input value='Login' className="btn bg-orange-800 w-full mt-14" type="submit" />
          {loginError && <p className='text-red-600'>{loginError}</p>}
        </form>
        <p className="mt-5 mx-auto">New to <span className="font-bold"><i className="text-orange-900 font-serif">X</i>WatchFactor</span>? <Link to='/signup'> <u className="text-orange-900">Create New Account.</u> </Link></p>
        <div className="divider">OR</div>
        <button className="btn btn-outline w-full mb-5">CONTINUE WITH GOOGLE</button>
      </div>
     
    </div>
  );
};

export default Login;
