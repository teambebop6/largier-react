#!/usr/bin/env bash

echo "$ECOSYSTEM_CONFIG_JS" > ecosystem.config.js
cp ecosystem.config.js dist/

[ ! -d "src/largier-secret" ] && mkdir -p src/largier-secret
echo "$CONFIG_DEV" > src/largier-secret/development.js
echo "$CONFIG_PROD" > src/largier-secret/production.js
