# Download guide for all portfolio versions

To avoid PR errors like **"Binary files are not supported"**, ZIP files are generated locally.

## Step 1: Generate ZIP files

From project root:

```bash
./scripts_generate_zips.sh
```

This creates:
- `deliverables/version1-basic-static.zip`
- `deliverables/version2-localstorage-admin.zip`
- `deliverables/version3-express-json.zip`
- `deliverables/version4-express-mongo.zip`

## Step 2: Download by clicking links

Open this file in browser:

- `deliverables/index.html`

Then click the "Click here" link for each version.

## Step 3: Run after download

### Version 1 (basic static)
Unzip and open `index.html`.

### Version 2 (localStorage admin)
```bash
cd version2-localstorage-admin
python3 -m http.server 8080
```
Open `http://localhost:8080/public/`.
Login: `me` / `123`.

### Version 3 (Express + JSON)
```bash
cd version3-express-json
npm install
npm start
```
Open `http://localhost:3001/`.
Login: `me` / `123`.

### Version 4 (Express + MongoDB)
```bash
cd version4-express-mongo
npm install
npm start
```
Requires local MongoDB running on `mongodb://127.0.0.1:27017/krishna_portfolio`.
Open `http://localhost:3000/` and `http://localhost:3000/admin`.
Login: `me` / `123`.
