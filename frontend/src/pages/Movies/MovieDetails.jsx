import {
  useState,
  useEffect
}
from "react";

import {
  useParams,
  Link,
} from "react-router-dom";

import {
  useSelector
} from "react-redux";

import {
  toast
} from "react-toastify";

import {
  useGetSpecificMovieQuery,
  useAddMovieReviewMutation,
} from "../../redux/api/movies";

import MovieTabs
from "./MovieTabs";

const MovieDetails = () => {

  const { id: movieId } =
    useParams();

  /* AUTO SCROLL TOP */

  useEffect(() => {

    window.scrollTo({

      top: 0,

      behavior: "smooth",

    });

  }, []);

  const [rating,
    setRating] =
    useState(0);

  const [comment,
    setComment] =
    useState("");

  const [showTrailer,
    setShowTrailer] =
    useState(false);

  const {
    data: movie,
    refetch,
  } = useGetSpecificMovieQuery(
    movieId
  );

  const { userInfo } =
    useSelector(
      (state) => state.auth
    );

  const [
    createReview,
    {
      isLoading:
        loadingMovieReview,
    },
  ] = useAddMovieReviewMutation();

  const submitHandler =
    async (e) => {

      e.preventDefault();

      try {

        await createReview({

          id: movieId,

          rating,

          comment,

        }).unwrap();

        refetch();

        toast.success(
          "Review Added"
        );

      } catch (error) {

        toast.error(
          error.data ||
          error.message
        );

      }

    };

  return (

    <div
      className="
      w-full

      min-h-screen

      text-white

      bg-[#050510]
      "
    >

      {/* HERO SECTION */}

      <div
        className="
        relative

        min-h-[100vh]

        overflow-hidden
        "
      >

        {/* BACKGROUND */}

        <img
          src={movie?.image}

          alt={movie?.name}

          className="
          absolute

          inset-0

          w-full
          h-full

          object-cover
          "
        />

        {/* DARK OVERLAY */}

        <div
          className="
          absolute
          inset-0

          bg-gradient-to-t

          from-[#050510]
          via-black/80
          to-black/60
          "
        />

        {/* BACK BUTTON */}

        <Link
          to="/"

          className="
          absolute

          top-8
          left-8

          z-20

          bg-black/60

          px-5
          py-3

          rounded-full

          backdrop-blur-md

          hover:bg-red-600

          transition
          "
        >

          ← Back

        </Link>

        {/* CONTENT */}

        <div
          className="
          relative
          z-10

          px-6
          md:px-16

          pt-36
          pb-20

          flex

          flex-col
          lg:flex-row

          gap-12

          items-center
          lg:items-start
          "
        >

          {/* POSTER */}

          <div
            className="
            flex-shrink-0
            "
          >

            <img
              src={movie?.image}

              alt={movie?.name}

              className="
              w-[260px]
              md:w-[320px]

              rounded-3xl

              shadow-2xl

              border
              border-white/10
              "
            />

          </div>

          {/* INFO */}

          <div
            className="
            max-w-5xl
            "
          >

            {/* TITLE */}

            <h1
              className="
              text-4xl
              md:text-6xl
              lg:text-7xl

              font-extrabold

              leading-tight

              break-words

              mb-6
              "
            >

              {movie?.name}

            </h1>

            {/* META */}

            <div
              className="
              flex
              flex-wrap

              gap-4

              items-center

              mb-8
              "
            >

              {/* YEAR */}

              <span
                className="
                px-5
                py-2

                rounded-full

                bg-white/10

                text-lg
                "
              >

                {movie?.year}

              </span>

              {/* RATING */}

              <span
                className="
                px-5
                py-2

                rounded-full

                bg-yellow-500

                text-black

                font-bold

                text-lg
                "
              >

                ⭐ {movie?.rating || 4.8}

              </span>

              {/* REVIEWS */}

              <span
                className="
                px-5
                py-2

                rounded-full

                bg-red-600

                text-lg
                "
              >

                {movie?.numReviews || 0}
                Reviews

              </span>

            </div>

            {/* DESCRIPTION */}

            <p
              className="
              text-base
              md:text-lg
              lg:text-xl

              text-gray-300

              leading-relaxed

              mb-10
              "
            >

              {movie?.detail}

            </p>

            {/* CAST */}

            <div
              className="
              flex
              flex-wrap

              gap-4

              mb-10
              "
            >

              {movie?.cast?.map((c,
                index) => (

                <span
                  key={index}

                  className="
                  px-5
                  py-3

                  rounded-full

                  bg-white/10

                  backdrop-blur-md

                  text-gray-200
                  "
                >

                  {c}

                </span>

              ))}

            </div>

            {/* BUTTON */}

            {movie?.trailer && (

              <button

                onClick={() =>
                  setShowTrailer(
                    true
                  )
                }

                className="
                bg-red-600

                hover:bg-red-700

                px-10
                py-4

                rounded-full

                text-lg
                md:text-xl

                font-bold

                shadow-2xl

                transition
                "
              >

                ▶ Watch Trailer

              </button>

            )}

          </div>

        </div>

      </div>

      {/* TRAILER MODAL */}

      {showTrailer && (

        <div
          className="
          fixed

          inset-0

          bg-black/95

          backdrop-blur-md

          z-[9999]

          flex
          items-center
          justify-center

          p-4
          "
        >

          {/* CLOSE */}

          <button

            onClick={() =>
              setShowTrailer(
                false
              )
            }

            className="
            absolute

            top-6
            right-6

            text-white

            text-5xl

            hover:text-red-500

            transition
            "
          >

            ×

          </button>

          {/* VIDEO */}

          <div
            className="
            w-full

            max-w-6xl

            aspect-video

            rounded-3xl

            overflow-hidden

            shadow-2xl
            "
          >

            <iframe

              src={movie?.trailer}

              title="Movie Trailer"

              allowFullScreen

              className="
              w-full
              h-full
              "

            />

          </div>

        </div>

      )}

      {/* REVIEWS */}

      <div
        className="
        px-4
        md:px-16

        py-20
        "
      >

        <MovieTabs
          loadingMovieReview={
            loadingMovieReview
          }

          userInfo={userInfo}

          submitHandler={
            submitHandler
          }

          rating={rating}

          setRating={setRating}

          comment={comment}

          setComment={setComment}

          movie={movie}
        />

      </div>

    </div>

  );

};

export default MovieDetails;