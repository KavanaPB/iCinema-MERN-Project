import { useState, useEffect } from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import Loader from "../../component/Loader";

import { setCredentials }
from "../../redux/features/auth/authSlice";

import { useLoginMutation }
from "../../redux/api/users";

import { toast }
from "react-toastify";

const Login = () => {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [login, { isLoading }] =
    useLoginMutation();

  const { userInfo } =
    useSelector((state) => state.auth);

  const { search } = useLocation();

  const sp = new URLSearchParams(search);

  const redirect =
    sp.get("redirect") || "/";

  useEffect(() => {

    if (userInfo) {

      navigate(redirect);

    }

  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {

    e.preventDefault();

    try {

      const res =
        await login({
          email,
          password,
        }).unwrap();

      dispatch(setCredentials({ ...res }));

      navigate(redirect);

    } catch (err) {

      toast.error(
        err?.data?.message || err.error
      );

    }

  };

  return (

    <div
      className="
      min-h-screen

      flex
      items-center
      justify-center

      px-4
      py-10
      "
    >

      <div
        className="
        w-full
        max-w-6xl

        grid
        md:grid-cols-2

        bg-black/40
        backdrop-blur-lg

        rounded-3xl
        overflow-hidden

        shadow-2xl
        "
      >

        {/* LEFT SIDE */}

        <div
          className="
          p-8
          md:p-14
          "
        >

          <h1
            className="
            text-4xl
            font-bold
            mb-8
            text-white
            "
          >
            Welcome Back
          </h1>

          <form
            onSubmit={submitHandler}
            className="space-y-6"
          >

            {/* EMAIL */}

            <div>

              <label
                className="
                block
                text-white
                mb-2
                "
              >
                Email Address
              </label>

              <input
                type="email"

                placeholder="Enter Email"

                value={email}

                onChange={(e) =>
                  setEmail(e.target.value)
                }

                className="
                w-full

                p-4

                rounded-xl

                bg-white/10

                border
                border-white/20

                text-white

                outline-none
                "
              />

            </div>

            {/* PASSWORD */}

            <div>

              <label
                className="
                block
                text-white
                mb-2
                "
              >
                Password
              </label>

              <input
                type="password"

                placeholder="Enter Password"

                value={password}

                onChange={(e) =>
                  setPassword(e.target.value)
                }

                className="
                w-full

                p-4

                rounded-xl

                bg-white/10

                border
                border-white/20

                text-white

                outline-none
                "
              />

            </div>

            {/* BUTTON */}

            <button
              disabled={isLoading}

              type="submit"

              className="
              w-full

              bg-red-600

              py-4

              rounded-xl

              text-white
              font-bold

              hover:bg-red-700

              transition
              "
            >

              {isLoading
                ? "Signing In..."
                : "Sign In"}

            </button>

            {isLoading && <Loader />}

          </form>

          {/* REGISTER */}

          <p
            className="
            text-gray-300
            mt-8
            "
          >

            New User?{" "}

            <Link
              to={
                redirect
                  ? `/register?redirect=${redirect}`
                  : "/register"
              }

              className="
              text-red-500
              hover:underline
              "
            >
              Register
            </Link>

          </p>

        </div>

        {/* RIGHT IMAGE */}

        <div className="hidden md:block">

          <img
            src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop"

            alt="movie"

            className="
            w-full
            h-full
            object-cover
            "
          />

        </div>

      </div>

    </div>

  );

};

export default Login;