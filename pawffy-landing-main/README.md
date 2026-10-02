# The Pawffy landing page

A static-friendly Next.js landing page with separate, searchable legal pages for users, vendors, and privacy.

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Pages

- `/` — landing page
- `/legal/user-terms`
- `/legal/vendor-terms`
- `/legal/privacy-policy`

Legal copy is sourced from the provided DOCX files and stored as text in `content/legal`.
