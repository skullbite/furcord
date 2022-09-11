/* eslint-disable @typescript-eslint/no-var-requires */
const { join } = require("path");
const { homedir } = require("os");

exports.green = string => `\x1b[32m${string}\x1b[0m`;
exports.red = string => `\x1b[31m${string}\x1b[0m`;
exports.blue = string => `\x1b[34m${string}\x1b[0m`;
exports.BASE_DIR = join(__dirname, "..");
exports.rewrittenCode = `require('${join(exports.BASE_DIR, "build", "uwu.min.js")}');\nmodule.exports = require('./core.asar');`;

// olykir a real one fr
exports.PATHS = {
    win32: {
        stable: "Discord",
        ptb: "DiscordPTB",
        canary: "DiscordCanary"
    },
    linux: {
        stable: [
            "/usr/share/discord",
            "/usr/lib64/discord",
            "/opt/discord"
        ],
        ptb: [
            "/usr/share/discord-ptb",
            "/usr/lib64/discord-ptb",
            "/opt/discord-ptb"
        ],
        canary: [
            "/usr/share/discord-canary",
            "/usr/lib64/discord-canary",
            "/opt/discord-canary"
        ]
    },
    darwin: {
        stable: homedir() + "/Library/Application Support/discord",
        ptb: homedir() + "/Library/Application Support/discordptb",
        canary: homedir() + "/Library/Application Support/discordcanary"
    }
};