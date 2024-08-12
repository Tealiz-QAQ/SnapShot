import React, { useState, useEffect } from 'react';
import './index.css';
import ethereumTokens from './token/ethereum.json';
import arbitrumTokens from './token/arbitrum.json';
import optimismTokens from './token/optimism.json';
import bscTokens from './token/bsc.json';
import placeholderToken from './assets/question-mark.png';

const tokens = {
  Ethereum: ethereumTokens,
  Arbitrum: arbitrumTokens,
  Optimism: optimismTokens,
  Bsc: bscTokens,
};

const Loading = () => {
  return <div className="loading"></div>;
};

function App() {
  const [category, setCategory] = useState('Ethereum');
  const [searchTerm, setSearchTerm] = useState('');
  const [errorTokens, setErrorTokens] = useState([]);
  const [filteredTokens, setFilteredTokens] = useState(tokens[category] || []);
  const [message, setMessage] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [loadedTokens, setLoadedTokens] = useState([]);

  useEffect(() => {
    setLoading(true);
    setLoadedTokens([]);
    setFilteredTokens(tokens[category]);
    setMessage('');
    setTimeout(() => {
      setLoading(false); // Đặt lại isLoading thành false sau khi tải xong
    }, 1000);
  }, [category]);

  const handleClick = (newcategory) => {
    setCategory(newcategory);
    setSearchTerm('');
    setFilteredTokens(tokens[newcategory]);
    setMessage('');
  };

  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => {
      if (searchTerm) {
        const searchResults = tokens[category].filter(
          (token) =>
            token.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
            token.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredTokens(searchResults);
        setMessage(searchResults.length ? '' : 'No Tokens Found');
      } else {
        setFilteredTokens(tokens[category]);
        setMessage('');
      }
      setLoading(false);
    }, 1000);
  };

  const handleTokenLoad = (index) => {
    setLoadedTokens((prev) => [...prev, index]);
  };

  const handleTokenError = (index) => {
    setErrorTokens((prev) => [...prev, index]);
    handleTokenLoad(index);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <header>
      <h1>SnapShot</h1>
      <div className="search-contain">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button type="submit" onClick={handleSearch}>
          <svg height="32" width="32">
            <path
              d="M19.427 21.427a8.5 8.5 0 1 1 2-2l5.585 5.585c.55.55.546 1.43 0 1.976l-.024.024a1.399 1.399 0 0 1-1.976 0l-5.585-5.585zM14.5 21a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13z"
              fill="#FFFFFF"
              fillRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <nav>
        <button onClick={() => handleClick('Ethereum')}>Ethereum</button>
        <button onClick={() => handleClick('Arbitrum')}>Arbitrum</button>
        <button onClick={() => handleClick('Optimism')}>Optimism</button>
        <button onClick={() => handleClick('Bsc')}>Bsc</button>
      </nav>
      <main>
        <h2>{filteredTokens.length > 0 ? `${category} Tokens` : message}</h2>
        <div className="gallery">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => <Loading key={index} />)
            : filteredTokens.length > 0
              ? filteredTokens.map((token, index) => (
                <img
                  key={index}
                  src={token.logoURI}
                  alt={`${category} ${token.name}`}
                  className={`token-container ${loadedTokens.includes(index) || errorTokens.includes(index) ? 'loaded' : ''}`}
                  onLoad={() => handleTokenLoad(index)}
                  onError={(e) => {
                    e.target.src = placeholderToken;
                    handleTokenError(index);  // Gọi handleTokenError khi gặp lỗi
                  }}
                />
              ))
              : null}
        </div>
      </main>
    </header>
  );
}

export default App;
