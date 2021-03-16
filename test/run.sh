#!/usr/bin/env bash

configs=$(find ./test/ -name "*.eleventy.js")

for config in $configs
do
    file=$(basename $config)
    name="${file%.eleventy.js}"
    slug="${name:-default}"
    npx eleventy --config $config --input test/templates --output test/snapshots/$slug/ --quiet
done
