import ConfigHandler from "../config";

export default class ManagerBase {
    config: ConfigHandler;
    constructor(configKey: string) {
        this.config = new ConfigHandler(configKey);
    }
}