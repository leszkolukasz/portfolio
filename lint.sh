#!/bin/bash

npx eslint "public/scripts/*.mjs"

if [[ "$?" -eq "0" ]]; then
    touch ".js-ok"
else
    rm ".js-ok" 2> /dev/null
fi

exit 0