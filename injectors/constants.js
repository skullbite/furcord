/* eslint-disable @typescript-eslint/no-var-requires */
const { join } = require("path");
const { homedir } = require("os");

exports.BASE_DIR = join(__dirname, "..");
exports.rewrittenCode = `require('${join(exports.BASE_DIR, "build", "patcher.js")}');\nmodule.exports = require('./core.asar');`;
exports.MAC_PATH = join(homedir(), "Library", "Application Support", "discord");