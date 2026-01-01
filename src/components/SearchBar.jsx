import searchIcon from '../assets/icons/Search.svg';

function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <img src={searchIcon} alt="Search" className="search-icon" />
      <input
        type="text"
        placeholder="Search"
        value={value || ''}
        onChange={onChange}
        className="search-input"
      />
    </div>
  );
}

export default SearchBar;
