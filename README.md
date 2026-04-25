# 🔍 GitHub User Finder

A modern, responsive GitHub profile explorer built with **React + Vite + Tailwind CSS**.

Search any GitHub username and instantly see their profile, stats, and repositories.

---
For Testing Purpose You Can Visit :- https://githubuserfinderbysoumik.netlify.app/

## ✨ Features

- 🔍 Search any GitHub username
- 👤 Full profile card (avatar, bio, location, company, social links)
- 📁 Repository list sorted by stars with language colors
- 💀 Skeleton loading UI while fetching
- ❌ Contextual error states (404, rate limit, network)
- 🌙 Dark / light mode toggle
- 🕓 Last 5 searches persisted in `localStorage`
- ⌨️ Keyboard support (Enter to search)
- 📱 Fully responsive

---

## 🗂 Project Structure

```
github-user-finder/
├── index.html                  # Vite HTML entry
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── src/
    ├── main.jsx                # React root mount
    ├── App.jsx                 # Root component
    ├── styles/
    │   └── index.css           # Global styles + design tokens
    ├── utils/
    │   ├── constants.js        # API URL, limits, featured users, lang colors
    │   └── helpers.js          # Formatting, localStorage, error classifier
    ├── hooks/
    │   ├── useGithub.js        # Fetch user + repos, error handling
    │   ├── useHistory.js       # localStorage search history
    │   └── useDebounce.js      # Debounce utility hook
    └── components/
        ├── SearchBar.jsx       # Input + button + validation
        ├── UserCard.jsx        # Profile card
        ├── RepoList.jsx        # Repository list with show more/less
        ├── ErrorCard.jsx       # Error display (4 types)
        ├── LandingHero.jsx     # Default screen before search
        ├── DarkModeToggle.jsx  # Animated pill toggle
        └── Skeleton.jsx        # Shimmer loading placeholders
```

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for production

```bash
npm run build
npm run preview
```

---

## 🛠 Tech Stack

| Tool | Purpose |
|------|---------|
| **React 18** | UI with functional components + hooks |
| **Vite 5** | Fast dev server + bundler |
| **Tailwind CSS 3** | Utility-first styling |
| **Axios** | HTTP requests to GitHub API |

---

## ⚡ GitHub API

This app uses the **GitHub REST API v3** (unauthenticated):

- `GET /users/{username}` — profile data
- `GET /users/{username}/repos?per_page=100&sort=pushed` — repositories

**Rate limit:** 60 requests/hour unauthenticated. To increase this, add a personal access token as an Axios default header in `src/hooks/useGithub.js`:

```js
axios.defaults.headers.common['Authorization'] = `token YOUR_TOKEN`
```

---

## 📦 Available Scripts

| Command | Action |
|---------|--------|
| `npm run dev` | Start dev server at localhost:5173 |
| `npm run build` | Build for production → `dist/` |
| `npm run preview` | Preview production build locally |

---

## 🎨 Design System

Design tokens are defined as CSS variables in `src/styles/index.css`:

```css
--color-void:    #060910   /* Page background */
--color-surface: #0d1117   /* Card background */
--color-panel:   #161b22   /* Elevated surface */
--color-border:  #21262d   /* Borders */
--color-accent:  #58a6ff   /* Interactive blue */
--color-glow:    #1f6feb   /* Glow / gradient blue */
--color-muted:   #8b949e   /* Secondary text */
```

---

## 📄 License

MIT — free for personal and commercial use.
