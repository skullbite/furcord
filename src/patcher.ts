import * as electron from "electron";
import FurryBrowserWindow from "./electron/BrowserWindow";
import installExtension, { REACT_DEVELOPER_TOOLS } from "electron-devtools-installer";
import ConfigHandler from "./core/config";

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
    if (ConfigHandler.getExt("reactDevTools", true, "FC.core")) installExtension(REACT_DEVELOPER_TOOLS)
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log("An error occurred: ", err));

    electron.session.defaultSession.webRequest.onHeadersReceived(({ responseHeaders, url }, cb) => {
        if (responseHeaders["content-security-policy"]) delete responseHeaders["content-security-policy"];
        responseHeaders["access-control-allow-origin"] = ["*"];
        if (url.endsWith(".css")) responseHeaders["content-type"] = ["text/css"];
        cb({ responseHeaders });
    });
    electron.session.defaultSession.webRequest.onBeforeRequest(({ url }, cb) => {
        if (/api\/v(.*)\/science/g.test(url)) cb({ cancel: true });
        else cb({ });
    });

});