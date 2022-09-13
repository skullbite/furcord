/* eslint-disable @typescript-eslint/no-var-requires */
const { join } = require("path");
const fs = require("fs");
const { rewrittenCode, PATHS, blue, green, red } = require("./constants.js");
const package = require("../package.json");

const { platform, env, argv } = process;

const uninject = argv.includes("--uninject");
const unPrefix = uninject ? "un" : "";
console.log(`${blue("|")} Furcord v${package.version}\n${blue("|")} Detected OS: ${process.platform}`);
let target = "stable";
const altTarget = ["--stable", "--ptb", "--canary"].find(flag => argv.some(arg => arg.toLowerCase() === flag));
if (altTarget && ["--stable", "--ptb", "--canary"].some(flag => flag === altTarget.toLowerCase())) target = altTarget.toLowerCase().replace("--", "");

if (!fs.existsSync(join(__dirname, "..", "build")) || !fs.existsSync(join((__dirname, "..", "node_modules")))) {
    console.error(red("|") + " Missing dependencies. Please read the README.md installation section.");
    process.exit();
}

let path = PATHS[platform][target];
if (platform === "linux") { 
    path = path.find(p => fs.existsSync(p));
    if (!path) {
        console.error(`${red("|")} No discord${target !== "stable" ? `-${target}` : ""} installation found.`);
        process.exit();
    }
}

if (platform === "win32") path = join(env.LOCALAPPDATA, path);

if (!fs.existsSync(path)) {
    console.error(`${red("|")} No discord${target !== "stable" ? `-${target}` : ""} installation found.`);
    process.exit();
}

const appVersion = fs.readdirSync(path).find(d => /.*\..*\..*/g.test(d));
const completePath = join(path, appVersion, "modules", "discord_desktop_core", "index.js");

const coreIndex = fs.readFileSync(completePath, "utf8");
if (coreIndex.split("\n").length != 1) {
    if (!uninject) { 
        if (coreIndex.includes(rewrittenCode)) console.error(red("|") + " Furcord is already injected.");
        else console.error(red("|") + " A different client mod is already injected. Furcord can't work in tandem with other mods, uninject the other mod and try again.");
        process.exit(); 
    }
}
else {
    if (uninject) { 
        console.error(red("|") + " Nothing's injected...");
        process.exit();
    }
}

if (!uninject && !fs.existsSync(join(__dirname, "..", "addons"))) {
    console.log(blue("|") + " Creating extra folders...");
    fs.mkdirSync(join(__dirname, "..", "addons"));
    fs.mkdirSync(join(__dirname, "..", "addons", "plugins"));
    fs.mkdirSync(join(__dirname, "..", "addons", "themes"));
}
fs.writeFile(completePath, uninject ? "module.exports = require('./core.asar');" : rewrittenCode, (err) => {
    if (err) {
        console.error(`${red("|")} Failed to ${unPrefix}inject furcord.${platform === "linux" ? " You might need to use sudo." : ""}`);
    }
    else console.log(`${green("|")} Furcord successfully ${unPrefix}injected. Be sure to restart discord${target !== "stable" ? `-${target}` : ""}.`);
});



