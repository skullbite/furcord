import { join } from "path";

require("module").Module.globalPaths.push(join(__dirname, "..", "nowode_mowoduwules"));
require("module")._extensions[".css"] = (module, filename) => {
    const content = readFileSync(filename, "utf8");
    const style = document.createElement("style");
    style.className = "IMPORTED-FC-CSS-OWO";
    style.textContent = content;
    document.head.appendChild(style);
    module.exports = () => document.head.removeChild(style);
};

import * as electron from "electron/renderer";
import { readFileSync, readFile, watchFile, existsSync, writeFileSync } from "fs";
import * as paths from "./_constants";
import * as extConfig from "./extconfig";
import ipc from "./ipc/renderer";

const dPre = process.env.DISCORD_PRE;
if (dPre) require(dPre);

electron.contextBridge.exposeInMainWorld("FurcordNative", ipc);
electron.contextBridge.exposeInMainWorld("__fileUtils", { existsSync, join, paths });
electron.contextBridge.exposeInMainWorld("extConfig", extConfig);
electron.webFrame.executeJavaScript(readFileSync(join(paths.BASE_DIR, "build", "owo.min.js"), "utf8"));

function startQuickCSS() {
    const quickCSS = document.createElement("style");
    quickCSS.id = "FC-QUICK-CSS";
    if (ipc.getLocalSetting("useQuickCSS", true)) {
        if (!existsSync(join(paths.SETTINGS_PATH, "quick.css"))) writeFileSync(join(paths.SETTINGS_PATH, "quick.css"), "");
        quickCSS.textContent = readFileSync(join(paths.SETTINGS_PATH, "quick.css")).toString(); 
    }

    watchFile(join(paths.SETTINGS_PATH, "quick.css"), {
        interval: 5
    }, () => {
        if (!ipc.getLocalSetting("useQuickCSS", true)) return;
        readFile(join(paths.SETTINGS_PATH, "quick.css"), (e, d) => {
            const data = d.toString();
            if (data !== quickCSS.textContent) quickCSS.textContent = data;
        });
    });

    document.head.appendChild(quickCSS);
}

if (document.readyState === "loading") window.document.addEventListener("DOMContentLoaded", startQuickCSS);
else startQuickCSS();
