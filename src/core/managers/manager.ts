import EventEmitter = require("events");
import ConfigHandler from "../config";

export default class ManagerBase extends EventEmitter {
    config: ConfigHandler;
    constructor(configKey: string) {
        super();
        this.config = new ConfigHandler(configKey);
    }
}