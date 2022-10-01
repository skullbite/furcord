import ThemeManager from "./managers/themes";
import PluginManager from "./managers/plugins";
import { sendToast } from "@owo/toaster";
import { logger } from "@owo/utils";

export default class Furcord {
    managers: { 
        themes: ThemeManager,
        plugins: PluginManager
    };
    constructor() {
        this.managers = {
            themes: new ThemeManager(),
            plugins: new PluginManager()
        };
    }

    async runStartup() {
        if (window.extConfig.get("firstStart", true)) { 
            sendToast("Welcome to Furcord! owo", 1, {});
            window.extConfig.set("firstStart", false);
        }
        logger.log("Running startup functions...");
        const startup = await import("./startup");
        startup.default.forEach(d => d.call(this));
        this.managers.themes.init();
        this.managers.plugins.init();
    }
}