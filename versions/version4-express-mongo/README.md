# Krishna Portfolio Website

A personal portfolio website with:

- Public portfolio page with photo slider and resume/profile links.
- Admin login (`username: me`, `password: 123`).
- Editable content for all portfolio sections.
- Add/remove photos, certificates, profile links, and full content via JSON editor.
- MongoDB-backed storage.

## Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- Vanilla HTML/CSS/JS frontend
- JWT authentication for admin APIs

## Run locally

1. Start MongoDB locally (default: `mongodb://127.0.0.1:27017/krishna_portfolio`).
2. Install dependencies:

```bash
npm install
```

3. (Optional) Create `.env`:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/krishna_portfolio
JWT_SECRET=your-secret
```

4. Start app:

```bash
npm start
```

5. Open:

- Portfolio: `http://localhost:3000/`
- Admin: `http://localhost:3000/admin`

## Notes

- First run auto-seeds your profile data.
- Admin can edit complete content including links, photos, certificates, projects, skills, achievements, and more.
