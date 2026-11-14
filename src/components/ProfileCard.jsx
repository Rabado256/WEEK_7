import React from 'react';

export default function ProfileCard({ profile }) {
  return (
    <div className="profile-card">
      <div className="profile-header">
        <img src={profile.avatar_url} alt={profile.login} className="avatar" />
        <div className="profile-titles">
          <h2>{profile.name || profile.login}</h2>
          <a href={profile.html_url} target="_blank" rel="noopener noreferrer" className="username-link">
            @{profile.login}
          </a>
        </div>
      </div>

      <p className="bio">{profile.bio || "This profile has no public bio available."}</p>

      <div className="profile-meta">
        {profile.location && <span>📍 {profile.location}</span>}
        {profile.company && <span>🏢 {profile.company}</span>}
      </div>

      <div className="profile-stats">
        <div className="stat-box">
          <span className="stat-number">{profile.public_repos}</span>
          <span className="stat-label">Repos</span>
        </div>
        <div className="stat-box">
          <span className="stat-number">{profile.followers}</span>
          <span className="stat-label">Followers</span>
        </div>
        <div className="stat-box">
          <span className="stat-number">{profile.following}</span>
          <span className="stat-label">Following</span>
        </div>
      </div>

      <a href={profile.html_url} target="_blank" rel="noopener noreferrer" className="profile-btn">
        View GitHub Profile
      </a>
    </div>
  );
}