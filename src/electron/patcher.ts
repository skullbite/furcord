import * as electron from "electron";
import FurryBrowserWindow from "./BrowserWindow";
import installExtension, { REACT_DEVELOPER_TOOLS } from "electron-devtools-installer";
import { get } from "./extconfig";
import "./ipc/main";

let fakeAppSettings;
Object.defineProperty(global, "appSettings", {
    get() {
        return fakeAppSettings;
    },
    set(value) {
        // eslint-disable-next-line no-prototype-builtins
        if (!value.hasOwnProperty("settings")) value.settings = {};
        value.settings.DANGEROUS_ENABLE_DEVTOOLS_ONLY_ENABLE_IF_YOU_KNOW_WHAT_YOURE_DOING = true;
        fakeAppSettings = value;
    },
});

const electronStuff = require.resolve("electron");
delete require.cache[electronStuff];
const newElectron: any = {
    exports: {
        ...electron,
        BrowserWindow: FurryBrowserWindow
    }
};
require.cache[electronStuff] = newElectron;

electron.app.whenReady().then(() => {
    if (get("reactDevTools", true)) installExtension(REACT_DEVELOPER_TOOLS)
        .then((name) => console.log(`Added Extension: ${name}`))
        .catch((err) => console.log("An error occurred: ", err));
});

electron.session.defaultSession.webRequest.onHeadersReceived(({ responseHeaders, url }, cb) => {
    if (responseHeaders["content-security-policy"]) delete responseHeaders["content-security-policy"];
    if (url.endsWith(".css")) responseHeaders["content-type"] = ["text/css"];
    // responseHeaders["access-control-allow-origin"] = ["*"];
    cb({ responseHeaders });
});
electron.session.defaultSession.webRequest.onBeforeRequest(({ url }, cb) => {
    if (/api\/v(.*)\/science/g.test(url)) cb({ cancel: true });
    else cb({ });
});