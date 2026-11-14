import React, { useState, useEffect } from 'react';
import SearchForm from './components/SearchForm';
import ProfileCard from './components/ProfileCard';
import RepositoryList from './components/RepositoryList';
import Loading from './components/Loading';

const REPOS_PER_PAGE = 6;

export default function App() {
  const [searchTerm, setSearchTerm] = useState('octocat'); // Default initial load
  const [searchNonce, setSearchNonce] = useState(0);
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [repoLoading, setRepoLoading] = useState(false);
  const [repoError, setRepoError] = useState(null);
  const [repoPage, setRepoPage] = useState(1);
  const [repoRetry, setRepoRetry] = useState(0);
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    if (!searchTerm) return;

    const controller = new AbortController();
    const fetchGitHubUser = async () => {
      setLoading(true);
      setError(null);

      try {
        const userResponse = await fetch(
          `https://api.github.com/users/${encodeURIComponent(searchTerm)}`,
          { signal: controller.signal },
        );
        if (!userResponse.ok) {
          throw new Error(userResponse.status === 404 ? 'User not found.' : 'Failed to fetch user data.');
        }
        const userData = await userResponse.json();
        setProfile(userData);
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err instanceof Error ? err.message : 'Failed to fetch user data.');
          setProfile(null);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchGitHubUser();
    return () => controller.abort();
  }, [searchTerm, searchNonce]);

  useEffect(() => {
    if (!profile) return;

    const controller = new AbortController();
    const fetchRepositories = async () => {
      setRepoLoading(true);
      setRepoError(null);
      setRepos([]);

      try {
        const response = await fetch(
          `https://api.github.com/users/${encodeURIComponent(profile.login)}/repos?sort=updated&per_page=${REPOS_PER_PAGE}&page=${repoPage}`,
          { signal: controller.signal },
        );
        if (!response.ok) {
          throw new Error('Unable to load public repositories.');
        }
        setRepos(await response.json());
      } catch (err) {
        if (!controller.signal.aborted) {
          setRepos([]);
          setRepoError(err instanceof Error ? err.message : 'Unable to load public repositories.');
        }
      } finally {
        if (!controller.signal.aborted) setRepoLoading(false);
      }
    };

    fetchRepositories();
    return () => controller.abort();
  }, [profile, repoPage, repoRetry]);

  const handleSearch = (username) => {
    const normalizedUsername = username.trim();
    setProfile(null);
    setRepos([]);
    setRepoPage(1);
    setSearchTerm(normalizedUsername);
    setSearchNonce((nonce) => nonce + 1);
    setRecentSearches((searches) => [
      normalizedUsername,
      ...searches.filter((search) => search.toLowerCase() !== normalizedUsername.toLowerCase()),
    ].slice(0, 5));
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Averon GitHub Profile Finder</h1>
        <p className="subtitle">Week 7: React Hooks, API Integration & Async/Await</p>
      </header>

      <SearchForm onSearch={handleSearch} error={error} recentSearches={recentSearches} />

      {loading && <Loading />}

      {!loading && profile && (
        <>
          <ProfileCard profile={profile} />
          <RepositoryList
            repos={repos}
            page={repoPage}
            totalPages={Math.ceil(profile.public_repos / REPOS_PER_PAGE)}
            loading={repoLoading}
            error={repoError}
            onPageChange={setRepoPage}
            onRetry={() => setRepoRetry((retry) => retry + 1)}
          />
        </>
      )}
    </div>
  );
}