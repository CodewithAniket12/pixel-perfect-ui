import SearchIcon from '@/assets/icons/Search.svg';
import CancelIcon from '@/assets/icons/Cancel.svg';

const SearchBox = function(props) {
  var value = props.value;
  var onChange = props.onChange;
  var placeholder = props.placeholder || 'Search';

  return (
    <div className="search-container">
      <div className="search-box">
        <img src={SearchIcon} alt="Search" className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={value}
          onChange={function(e) { onChange(e.target.value); }}
        />
        {value && (
          <img 
            src={CancelIcon} 
            alt="Clear" 
            className="search-clear"
            onClick={function() { onChange(''); }}
          />
        )}
      </div>
    </div>
  );
};

export default SearchBox;
