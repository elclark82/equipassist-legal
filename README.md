# EquipAssist Legal Site

Public legal-document site for EquipAssist. This repository intentionally contains only static legal-site files and public legal text.

## Local Source

Canonical documents are maintained in the adjacent private application repository:

```text
../EquipAssist-local/docs/
```

Synchronize current documents with:

```bash
node scripts/sync-legal-docs.mjs
```

The command creates Jekyll pages with stable public routes and copies the unmodified Markdown into `source/` for auditability.

## Public Routes

- `/privacy.html`
- `/terms.html`
- `/data-deletion.html`
- `/borrowing-terms.html`

## Deployment

GitHub Pages should deploy from the `main` branch root. The intended custom domain is `legal.equipassist.net`.

Do not place application source, credentials, environment files, exports, user data, or private operational documentation in this repository.
