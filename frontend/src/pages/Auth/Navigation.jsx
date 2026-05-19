import { useState }
from "react";

import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineUserAdd,
} from "react-icons/ai";

import {
  MdOutlineLocalMovies
} from "react-icons/md";

import {
  HiMenuAlt3,
  HiX
} from "react-icons/hi";

import {
  Link,
  useNavigate,
  useLocation
} from "react-router-dom";

import {
  useSelector,
  useDispatch
} from "react-redux";

import {
  useLogoutMutation
} from "../../redux/api/users";

import {
  logout
} from "../../redux/features/auth/authSlice";

const Navigation = () => {

  const { userInfo } =
    useSelector(
      (state) => state.auth
    );

  const [dropdownOpen,
    setDropdownOpen] =
    useState(false);

  const [mobileMenu,
    setMobileMenu] =
    useState(false);

  const dispatch =
    useDispatch();

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const [logoutApiCall] =
    useLogoutMutation();

  const logoutHandler =
    async () => {

      try {

        await logoutApiCall()
          .unwrap();

        dispatch(logout());

        navigate("/login");

      } catch (error) {

        console.error(error);

      }

    };

  const navLinkStyle =
    (path) =>

      `
      flex
      items-center
      gap-2

      transition

      hover:text-red-500

      ${
        location.pathname ===
        path

          ? "text-red-500"

          : "text-white"
      }
      `;

  return (

    <nav
      className="
      fixed

      top-0
      left-0

      w-full

      z-50

      bg-black/40

      backdrop-blur-xl

      border-b
      border-white/10

      shadow-2xl
      "
    >

      <div
        className="
        max-w-[1600px]

        mx-auto

        flex
        justify-between
        items-center

        px-4
        md:px-8

        py-4
        "
      >

        {/* LOGO */}

        <Link
          to="/"

          className="
          text-3xl
          md:text-4xl

          font-extrabold

          text-red-600

          tracking-wide
          "
        >

          CineVerse

        </Link>

        {/* DESKTOP NAV */}

        <div
          className="
          hidden
          md:flex

          items-center

          gap-8
          "
        >

          <Link
            to="/"

            className={
              navLinkStyle("/")
            }
          >

            <AiOutlineHome
              size={24}
            />

            <span>
              Home
            </span>

          </Link>

          <Link
            to="/movies"

            className={
              navLinkStyle(
                "/movies"
              )
            }
          >

            <MdOutlineLocalMovies
              size={24}
            />

            <span>
              Movies
            </span>

          </Link>

          {/* USER */}

          {userInfo ? (

            <div className="relative">

              <button
                onClick={() =>
                  setDropdownOpen(
                    !dropdownOpen
                  )
                }

                className="
                bg-red-600

                hover:bg-red-700

                px-5
                py-2

                rounded-full

                transition
                "
              >

                {userInfo.username}

              </button>

              {dropdownOpen && (

                <div
                  className="
                  absolute

                  right-0
                  mt-4

                  w-56

                  bg-black/95

                  border
                  border-white/10

                  rounded-2xl

                  overflow-hidden

                  shadow-2xl
                  "
                >

                  {userInfo.isAdmin && (

                    <Link
                      to="/admin/movies/dashboard"

                      className="
                      block

                      px-5
                      py-4

                      hover:bg-red-600

                      transition
                      "
                    >

                      Admin Dashboard

                    </Link>

                  )}

                  <Link
                    to="/profile"

                    className="
                    block

                    px-5
                    py-4

                    hover:bg-red-600

                    transition
                    "
                  >

                    Profile

                  </Link>

                  <button
                    onClick={
                      logoutHandler
                    }

                    className="
                    w-full

                    text-left

                    px-5
                    py-4

                    hover:bg-red-600

                    transition
                    "
                  >

                    Logout

                  </button>

                </div>

              )}

            </div>

          ) : (

            <div
              className="
              flex
              items-center

              gap-4
              "
            >

              <Link
                to="/login"

                className="
                flex
                items-center

                gap-2

                hover:text-red-500

                transition
                "
              >

                <AiOutlineLogin
                  size={24}
                />

                <span>
                  Login
                </span>

              </Link>

              <Link
                to="/register"

                className="
                flex
                items-center

                gap-2

                bg-red-600

                hover:bg-red-700

                px-5
                py-2

                rounded-full

                transition
                "
              >

                <AiOutlineUserAdd
                  size={22}
                />

                <span>
                  Register
                </span>

              </Link>

            </div>

          )}

        </div>

        {/* MOBILE MENU */}

        <button
          onClick={() =>
            setMobileMenu(
              !mobileMenu
            )
          }

          className="
          md:hidden

          text-3xl
          "
        >

          {mobileMenu

            ? <HiX />

            : <HiMenuAlt3 />
          }

        </button>

      </div>

      {/* MOBILE DROPDOWN */}

      {mobileMenu && (

        <div
          className="
          md:hidden

          bg-black/95

          border-t
          border-white/10

          px-6
          py-6

          flex
          flex-col

          gap-6
          "
        >

          <Link
            to="/"

            className={
              navLinkStyle("/")
            }
          >

            Home

          </Link>

          <Link
            to="/movies"

            className={
              navLinkStyle(
                "/movies"
              )
            }
          >

            Movies

          </Link>

          {!userInfo && (

            <>

              <Link
                to="/login"
              >

                Login

              </Link>

              <Link
                to="/register"
              >

                Register

              </Link>

            </>

          )}

        </div>

      )}

    </nav>

  );

};

export default Navigation;