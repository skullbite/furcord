/* eslint-disable @typescript-eslint/no-var-requires */
import * as electron from "electron/renderer";
import Furcord from "../core";
import ConfigHandler from "../core/config";
import { readFileSync, readFile, watchFile } from "fs";
import { join } from "path";
import { SETTINGS_PATH } from "../utils/constants";

const dPre = process.env.DISCORD_PRE;
if (dPre) require(dPre);

const eWin = (electron.webFrame.top as any).context;

require("module").Module.globalPaths.push(join(__dirname, "..", "nowode_mowoduwules"));
require("module")._extensions[".css"] = (module, filename) => {
    const content = readFileSync(filename).toString();
    const style = document.createElement("style");
    style.className = "IMPORTED-FC-CSS-OWO";
    style.textContent = content;
    document.head.appendChild(style);
    module.exports = () => document.head.removeChild(style);
};

// electron.webFrame.executeJavaScript(readFileSync(join(BASE_DIR, "build", "core", "index.js"), "utf8"));



function loadFurcord() {
    if (!eWin.webpackChunkdiscord_app) {
        setTimeout(loadFurcord, 10);
        return;
    }
    for (const winVar of ["webpackChunkdiscord_app", "DiscordSentry", "__SENTRY__", "console"]) Object.defineProperty(window, winVar, { get: () => eWin[winVar] });
    eWin.furcord = new Furcord();
    eWin.require = require;
    Object.defineProperty(window, "furcord", { get: () => eWin.furcord });
    eWin.furcord.runStartup();

    const quickCSS = document.createElement("style");
    quickCSS.id = "FC-QUICK-CSS";
    if (ConfigHandler.getExt("useQuickCSS", true, "FC.core")) quickCSS.textContent = readFileSync(join(SETTINGS_PATH, "quick.css")).toString();
    document.head.appendChild(quickCSS);
    watchFile(join(SETTINGS_PATH, "quick.css"), {
        interval: 5
    }, () => {
        if (!ConfigHandler.getExt("useQuickCSS", true, "FC.core")) return;
        readFile(join(SETTINGS_PATH, "quick.css"), (e, d) => {
            const data = d.toString();
            if (data !== quickCSS.textContent) quickCSS.textContent = data;
        });
    });
}

/*if (eWin.document.readyState === "loading") window.document.addEventListener("DOMContentLoaded", loadFurcord);
else loadFurcord();*/

setTimeout(loadFurcord, 10e3);