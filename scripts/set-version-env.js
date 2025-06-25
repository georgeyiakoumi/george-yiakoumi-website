const fs = require("fs");
const path = require("path");
const pkg = require("../package.json");

const envPath = path.join(__dirname, "../.env.production");
fs.writeFileSync(envPath, `REACT_APP_VERSION=${pkg.version}\n`);

console.log(`✔️ Injected version ${pkg.version} into .env.production`);