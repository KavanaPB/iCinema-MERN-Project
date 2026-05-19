import {
  Link
} from "react-router-dom";

import {
  useState
} from "react";

const MovieCard = ({
  movie
}) => {

  const [showTrailer,
    setShowTrailer] =
    useState(false);

  const [hovered,
    setHovered] =
    useState(false);

  return (

    <>

      {/* CARD */}

      <div
        className="
        block

        group

        w-full
        "

        onMouseEnter={() =>
          setHovered(true)
        }

        onMouseLeave={() =>
          setHovered(false)
        }
      >

        <div
          className="
          relative

          overflow-hidden

          rounded-3xl

          bg-black/40

          backdrop-blur-lg

          border
          border-white/10

          shadow-2xl

          transition-all
          duration-500

          hover:scale-105

          hover:-translate-y-2

          hover:shadow-red-500/40

          h-full

          max-w-[320px]

          mx-auto
          "
        >

          {/* TRAILER PREVIEW */}

          {hovered &&
          movie?.trailer ? (

            <iframe

              src={`${movie.trailer}?autoplay=1&mute=0&controls=0`}

              title={movie.name}

              allow="autoplay"

              className="
              w-full

              h-[450px]

              object-cover
              "
            />

          ) : (

            <div
              className="
              overflow-hidden

              relative
              "
            >

              {/* IMAGE */}

              <img
                src={
                  movie.image
                    ? movie.image
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }

                alt={movie.name}

                className="
                w-full

                h-[450px]

                object-cover

                transition-transform
                duration-700

                group-hover:scale-110
                "

                onError={(e) => {

                  e.target.src =
                    "https://via.placeholder.com/300x450?text=Movie";

                }}
              />

              {/* OVERLAY */}

              <div
                className="
                absolute
                inset-0

                bg-gradient-to-t

                from-black
                via-black/30
                to-transparent
                "
              />

              {/* PLAY BUTTON */}

              <div
                className="
                absolute

                inset-0

                flex
                items-center
                justify-center

                opacity-0

                group-hover:opacity-100

                transition
                duration-500
                "
              >

                <button
                  onClick={() =>
                    setShowTrailer(
                      true
                    )
                  }

                  className="
                  w-20
                  h-20

                  rounded-full

                  bg-red-600/90

                  flex
                  items-center
                  justify-center

                  text-4xl

                  shadow-2xl

                  hover:scale-110

                  transition
                  "
                >

                  ▶

                </button>

              </div>

            </div>

          )}

          {/* INFO */}

          <div
            className="
            absolute

            bottom-0
            left-0

            w-full

            p-5

            z-10
            "
          >

            {/* TITLE */}

            <h2
              className="
              text-2xl

              font-bold

              text-white

              mb-2

              line-clamp-1
              "
            >

              {movie.name}

            </h2>

            {/* DETAIL */}

            <p
              className="
              text-sm

              text-gray-300

              line-clamp-2

              mb-4
              "
            >

              {movie.detail}

            </p>

            {/* BUTTONS */}

            <div
              className="
              flex

              items-center

              justify-between
              "
            >

              {/* DETAILS */}

              <Link
                to={`/movies/${movie._id}`}
              >

                <button
                  className="
                  px-5
                  py-2

                  rounded-full

                  bg-red-600

                  hover:bg-red-700

                  text-sm
                  font-semibold

                  transition
                  "
                >

                  View Details

                </button>

              </Link>

              {/* YEAR */}

              <span
                className="
                text-sm

                text-gray-300

                bg-white/10

                px-3
                py-1

                rounded-full
                "
              >

                {movie.year}

              </span>

            </div>

          </div>

        </div>

      </div>

      {/* FULL TRAILER MODAL */}

      {showTrailer && (

        <div
          className="
          fixed

          inset-0

          bg-black/90

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

          {/* TRAILER */}

          <div
            className="
            w-full

            max-w-5xl

            aspect-video

            rounded-3xl

            overflow-hidden

            shadow-2xl
            "
          >

            <iframe
              width="100%"
              height="100%"

              src={movie.trailer}

              title={movie.name}

              allowFullScreen

              className="
              w-full
              h-full
              "
            />

          </div>

        </div>

      )}

    </>

  );

};

export default MovieCard;