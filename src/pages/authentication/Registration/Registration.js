import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  createUser,
  loginUserWithGoogle,
} from "../../../features/auth/authSlice";
import useTitle from "../../../hooks/useTitle/useTitle";

const Registration = () => {
  useTitle("Registration");
  const { isLoading, email, isError, error } = useSelector(
    (state) => state?.auth
  );
  // React hook form user form and error
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();
  const password = useWatch({ control, name: "password" });
  const confirmPassword = useWatch({ control, name: "confirmPassword" });
  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      password !== undefined &&
      password !== "" &&
      confirmPassword !== undefined &&
      confirmPassword !== "" &&
      password === confirmPassword
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [password, confirmPassword]);
  // Redirect user
  const navigate = useNavigate();
  // const location = useLocation();
  // const from = location.state?.from?.pathname || "/";

  // Handle Sign Up
  const handleSignUp = (data) => {
    const { email, password } = data;
    dispatch(createUser({ email, password }));
    reset();
  };

  // Google login
  const handleGoogleLogin = () => {
    dispatch(loginUserWithGoogle());
  };
  useEffect(() => {
    if (!isLoading && email) {
      navigate("/");
    }
  }, [isLoading, email, navigate]);

  // ----------------------------///--------------------------------//
  return (
    <div className="flex items-center justify-center h-[800px] mx-5 my-12">
      <div className="w-96 p-7 shadow-2xl rounded">
        {" "}
        <h1 className="text-3xl my-5 text-center">Sign Up</h1>
        {/* handleSubmit with react hook form */}
        <form onSubmit={handleSubmit(handleSignUp)}>
          <div className="form-control w-full max-w-xs">
            {/*-------------email------------- */}
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email address is required !",
              })}
              className="input input-bordered w-full max-w-xs"
              placeholder="Your email"
            />
            {/* Show email erroRs */}
            {errors.email && (
              <p className="text-error mt-1" role="alert">
                {errors.email?.message}
              </p>
            )}{" "}
            {/* /// ==========Account type============= */}
            {/* <span className="label-text  mt-4 mb-2 ">Types</span>
            <div className="border border-3 px-4 mb-4 rounded-lg">
              <div className="form-check mt-1">
                <label htmlFor="type1">
                  <input
                    {...register("types")}
                    type="radio"
                    value="type1"
                    className="form-check-input radio w-5 h-3 checked:bg-blue-500"
                    id="type1"
                    defaultChecked
                  />{" "}
                  type1
                </label>
              </div>
              <div className="form-check mb-2">
                <label htmlFor="type2">
                  <input
                    {...register("types")}
                    type="radio"
                    value="type2"
                    className="form-check-input radio w-5 h-3 checked:bg-blue-500"
                    id="type2"
                  />{" "}
                  type2
                </label>
              </div>
            </div> */}
            {/* ======================== */}
            {errors.types?.type === "required" && (
              <p className="text-error mt-1"> {errors.types?.message}</p>
            )}
            {/*---- Password----- */}
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required !",
                minLength: {
                  value: 6,
                  message:
                    "Password must be 6 character, two uppercase and one special case letter.",
                },
                pattern: {
                  value: /(?=.*[A-Z].*[A-Z])(?=.*[!#@$%&? "])/,
                  message:
                    "Ensure password has two uppercase and one special case letter.",
                },
              })}
              className="input input-bordered w-full max-w-xs"
              placeholder="*********"
            />
            {/* Show password erroRs */}
            {errors.password && (
              <p className="text-error mt-1" role="alert">
                {errors.password?.message}
              </p>
            )}{" "}
            {/*----Confirm Password----- */}
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Password confirmation is required !",
              })}
              className="input input-bordered w-full max-w-xs"
              placeholder="*********"
            />
            {/* Show password erroRs */}
            {errors.confirmPassword && (
              <p className="text-error mt-1" role="alert">
                {errors.confirmPassword?.message}
              </p>
            )}{" "}
            {/*----Confirm Password end----- */}
          </div>

          <input
            className="btn btn-primary w-full mt-5 mb-1"
            type="submit"
            value="Sign Up"
            disabled={disabled}
          />
          {isError && (
            <label className="label">
              <span className="label-text-alt text-error">{error}</span>
            </label>
          )}
        </form>
        <p className="text-center ">
          Already have an account?{" "}
          <Link className="text-primary" to={"/login"}>
            Login
          </Link>{" "}
        </p>
        <div className="divider ">or</div>
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

export default Registration;
