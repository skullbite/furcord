import * as utils from "../utils";
import logger from "../utils/logger";
import Commands from "./apis/commands";
import ConfigHandler from "./config";
import funcPatcher from "./funcPatcher";
import startup from "./startup";
import Toaster from "./apis/toaster";
import WebpackHandler from "./webpack";

export default class Furcord {
    webpack: WebpackHandler;
    patcher: typeof funcPatcher;
    config: ConfigHandler;
    commands: Commands;
    logger: typeof logger;
    utils: typeof utils;
    toaster: Toaster;

    constructor() {
        console.clear();
        utils.logger.log("Initalizing...");
        this.webpack = new WebpackHandler();
        this.patcher = funcPatcher;
        this.config = new ConfigHandler("FC.core");
        this.commands = new Commands(this.webpack, this.patcher);
        this.utils = utils;
        this.toaster = new Toaster(this.webpack);
    }

    runStartup() {
        if (!this.config.get("firstStart", true)) this.toaster.sendToast("Welcome to Furcord! owo", 1, {});
        startup.forEach(d => d.call(this));
    }
    
}