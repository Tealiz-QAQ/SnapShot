import React, { useState, useEffect } from 'react';
import './index.css';
import placeholderToken from './assets/question-mark.png';

const tokensULR = {
  Ethereum: 'https://raw.githubusercontent.com/viaprotocol/tokenlists/main/tokenlists/ethereum.json',
  Arbitrum: 'https://raw.githubusercontent.com/viaprotocol/tokenlists/main/tokenlists/arbitrum.json',
  Optimism: 'https://raw.githubusercontent.com/viaprotocol/tokenlists/main/tokenlists/optimism.json',
  Bsc: 'https://raw.githubusercontent.com/viaprotocol/tokenlists/main/tokenlists/bsc.json',
};

const Loading = () => {
  return <div className="loading"></div>;
};

function App() {
  const [category, setCategory] = useState('Ethereum');
  const [searchTerm, setSearchTerm] = useState('');
  const [tokens, setTokens] = useState([]);
  const [errorTokens, setErrorTokens] = useState([]);
  const [filteredTokens, setFilteredTokens] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [loadedTokens, setLoadedTokens] = useState([]);
  const [hoveredToken, setHoveredToken] = useState(null);

  useEffect(() => {
    const fetchTokens = async () => {
      setLoading(true);
      setLoadedTokens([]);
      setMessage('');

      try {
        const response = await fetch(tokensULR[category]);
        const data = await response.json();
        setTokens(data);
        setFilteredTokens(data);
      } catch (error) {
        setMessage('Failed to load tokens');
      }

      setLoading(false);
    };

    fetchTokens();
  }, [category]);

  const handleClick = (newcategory) => {
    setCategory(newcategory);
    setSearchTerm('');
  };

  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => {
      if (searchTerm) {
        const searchResults = tokens.filter(
          (token) =>
            token.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
            token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            token.address.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredTokens(searchResults);
        setMessage(searchResults.length ? '' : 'No Tokens Found');
      } else {
        setFilteredTokens(tokens);
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

  const handleMouseEnter = (token) => {
    setHoveredToken(token);
  };

  const handleMouseLeave = () => {
    setHoveredToken(null);
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
                <div
                  key={index}
                  className="token-container"
                  onMouseEnter={() => handleMouseEnter(token)}
                  onMouseLeave={handleMouseLeave}
                >
                  <img
                    src={token.logoURI}
                    alt={`${category} ${token.name}`}
                    className={loadedTokens.includes(index) || errorTokens.includes(index) ? 'loaded' : ''}
                    onLoad={() => handleTokenLoad(index)}
                    onError={(e) => {
                      e.target.src = placeholderToken;
                      handleTokenError(index);
                    }}
                  />
                  {hoveredToken === token && (
                    <div className="token-info">
                      <p><strong>Name:</strong> {token.name}</p>
                      <p><strong>Logo URI:</strong> <a href={token.logoURI} target="_blank" rel="noopener noreferrer">Open Image</a></p>
                    </div>
                  )}
                </div>
              ))
              : null}
        </div>
      </main>
    </header>
  );
}

export default App;
