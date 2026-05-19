import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import MovieCard from "../pages/Movies/MovieCard";

const SliderUtil = ({ data }) => {

  const settings = {

    dots: false,

    infinite: true,

    speed: 600,

    autoplay: true,

    autoplaySpeed: 2500,

    slidesToShow: 4,

    slidesToScroll: 1,

    arrows: true,

    responsive: [

      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },

      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },

      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },

    ],

  };

  return (

    <div className="px-2">

      <Slider {...settings}>

        {data?.map((movie) => (

          <div
            key={movie._id}
            className="px-3"
          >

            <MovieCard movie={movie} />

          </div>

        ))}

      </Slider>

    </div>

  );

};

export default SliderUtil;

