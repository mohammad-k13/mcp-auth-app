# Vault Auth App

Next.js App Router project with a polished login page, shadcn/ui, and a simple JWT authentication system.

## Features

- Login page at `/`
- Protected dashboard at `/dashboard`
- JWT auth via `jose` (HS256)
- HttpOnly cookie session
- Middleware route protection
- Demo users for local testing
- Quick notes (create / delete via API, persisted per user)
- Tasks (create / toggle / delete via API, persisted per user)

## Project structure

```text
src/
  app/
    page.tsx                 # Login (start route)
    dashboard/page.tsx       # Protected page
    api/
      auth/
        login/route.ts
        logout/route.ts
        me/route.ts
      notes/
        route.ts             # GET list, POST create
        [id]/route.ts        # DELETE
      tasks/
        route.ts             # GET list, POST create
        [id]/route.ts        # PATCH toggle, DELETE
    layout.tsx
    globals.css
  components/
    auth/
      login-form.tsx
      dashboard-view.tsx
    dashboard/
      notes-panel.tsx
      tasks-panel.tsx
    ui/                      # shadcn components
  lib/
    auth/                    # JWT, session, users, schemas
    store/                   # JSON file store helpers
  middleware.ts
data/
  store.json                 # local persisted notes/tasks (gitignored)
```

## Demo credentials

- `demo@vault.app` / `password123`
- `admin@vault.app` / `admin123`

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Optional: set `JWT_SECRET` in `.env.local` for a custom signing key.

## Auth API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/login` | Sign in and set JWT cookie |
| `POST` | `/api/auth/logout` | Clear JWT cookie |
| `GET`  | `/api/auth/me` | Return current user from JWT |

## Notes & tasks API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/notes` | List current user notes |
| `POST` | `/api/notes` | Create a note `{ title, body }` |
| `DELETE` | `/api/notes/:id` | Delete a note |
| `GET` | `/api/tasks` | List current user tasks |
| `POST` | `/api/tasks` | Create a task `{ title }` |
| `PATCH` | `/api/tasks/:id` | Toggle completed |
| `DELETE` | `/api/tasks/:id` | Delete a task |
