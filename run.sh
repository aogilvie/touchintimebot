#! /bin/bash

mkdir -m 777 -p screenshots
docker run \
    --rm \
    --name test-integration \
    --network host \
    -v $(pwd)/screenshots:/app/screenshots \
    -v $(pwd)/script.js:/app/src/index.js \
    -v $(pwd)/config.json:/app/src/config.json \
    asia.gcr.io/qualified-glow-175508/chrombie