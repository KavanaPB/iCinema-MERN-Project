import { useState, useRef }
from "react";

import {
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} from "../../redux/api/movies";

import MovieCard
from "./MovieCard";

const MoviesContainerPage = () => {

  const { data } =
    useGetNewMoviesQuery();

  const { data: topMovies } =
    useGetTopMoviesQuery();

  const { data: randomMovies } =
    useGetRandomMoviesQuery();

  const [searchTerm,
    setSearchTerm] =
    useState("");

  const [listening,
    setListening] =
    useState(false);

  /* VOICE SEARCH */

  const startVoiceSearch = () => {

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

      alert(
        "Voice Search Not Supported"
      );

      return;

    }

    const recognition =
      new SpeechRecognition();

    recognition.lang =
      "en-US";

    recognition.start();

    setListening(true);

    recognition.onresult =
      (event) => {

        const transcript =
          event.results[0][0]
            .transcript;

        setSearchTerm(
          transcript
        );

        setListening(false);

      };

    recognition.onerror =
      () => {

        setListening(false);

      };

    recognition.onend =
      () => {

        setListening(false);

      };

  };

  /* ALL MOVIES */

  const allMovies = [

    ...(data || []),

    ...(topMovies || []),

    ...(randomMovies || [])

  ];

  /* REMOVE DUPLICATES */

  const uniqueMovies =
    Array.from(

      new Map(

        allMovies.map(
          (movie) => [

            movie._id,

            movie

          ]
        )

      ).values()

    );

  /* SEARCH */

  const filteredMovies =
    uniqueMovies.filter((movie) =>

      movie?.name
        ?.toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        )

    );

  /* SLIDER */

  const MovieSlider = ({
    movies
  }) => {

    const sliderRef =
      useRef(null);

    const scrollLeft = () => {

      sliderRef.current
        .scrollBy({

          left: -900,

          behavior:
            "smooth",

        });

    };

    const scrollRight = () => {

      sliderRef.current
        .scrollBy({

          left: 900,

          behavior:
            "smooth",

        });

    };

    return (

      <div
        className="
        relative
        "
      >

        {/* LEFT */}

        <button
          onClick={
            scrollLeft
          }

          className="
          absolute

          left-2
          top-1/2

          -translate-y-1/2

          z-20

          bg-black/70

          hover:bg-red-600

          w-12
          h-12

          rounded-full

          text-2xl

          transition
          "
        >

          ‹

        </button>

        {/* RIGHT */}

        <button
          onClick={
            scrollRight
          }

          className="
          absolute

          right-2
          top-1/2

          -translate-y-1/2

          z-20

          bg-black/70

          hover:bg-red-600

          w-12
          h-12

          rounded-full

          text-2xl

          transition
          "
        >

          ›

        </button>

        {/* MOVIES */}

        <div
          ref={sliderRef}

          className="
          flex

          gap-6

          overflow-x-auto

          scrollbar-hide

          px-16
          py-6

          scroll-smooth
          "
        >

          {movies?.map(
            (movie) => (

              <div
                key={
                  movie._id
                }

                className="
                min-w-[300px]

                max-w-[300px]

                flex-shrink-0
                "
              >

                <MovieCard
                  movie={
                    movie
                  }
                />

              </div>

            )
          )}

        </div>

      </div>

    );

  };

  return (

    <div className="w-full">

      {/* SEARCH */}

      <div
        className="
        flex
        justify-center

        mt-6
        mb-16

        px-4
        "
      >

        <div
          className="
          relative

          w-full
          max-w-3xl
          "
        >

          {/* SEARCH ICON */}

          <span
            className="
            absolute

            left-5
            top-1/2

            -translate-y-1/2

            text-gray-400

            text-xl
            "
          >

            🔍

          </span>

          {/* INPUT */}

          <input
            type="text"

            placeholder="Search Movies..."

            value={
              searchTerm
            }

            onChange={(e) =>
              setSearchTerm(
                e.target
                  .value
              )
            }

            className="
            w-full

            px-14
            pr-24
            py-5

            rounded-full

            bg-white/10

            border
            border-white/20

            text-white
            text-lg

            outline-none

            backdrop-blur-md

            focus:border-red-500

            transition
            "
          />

          {/* MIC */}

          <button
            onClick={
              startVoiceSearch
            }

            className={`
              absolute

              right-4
              top-1/2

              -translate-y-1/2

              w-12
              h-12

              rounded-full

              flex
              items-center
              justify-center

              text-xl

              transition

              ${
                listening

                  ? "bg-red-600 animate-pulse"

                  : "bg-white/10 hover:bg-red-600"
              }
            `}
          >

            🎤

          </button>

        </div>

      </div>

      {/* SEARCH RESULTS */}

      {searchTerm ? (

        <section
          className="
          mb-20
          "
        >

          <h2
            className="
            section-title
            "
          >

            Search Results

          </h2>

          {filteredMovies
            .length > 0 ? (

            <MovieSlider
              movies={
                filteredMovies
              }
            />

          ) : (

            <h2
              className="
              text-center

              text-2xl

              text-gray-400
              "
            >

              No Movies Found

            </h2>

          )}

        </section>

      ) : (

        <>

          {/* TRENDING */}

          <section
            className="
            mb-20
            "
          >

            <h2
              className="
              section-title
              "
            >

              Trending Movies

            </h2>

            <MovieSlider
              movies={
                randomMovies
              }
            />

          </section>

          {/* TOP */}

          <section
            className="
            mb-20
            "
          >

            <h2
              className="
              section-title
              "
            >

              Top Rated Movies

            </h2>

            <MovieSlider
              movies={
                topMovies
              }
            />

          </section>

          {/* EXPLORE */}

          <section
            className="
            mb-20
            "
          >

            <h2
              className="
              section-title
              "
            >

              Explore Movies

            </h2>

            <MovieSlider
              movies={
                uniqueMovies
              }
            />

          </section>

        </>

      )}

    </div>

  );

};

export default MoviesContainerPage;