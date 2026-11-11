# MIK-HUB Backend

Express + SQLite API. Public `GET` endpoints feed the Svelte site; everything that writes requires the admin cookie.

## Setup
```bash
npm install
cp .env.example .env
npm run hash -- "your-password"   # paste line into .env (ADMIN_PASSWORD_HASH)
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"   # -> JWT_SECRET
npm run seed   # optional starter content
npm run dev
```
Frontend must call with `credentials: 'include'`. Image URLs are relative (`/uploads/..`); prefix with the API base URL.

## API  (🔒 = admin only)
| Method | Route | Purpose |
|---|---|---|
| POST | `/api/auth/login` `{password}` / `logout` / GET `me` | Admin session |
| GET | `/api/settings` | All form links, picture URLs and page text |
| 🔒 GET | `/api/settings/schema` | Describes editable fields |
| 🔒 PUT | `/api/settings` | Set Google Form links / text, e.g. `{"form_apply":"https://forms.gle/..","about_body":".."}` |
| 🔒 PUT/DELETE | `/api/settings/:key/image` | Upload (field `image`) / remove picture: `hero_image`, `events_banner_image` |
| GET | `/api/activities[?status=upcoming\|ongoing\|past&featured=1]` | Events |
| 🔒 POST/PUT/DELETE | `/api/activities[/:id]` | Add / edit / delete event (JSON or multipart with `image`) |
| GET, 🔒 POST/PUT/DELETE | `/api/projects[/:id]` | Projects |
| GET, 🔒 POST/PUT/DELETE | `/api/faqs[/:id]` | FAQ entries |
| 🔒 POST | `/api/upload` | Generic image upload → `{image_url}` |

Form-link settings: `form_apply`, `form_propose_activity`, `form_propose_project` (only Google Forms https links accepted).
Activity fields: `title`, `description`, `date` (YYYY-MM-DD), `status`, `is_featured`, `image`.
Images: JPEG/PNG/WebP/GIF, max 5 MB.
