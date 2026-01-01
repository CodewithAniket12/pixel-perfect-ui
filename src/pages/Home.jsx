import GenreCard from '../components/GenreCard';
import { genres } from '../data/genres';
import PatternSvg from '../assets/icons/Pattern.svg';

var Home = function() {
  return (
    <div className="home-container">
      <img src={PatternSvg} alt="" className="home-pattern" />
      <div className="home-content">
        <h1 className="home-title">Gutenberg Project</h1>
        <p className="home-description">
          A social cataloging website that allows you to freely search its database of books, annotations, and reviews.
        </p>
        <div className="genres-grid">
          {genres.map(function(genre) {
            return (
              <GenreCard
                key={genre.id}
                name={genre.name}
                icon={genre.icon}
                path={genre.path}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
