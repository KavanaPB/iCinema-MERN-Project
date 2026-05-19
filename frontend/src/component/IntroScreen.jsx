import { useEffect }
from "react";

const IntroScreen = ({
  setShowIntro
}) => {

  useEffect(() => {

    const timer =
      setTimeout(() => {

        setShowIntro(false);

      }, 3500);

    return () =>
      clearTimeout(timer);

  }, [setShowIntro]);

  return (

    <div
      className="
      fixed
      inset-0

      bg-black

      flex
      items-center
      justify-center

      z-[99999]
      "
    >

      <h1
        className="
        text-7xl
        md:text-9xl

        font-extrabold

        text-red-600

        animate-pulse
        "
      >

        iCinema

      </h1>

    </div>

  );

};

export default IntroScreen;