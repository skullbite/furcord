import { BrowserWindow } from "electron";
import { join } from "path";
import { get } from "./extconfig";

export default class FurryBrowserWindow extends BrowserWindow {
    constructor(opts: Electron.BrowserWindowConstructorOptions) {
        process.env.DISCORD_PRE = opts.webPreferences.preload;
        opts.webPreferences.preload = join(__dirname, "preload.min.js");
        opts.transparent = get("transparency", false);
        
        const actualFurryWindow = new BrowserWindow(opts);
        return actualFurryWindow;
        // because ts
        super();
    }
}