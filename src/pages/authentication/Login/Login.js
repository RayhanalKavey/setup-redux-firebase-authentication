import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useTitle from "../../../hooks/useTitle/useTitle";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  loginUserWithGoogle,
} from "../../../features/auth/authSlice";

const Login = () => {
  useTitle("Login");
  const { isLoading, email, isError, error } = useSelector(
    (state) => state?.auth
  );
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const dispatch = useDispatch();

  /// redirect user
  const navigate = useNavigate();
  //user location where they want to go
  // const location = useLocation();
  // const from = location.state?.from?.pathname || "/";

  /// Handle login

  const handleLogin = (data) => {
    const { email, password } = data;
    dispatch(loginUser({ email, password }));
  };
  // Log in with google
  const handleGoogleLogin = () => {
    dispatch(loginUserWithGoogle());
  };
  useEffect(() => {
    if (!isLoading && email) {
      navigate("/");
    }
  }, [isLoading, email, navigate]);

  //-----------------------///---------------------------//
  return (
    <div className="flex items-center justify-center h-[800px] mx-5">
      <div className="w-96 p-7 shadow-2xl rounded">
        {" "}
        <h1 className="text-3xl my-5 text-center">Login</h1>
        {/* From react hook form */}
        <form onSubmit={handleSubmit(handleLogin)}>
          {/* daisy ui */}
          <div className="form-control w-full max-w-xs">
            {/*// Email */}
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              {...register("email", { required: "Email address is required!" })}
              className="input input-bordered w-full max-w-xs"
              placeholder="Your email"
            />
            {/* Show email erroRs */}
            {errors.email && (
              <p className="text-error mt-1" role="alert">
                {errors.email?.message}
              </p>
            )}{" "}
            {/* // password */}
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
              })}
              className="input input-bordered w-full max-w-xs"
              placeholder="Your password"
            />
            {/* Show password erroRs */}
            {errors.password && (
              <p className="text-error mt-1">{errors.password?.message}</p>
            )}{" "}
            <label className="label">
              <span className="label-text-alt">Forget password?</span>
            </label>
          </div>

          <input
            className="btn btn-primary w-full mt-5 mb-1"
            type="submit"
            value="Login"
          />
          {isError && (
            <label className="label">
              <span className="label-text-alt text-error">{error}</span>
            </label>
          )}
        </form>
        <p className="text-center mt-2">
          New to <span className="font-semibold">Project Name</span>?{" "}
          <Link className="text-primary" to={"/registration"}>
            Create new Account
          </Link>{" "}
        </p>
        <div className="divider">or</div>
        <button
          onClick={handleGoogleLogin}
          className="btn btn-primary w-full btn-outline"
          type="submit"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            className="w-5 h-5 fill-current"
          >
            <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Login;
