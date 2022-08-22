/* eslint-disable @typescript-eslint/no-var-requires */
const { join } = require("path");
const fs = require("fs");
const { MAC_PATH, rewrittenCode } = require("./constants.js");

if (!fs.existsSync(MAC_PATH)) {
    console.log("No discord instance found.");
    process.exit();
}
const appVersion = fs.readdirSync(MAC_PATH).find(d => /.*\..*\..*/g.test(d));
const completePath = join(MAC_PATH, appVersion, "modules", "discord_desktop_core", "index.js");

if (fs.readFileSync(completePath).toString().split("\n").length != 1) {
    console.error("Something else is injected.");
    process.exit();
}

fs.writeFileSync(completePath, rewrittenCode);
console.log("Furcord is now injected.");


