import { useState } from 'react';
import SearchIcon from '@/assets/icons/Search.svg';
import CancelIcon from '@/assets/icons/Cancel.svg';

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBox = ({ value, onChange, placeholder = 'Search' }: SearchBoxProps) => {
  return (
    <div className="search-container">
      <div className="search-box">
        <img src={SearchIcon} alt="Search" className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {value && (
          <img 
            src={CancelIcon} 
            alt="Clear" 
            className="search-clear"
            onClick={() => onChange('')}
          />
        )}
      </div>
    </div>
  );
};

export default SearchBox;
