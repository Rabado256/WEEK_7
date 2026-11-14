import React from 'react';

export default function RepositoryList({
  repos,
  page,
  totalPages,
  loading,
  error,
  onPageChange,
  onRetry,
}) {
  return (
    <div className="repos-section">
      <h3>Public Repositories</h3>
      {loading && <p className="repo-status">Loading repositories...</p>}
      {error && (
        <div className="repo-error" role="alert">
          <span>{error}</span>
          <button type="button" onClick={onRetry}>Try again</button>
        </div>
      )}
      {!loading && !error && repos.length === 0 && (
        <p className="no-repos">No public repositories found.</p>
      )}
      {!loading && !error && repos.length > 0 && (
        <>
          <div className="repos-grid">
            {repos.map((repo) => (
              <div key={repo.id} className="repo-card">
                <h4>
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                    {repo.name}
                  </a>
                </h4>
                <p className="repo-description">
                  {repo.description || 'No description provided.'}
                </p>
                <div className="repo-footer">
                  {repo.language && <span className="repo-lang">🟢 {repo.language}</span>}
                  <span className="repo-stars">⭐ {repo.stargazers_count}</span>
                </div>
              </div>
            ))}
          </div>
          {totalPages > 1 && (
            <nav className="repo-pagination" aria-label="Repository pages">
              <button
                type="button"
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1 || loading}
              >
                Previous
              </button>
              <span>Page {page} of {totalPages}</span>
              <button
                type="button"
                onClick={() => onPageChange(page + 1)}
                disabled={page >= totalPages || loading}
              >
                Next
              </button>
            </nav>
          )}
        </>
      )}
    </div>
  );
}