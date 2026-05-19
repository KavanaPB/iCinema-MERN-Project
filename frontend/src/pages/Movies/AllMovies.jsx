import {
  useGetAllMoviesQuery,
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} from "../../redux/api/movies";

import { useFetchGenresQuery }
from "../../redux/api/genre";

import MovieCard
from "./MovieCard";

import banner
from "../../assets/banner.jpg";

import { useState }
from "react";

const AllMovies = () => {

  const { data } =
    useGetAllMoviesQuery();

  const { data: genres } =
    useFetchGenresQuery();

  const { data: newMovies } =
    useGetNewMoviesQuery();

  const { data: topMovies } =
    useGetTopMoviesQuery();

  const { data: randomMovies } =
    useGetRandomMoviesQuery();

  const [searchTerm,
    setSearchTerm] =
    useState("");

  const [selectedGenre,
    setSelectedGenre] =
    useState("");

  /* FILTER */

  const filteredMovies =
    data?.filter((movie) => {

      const matchesSearch =

        movie.name
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      const matchesGenre =

        selectedGenre === "" ||

        movie.genre === selectedGenre;

      return (
        matchesSearch &&
        matchesGenre
      );

    });

  /* SLIDER */

  const MovieSlider = ({
    movies
  }) => (

    <div
      className="
      flex

      gap-6

      overflow-x-auto

      scrollbar-hide

      px-4
      py-6

      scroll-smooth
      "
    >

      {movies?.map((movie) => (

        <div
          key={movie._id}

          className="
          min-w-[300px]

          max-w-[300px]

          flex-shrink-0
          "
        >

          <MovieCard
            movie={movie}
          />

        </div>

      ))}

    </div>

  );

  return (

    <div className="w-full">

      {/* HERO */}

      <section
        className="
        relative

        w-full
        h-[70vh]

        flex
        items-center
        justify-center

        bg-cover
        bg-center
        "
        style={{
          backgroundImage:
            `url(${banner})`
        }}
      >

        {/* OVERLAY */}

        <div
          className="
          absolute
          inset-0

          bg-black/70
          "
        />

        {/* CONTENT */}

        <div
          className="
          relative
          z-10

          text-center

          px-4
          "
        >

          <h1
            className="
            text-5xl
            md:text-7xl

            font-extrabold

            mb-6
            "
          >

            Movie Hub

          </h1>

          <p
            className="
            text-lg
            md:text-2xl

            text-gray-300

            mb-10
            "
          >

            Explore Trending &
            Cinematic Experiences

          </p>

          {/* SEARCH */}

          <div
            className="
            relative

            w-full
            max-w-3xl

            mx-auto
            "
          >

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

            <input
              type="text"

              placeholder="Search Movies..."

              value={searchTerm}

              onChange={(e) =>
                setSearchTerm(
                  e.target.value
                )
              }

              className="
              w-full

              px-14
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

          </div>

          {/* GENRE */}

          <div className="mt-8">

            <select
              value={selectedGenre}

              onChange={(e) =>
                setSelectedGenre(
                  e.target.value
                )
              }

              className="
              px-6
              py-3

              rounded-full

              bg-black/70

              border
              border-white/20

              text-white

              outline-none
              "
            >

              <option value="">

                All Genres

              </option>

              {genres?.map((genre) => (

                <option
                  key={genre._id}

                  value={genre._id}
                >

                  {genre.name}

                </option>

              ))}

            </select>

          </div>

        </div>

      </section>

      {/* SEARCH RESULTS */}

      {searchTerm ? (

        <section className="mb-20 mt-10">

          <h2 className="section-title">

            Search Results

          </h2>

          <MovieSlider
            movies={filteredMovies}
          />

        </section>

      ) : (

        <>

          {/* TRENDING */}

          <section className="mb-20 mt-10">

            <h2 className="section-title">

              Trending Movies

            </h2>

            <MovieSlider
              movies={randomMovies}
            />

          </section>

          {/* TOP */}

          <section className="mb-20">

            <h2 className="section-title">

              Top Rated Movies

            </h2>

            <MovieSlider
              movies={topMovies}
            />

          </section>

          {/* NEW */}

          <section className="mb-20">

            <h2 className="section-title">

              Newly Added Movies

            </h2>

            <MovieSlider
              movies={newMovies}
            />

          </section>

          {/* ALL */}

          <section className="mb-20">

            <h2 className="section-title">

              Explore Movies

            </h2>

            <MovieSlider
              movies={filteredMovies}
            />

          </section>

        </>

      )}

    </div>

  );

};

export default AllMovies;