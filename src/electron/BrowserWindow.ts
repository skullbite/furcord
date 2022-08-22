import { BrowserWindow } from "electron";
import { join } from "path";
import ConfigHandler from "../core/config";

export default class FurryBrowserWindow extends BrowserWindow {
    constructor(opts: Electron.BrowserWindowConstructorOptions) {
        process.env.DISCORD_PRE = opts.webPreferences.preload;
        opts.webPreferences.preload = join(__dirname, "preload.js");
        opts.transparent = ConfigHandler.getExt("transparency", false, "FC.core");
        
        const actualFurryWindow = new BrowserWindow(opts);
        return actualFurryWindow;
        // because ts
        super();
    }
}