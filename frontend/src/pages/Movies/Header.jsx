import {
  Link
} from "react-router-dom";

import {
  useEffect,
  useState
} from "react";

/* FEATURED MOVIES */

const banners = [

  {
    id: "6a09d437ae828cb02f180cae",

    title: "Oppenheimer",

    subtitle:
      "The World Forever Changes",

    description:
      "Christopher Nolan’s epic biographical thriller about the father of the atomic bomb.",

    image:
      "https://wallpapercave.com/wp/wp12434662.jpg",
  },

  {
    id: "6a09eb57ae828cb02f180cb4",

    title: "Toxic",

    subtitle:
      "A Deadly New Gangster Saga",

    description:
      "Yash returns in a stylish high-octane gangster action entertainer.",

    image:
      "https://images.hindustantimes.com/img/2025/01/08/1600x900/Toxic_1736338751504_1736338751688.jpg",
  },

  {
    id: "6a09ec73ae828cb02f180cb6",

    title: "Avengers: Doomsday",

    subtitle:
      "The Multiverse Faces Doom",

    description:
      "Marvel’s biggest multiverse war begins with Doctor Doom.",

    image:
      "https://images.thedirect.com/media/article_full/avengers-doomsday.jpg",
  },

  {
    id: "6a09eccaae828cb02f180cb8",

    title: "Spider-Man: Brand New Day",

    subtitle:
      "A New Beginning For Peter Parker",

    description:
      "Spider-Man begins a completely new journey after No Way Home.",

    image:
      "https://wallpapercave.com/wp/wp11735300.jpg",
  },

  {
    id: "6a09ed5bae828cb02f180cba",

    title: "Ramayana",

    subtitle:
      "India’s Epic Mythological Universe",

    description:
      "A grand cinematic retelling of the legendary Ramayana.",

    image:
      "https://wallpapercave.com/wp/wp11916074.jpg",
  },

];

const Header = () => {

  const [currentBanner,
    setCurrentBanner] =
    useState(0);

  /* AUTO SLIDER */

  useEffect(() => {

    const interval =
      setInterval(() => {

        setCurrentBanner(

          (prev) =>

            (prev + 1) %
            banners.length

        );

      }, 5000);

    return () =>
      clearInterval(interval);

  }, []);

  return (

    <section
      className="
      relative

      w-full
      min-h-[95vh]

      flex
      items-center

      px-6
      md:px-16

      overflow-hidden
      "
    >

      {/* BACKGROUND IMAGE */}

      <div
        className="
        absolute
        inset-0

        bg-cover
        bg-center

        transition-all
        duration-1000
        "
        style={{
          backgroundImage:
            `url(${banners[currentBanner].image})`,
        }}
      />

      {/* OVERLAY */}

      <div
        className="
        absolute
        inset-0

        bg-black/75
        "
      />

      {/* CONTENT */}

      <div
        className="
        relative
        z-10

        max-w-4xl
        "
      >

        {/* LOGO */}

        <h1
          className="
          text-6xl
          md:text-8xl

          font-extrabold

          mb-6
          "
        >

           iCinema

        </h1>

        {/* MOVIE TITLE */}

        <h2
          className="
          text-3xl
          md:text-5xl

          font-bold

          text-red-500

          mb-4
          "
        >

          {banners[currentBanner].title}

        </h2>

        {/* SUBTITLE */}

        <h3
          className="
          text-xl
          md:text-3xl

          text-white

          mb-6
          "
        >

          {banners[currentBanner].subtitle}

        </h3>

        {/* DESCRIPTION */}

        <p
          className="
          text-lg
          md:text-2xl

          text-gray-300

          leading-relaxed

          mb-10
          "
        >

          {banners[currentBanner].description}

        </p>

        {/* BUTTONS */}

        <div
          className="
          flex
          flex-wrap

          gap-6
          "
        >

          {/* WATCH NOW */}

          <Link
            to={`/movies/${banners[currentBanner].id}`}
          >

            <button
              className="
              bg-red-600

              hover:bg-red-700

              px-10
              py-4

              rounded-full

              text-xl
              font-semibold

              transition
              "
            >

              ▶ Watch Now

            </button>

          </Link>

          {/* BROWSE */}

          <Link to="/movies">

            <button
              className="
              bg-white/10

              hover:bg-white/20

              border
              border-white/20

              px-10
              py-4

              rounded-full

              text-xl
              font-semibold

              backdrop-blur-md

              transition
              "
            >

              Browse Movies

            </button>

          </Link>

        </div>

        {/* DOTS */}

        <div
          className="
          flex

          gap-3

          mt-10
          "
        >

          {banners.map((_,
            index) => (

            <button
              key={index}

              onClick={() =>
                setCurrentBanner(
                  index
                )
              }

              className={`
                w-4
                h-4

                rounded-full

                transition

                ${
                  currentBanner ===
                  index

                    ? "bg-red-500"

                    : "bg-white/40"
                }
              `}
            />

          ))}

        </div>

      </div>

    </section>

  );

};

export default Header;