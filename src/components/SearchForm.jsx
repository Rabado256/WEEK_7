import React, { useState } from 'react';

export default function SearchForm({ onSearch, error, recentSearches }) {
  const [username, setUsername] = useState('');
  const [validationError, setValidationError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() === '') {
      setValidationError('Please enter a GitHub username.');
      return;
    }
    setValidationError(null);
    onSearch(username.trim());
  };

  return (
    <div className="search-section">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter GitHub username (e.g., octocat)..."
          aria-label="GitHub username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            if (e.target.value.trim()) setValidationError(null);
          }}
        />
        <button type="submit">Search</button>
      </form>
      {validationError && <div className="error-message" role="alert">{validationError}</div>}
      {error && <div className="error-message">❌ {error}</div>}
      {recentSearches.length > 0 && (
        <div className="recent-searches">
          <span>Recent searches:</span>
          {recentSearches.map((search) => (
            <button
              key={search}
              type="button"
              onClick={() => {
                setUsername(search);
                setValidationError(null);
                onSearch(search);
              }}
            >
              {search}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}