# MIK-HUB — Official Website

> The digital home of MIK-HUB Special College — a student-led initiative at [University Name] dedicated to developing the next generation of builders, researchers, and innovators.

---

## What is MIK-HUB?

MIK-HUB is a Special College within [University Name] focused on bridging the gap between academic learning and real-world skills. We run workshops, hackathons, and maintain an active internship and research pipeline — giving students the hands-on experience that classrooms alone can't provide.

This website is our portfolio and our front door: a place where current members, prospective students, and partners can see who we are, what we've built, and where we're headed.

---

## Site Structure

| Route | Description |
|---|---|
| `/` | **Home** — Upcoming events, current initiatives, and what we're working on right now |
| `/about` | **About** — Our mission, vision, and values |
| `/events` | **Events** — Past workshops, hackathons, and programs with photo slideshows |
| `/projects` | **Projects** — Showcase of member projects and research |
| `/join` | **Join Us** — Open membership positions and links to application forms |
| `/careers` | **Careers** — Internship and research pipeline opportunities |
| `/founders` | **Founders** — The people who started it all |

---

## Backend development
The backend will soon be implemented in a seperate folder within the same repo. It will be a Node.js + Express API that serves data to the frontend. The backend will handle:
- file uploads for event photos and project showcases
- user authentication for members and admins
- event management (creating, updating, deleting events)
- project management (creating, updating, deleting projects)
- uploading links to Google Forms for membership applications and other forms

## Planned Sections (Rebrand Roadmap)

The site is currently being refactored. Here's what the new version will include:

- **Hero / Landing** — Current events, upcoming workshops and hackathons, live announcements
- **About** — Mission statement, vision, and core values
- **Past Events** — Slideshow gallery of previous events with recaps
- **Join Us** — Active membership roles with Google Form links to apply
- **FAQ** — Common questions about membership, events, and what MIK-HUB does

---

## Tech Stack

- [Svelte](https://svelte.dev/) — Frontend framework
- [Vite](https://vitejs.dev/) — Build tool
- [SvelteKit-style routing](https://kit.svelte.dev/) via file-based routes in `src/routes/`

---

## Getting Started

### Prerequisites

- Node.js v18+
- npm

### Installation

```bash
# Clone the repo
git clone https://github.com/[your-org]/mikhub-website.git
cd mikhub-website/frontend

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The site will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
npm run preview
```

---

## Contributing

This project is maintained by MIK-HUB members. If you're a member and want to contribute:

1. Fork the repo and create a feature branch (`git checkout -b feature/your-feature`)
2. Make your changes and commit (`git commit -m 'Add: your feature'`)
3. Push to your branch and open a Pull Request

Please keep PRs focused — one feature or fix per PR.

---

## Apply / Get Involved

Interested in joining MIK-HUB? Applications for open positions are handled through Google Forms — visit the [Join Us](#) page on the website for current openings.

---

## License

This project is the property of MIK-HUB Special College, [University of Pecs]. All rights reserved.