#!/usr/bin/env bash
set -euo pipefail
zip -r one-website.zip one-website >/dev/null
ls -lh one-website.zip
