# Downloadable ZIP builds

Binary ZIP files are **generated locally** (not committed), to avoid PR tooling errors like:
`Binary files are not supported`.

## Generate all ZIPs

From project root:

```bash
./scripts_generate_zips.sh
```

This creates:

1. `deliverables/version1-basic-static.zip`
2. `deliverables/version2-localstorage-admin.zip`
3. `deliverables/version3-express-json.zip`
4. `deliverables/version4-express-mongo.zip`

## Click-to-download page

After generating ZIPs, open `deliverables/index.html` in browser and click the links.
