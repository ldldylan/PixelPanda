import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './SearchResult.css';

const SearchResultContext = React.createContext();

export function SearchResultProvider({ children }) {
  const searchRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(searchRef.current);
  }, [])

  return (
    <>
      <SearchResultContext.Provider value={value}>
        {children}
      </SearchResultContext.Provider>
      <div ref={searchRef} />
    </>
  );
}

export function SearchResult({ onClose, children }) {
  const searchResultNode = useContext(SearchResultContext);
  if (!searchResultNode) return null;

  return ReactDOM.createPortal(
    <div id="searchResult">
      <div id="searchResult-background" onClick={onClose} />
      <div id="searchResult-content">
      {/* <div id="x" onClick={onClose}>x</div> */}
        {children}
      </div>
    </div>,
    searchResultNode
  );
}