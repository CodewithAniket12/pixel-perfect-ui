import { Link } from 'react-router-dom';
import NextIcon from '@/assets/icons/Next.svg';

interface GenreCardProps {
  name: string;
  icon: string;
  path: string;
}

const GenreCard = ({ name, icon, path }: GenreCardProps) => {
  return (
    <Link to={path} className="genre-card">
      <img src={icon} alt={name} className="genre-card-icon" />
      <span className="genre-card-name">{name}</span>
      <img src={NextIcon} alt="Go" className="genre-card-arrow" />
    </Link>
  );
};

export default GenreCard;
