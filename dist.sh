mkdir dist || true

alias babel="npm-exec babel-cli"

$(npm bin)/babel src/index.js --out-file dist/index.js
