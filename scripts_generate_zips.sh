#!/usr/bin/env bash
set -euo pipefail

mkdir -p deliverables
rm -f deliverables/version1-basic-static.zip deliverables/version2-localstorage-admin.zip deliverables/version3-express-json.zip deliverables/version4-express-mongo.zip

(cd versions && zip -r ../deliverables/version1-basic-static.zip version1-basic-static >/dev/null)
(cd versions && zip -r ../deliverables/version2-localstorage-admin.zip version2-localstorage-admin >/dev/null)
(cd versions && zip -r ../deliverables/version3-express-json.zip version3-express-json >/dev/null)
(cd versions && zip -r ../deliverables/version4-express-mongo.zip version4-express-mongo >/dev/null)

echo "ZIP files generated in ./deliverables"
ls -lh deliverables/*.zip
