const Loader = () => {

  return (

    <div
      className="
      w-full

      flex
      flex-col

      justify-center
      items-center

      py-20
      "
    >

      {/* OUTER RING */}

      <div
        className="
        relative

        w-24
        h-24
        "
      >

        {/* SPINNING RING */}

        <div
          className="
          absolute

          inset-0

          rounded-full

          border-4

          border-red-500
          border-t-transparent

          animate-spin
          "
        />

        {/* INNER GLOW */}

        <div
          className="
          absolute

          inset-4

          rounded-full

          bg-red-500/20

          blur-md
          "
        />

      </div>

      {/* TEXT */}

      <h2
        className="
        mt-8

        text-2xl

        font-bold

        text-red-400

        animate-pulse
        "
      >

        Loading CineVerse...

      </h2>

      <p
        className="
        text-gray-400

        mt-2
        "
      >

        Preparing your cinematic experience

      </p>

    </div>

  );

};

export default Loader;