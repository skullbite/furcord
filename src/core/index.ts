import * as utils from "../utils";
import logger from "../utils/logger";
import ConfigHandler from "./config";
import funcPatcher from "./funcPatcher";
import ThemeManager from "./managers/themes";
import PluginManager from "./managers/plugins";
import { sendToast } from "@owo/toaster";


export default class Furcord {
    managers: { 
        themes: ThemeManager,
        plugins: PluginManager
    };
    patcher: typeof funcPatcher;
    config: ConfigHandler;
    logger: typeof logger;
    utils: typeof utils;

    constructor() {
        utils.logger.log("Initalizing...");
        this.patcher = funcPatcher;
        this.config = new ConfigHandler("FC.core");
        // this.commands = new Commands(this.webpack, this.patcher);
        this.utils = utils;
        this.managers = {
            themes: new ThemeManager(),
            plugins: new PluginManager()
        };
    }

    async runStartup() {
        if (this.config.get("firstStart", true)) { 
            sendToast("Welcome to Furcord! owo", 1, {});
            this.config.set("firstStart", false);
        }
        
        utils.logger.log("Running startup functions...");
        const startup = await import("./startup");
        startup.default.forEach(d => d.call(this));
        this.managers.themes.init();
        this.managers.plugins.init();
    }
    
}