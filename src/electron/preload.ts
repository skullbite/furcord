import * as electron from "electron";
import Furcord from "../core";
import ConfigHandler from "../core/config";
import { readFileSync, watchFile } from "fs";
import { join } from "path";
import { SETTINGS_PATH } from "../utils/constants";

const dPre = process.env.DISCORD_PRE;
if (dPre) require(dPre);

const eWin = (electron.webFrame as any).top.context;

function loadFurcord() {
    for (const winVar of ["webpackChunkdiscord_app", "DiscordSentry", "__SENTRY__", "console"]) Object.defineProperty(window, winVar, { get: () => eWin[winVar] });
    eWin.furcord = new Furcord();
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
        const reRead = readFileSync(join(SETTINGS_PATH, "quick.css")).toString();
        if (reRead !== quickCSS.textContent) quickCSS.textContent = reRead;
        
    });
}

/*if (eWin.document.readyState === "loading") window.document.addEventListener("DOMContentLoaded", loadFurcord);
else loadFurcord();*/

setTimeout(loadFurcord, 10e3);