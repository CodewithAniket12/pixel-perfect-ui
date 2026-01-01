import { useNavigate } from 'react-router-dom';
import backIcon from '../assets/icons/Back.svg';

function Header({ title }) {
  var navigate = useNavigate();

  return (
    <div className="books-header">
      <button
        type="button"
        className="back-button"
        onClick={function() { navigate('/'); }}
      >
        <img src={backIcon} alt="Back" />
      </button>
      <span className="books-title">{title}</span>
    </div>
  );
}

export default Header;
