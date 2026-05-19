import Header from "./Movies/Header";
import MoviesContainerPage from "./Movies/MoviesContainerPage";

const Home = () => {
  return (
    <>
      {/* HEADER */}

      <Header />

      {/* HERO SECTION */}

      <div className="hero-section">

        <div className="hero-overlay">

          <h1>
            Unlimited Movies, TV Shows & More
          </h1>

          <p>
            Watch Trending Kannada, Telugu,
            Hindi & English Movies
          </p>

          <button>
            Watch Now
          </button>

        </div>

      </div>

      {/* MOVIES */}

      <div className="w-full pt-10 pb-20">

        <MoviesContainerPage />

      </div>

    </>
  );
};

export default Home;