import {
  Outlet
} from "react-router-dom";

import {
  ToastContainer
} from "react-toastify";

import {
  useState
} from "react";

import "react-toastify/dist/ReactToastify.css";

import Navigation
from "./pages/Auth/Navigation";

import IntroScreen from "./component/IntroScreen";

const App = () => {

  const [showIntro,
    setShowIntro] =
    useState(true);

  return (

    <>

      {/* INTRO SCREEN */}

      {showIntro && (

        <IntroScreen
          setShowIntro={
            setShowIntro
          }
        />

      )}

      {/* MAIN APP */}

      <div
        className="
        min-h-screen

        w-full

        overflow-x-hidden

        flex
        flex-col
        "
      >

        {/* TOAST */}

        <ToastContainer
          position="top-right"
          autoClose={2000}
          theme="dark"
        />

        {/* NAVBAR */}

        <Navigation />

        {/* MAIN */}

        <main
          className="
          flex-1

          w-full

          max-w-[1600px]

          mx-auto

          px-2
          sm:px-4
          md:px-6
          lg:px-8

          pt-20
          "
        >

          <Outlet />

        </main>

        {/* FOOTER */}

        <footer
          className="
          mt-20

          bg-black/80

          border-t
          border-white/10

          backdrop-blur-md

          px-6
          md:px-16

          py-12
          "
        >

          <div
            className="
            max-w-[1600px]

            mx-auto

            grid

            grid-cols-1
            md:grid-cols-3

            gap-10
            "
          >

            {/* BRAND */}

            <div>

              <h1
                className="
                text-4xl

                font-extrabold

                text-red-500

                mb-4
                "
              >

                iCinema

              </h1>

              <p
                className="
                text-gray-400

                leading-relaxed
                "
              >

                Your Ultimate OTT
                Streaming Platform
                for Trending Movies,
                Trailers and Reviews.

              </p>

            </div>

            {/* LINKS */}

            <div>

              <h2
                className="
                text-2xl

                font-bold

                mb-4
                "
              >

                Quick Links

              </h2>

              <div
                className="
                flex
                flex-col

                gap-3

                text-gray-400
                "
              >

                <a href="/">
                  Home
                </a>

                <a href="/movies">
                  Movies
                </a>

                <a href="/login">
                  Login
                </a>

                <a href="/register">
                  Register
                </a>

              </div>

            </div>

            {/* SOCIAL */}

            <div>

              <h2
                className="
                text-2xl

                font-bold

                mb-4
                "
              >

                Follow Us

              </h2>

              <div
                className="
                flex

                gap-4
                "
              >

                <div
                  className="
                  w-12
                  h-12

                  rounded-full

                  bg-white/10

                  flex
                  items-center
                  justify-center

                  hover:bg-red-600

                  transition

                  cursor-pointer
                  "
                >

                  📘

                </div>

                <div
                  className="
                  w-12
                  h-12

                  rounded-full

                  bg-white/10

                  flex
                  items-center
                  justify-center

                  hover:bg-red-600

                  transition

                  cursor-pointer
                  "
                >

                  📸

                </div>

                <div
                  className="
                  w-12
                  h-12

                  rounded-full

                  bg-white/10

                  flex
                  items-center
                  justify-center

                  hover:bg-red-600

                  transition

                  cursor-pointer
                  "
                >

                  ▶

                </div>

              </div>

            </div>

          </div>

          {/* COPYRIGHT */}

          <div
            className="
            text-center

            text-gray-500

            mt-12

            border-t
            border-white/10

            pt-6
            "
          >

            © 2026 iCinema.
            All Rights Reserved.

          </div>

        </footer>

      </div>

    </>

  );

};

export default App;