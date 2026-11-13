# MIK-HUB Backend

Express + PostgreSQL API. Public `GET` endpoints feed the Svelte site; everything that writes requires the admin cookie.

## Setup
Requires a PostgreSQL database (tables are created automatically on startup). Locally:
```bash
docker run -d --name mikhub-pg -e POSTGRES_USER=mikhub -e POSTGRES_PASSWORD=mikhub -e POSTGRES_DB=mikhub -p 5432:5432 postgres:16
```
```bash
npm install
cp .env.example .env   # set DATABASE_URL (and PGSSL=true on most hosted providers)
npm run hash -- "your-password"   # paste line into .env (ADMIN_PASSWORD_HASH)
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"   # -> JWT_SECRET
npm run seed   # optional starter content
npm run dev
```
### Migrating existing SQLite data
```bash
npm i --no-save better-sqlite3
node src/migrate_from_sqlite.js ./mikhub.db
```

### Deploying
Set `DATABASE_URL`, `JWT_SECRET`, `ADMIN_PASSWORD_HASH`, `CORS_ORIGINS`, `COOKIE_SECURE=true` (and `PGSSL=true` if required) on your host. Images are stored in Cloudflare R2: create a bucket, enable public access (r2.dev URL or custom domain), create an API token with Object Read & Write, and set the `R2_*` variables. No persistent disk is needed.

Frontend must call with `credentials: 'include'`. Image URLs are relative (`/uploads/..`); prefix with the API base URL.

## API  (🔒 = admin only)
| Method | Route | Purpose |
|---|---|---|
| POST | `/api/auth/login` `{password}` / `logout` / GET `me` | Admin session |
| GET | `/api/settings` | All form links, picture URLs and page text |
| 🔒 GET | `/api/settings/schema` | Describes editable fields |
| 🔒 PUT | `/api/settings` | Set Google Form links / text, e.g. `{"form_apply":"https://forms.gle/..","about_body":".."}` |
| 🔒 PUT/DELETE | `/api/settings/:key/image` | Upload (field `image`) / remove picture: `hero_image`, `events_banner_image` |
| GET, 🔒 POST/PUT/DELETE | `/api/carousel[/:id]` | Front-page carousel slides (POST multipart field `images`, up to 10 at once; PUT `/api/carousel` with `{order:[ids]}` reorders) |
| GET | `/api/activities[?status=upcoming\|ongoing\|past&featured=1]` | Events |
| 🔒 POST/PUT/DELETE | `/api/activities[/:id]` | Add / edit / delete event (JSON or multipart with `image`) |
| GET, 🔒 POST/PUT/DELETE | `/api/projects[/:id]` | Projects |
| GET, 🔒 POST/PUT/DELETE | `/api/faqs[/:id]` | FAQ entries |
| 🔒 POST | `/api/upload` | Generic image upload → `{image_url}` |

Form-link settings: `form_apply`, `form_propose_activity`, `form_propose_project` (only Google Forms https links accepted).
Activity fields: `title`, `description`, `date` (YYYY-MM-DD), `status`, `is_featured`, `image`.
Images: JPEG/PNG/WebP/GIF, max 5 MB.

### Moving old local images to R2
Images uploaded before the R2 switch are still served from `uploads/` (`/uploads/...` URLs). To move them: `node src/migrate_uploads_to_r2.js`.
