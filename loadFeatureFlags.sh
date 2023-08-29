#!/usr/bin/env bash

LD_DATA=$(cat featureFlags.json)
ESCAPED_LD_DATA=$(jq '@json' <<< "${LD_DATA}")
KV_JSON_DATA=$(cat << JSON
[
  {
    "key": "LD-Env-444444444444444444444444",
    "value": ${ESCAPED_LD_DATA}
  }
]
JSON
)
echo "${KV_JSON_DATA}" | npx wrangler kv:bulk put /dev/stdin --local --binding LAUNCH_DARKLY_KV --preview
