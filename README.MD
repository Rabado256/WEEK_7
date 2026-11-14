# Averon Academy — Week 7: GitHub Profile Finder

A dynamic React application built with Vite that connects to the official GitHub REST API to search users, display public profiles, track repository stats, and handle asynchronous loading and error states.

---

## 🚀 Features
1. **API Integration:** Connects seamlessly to `https://api.github.com/users/{username}` using `async/await` and `fetch`.
2. **React Hooks:** Leverages `useState` for state management and `useEffect` for side-effect synchronization.
3. **Robust Error Handling:** Displays friendly warning indicators when a username does not exist or network requests fail.
4. **Modular Components:** Organized into separate components (`SearchForm`, `ProfileCard`, `RepositoryList`, `Loading`).
5. **Responsive Design:** Clean, modern UI styled with custom CSS supporting mobile and desktop screens.
6. **Recent Searches:** Quickly revisit up to five previously searched usernames.
7. **Repository Pagination:** Browse public repositories six at a time.
8. **Repository Error Handling:** See a clear message and retry if repositories cannot be loaded.

---

## 💻 How to Run Locally
1. Clone or download this repository.
2. Navigate to your project directory in the terminal (`week-07/`).
3. Install dependencies:
   ```bash
   npm install