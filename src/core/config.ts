import * as fs from "fs";
import { SETTINGS_PATH } from "../utils/constants";
import { join } from "path";

type basicJsonTypes = boolean | string | number | any[];
export default class ConfigHandler {
    private data: Record<string, any> = {};
    configName: string;

    static getExt(key: string, defaultValue: basicJsonTypes, path: string) {
        if (fs.existsSync(join(SETTINGS_PATH, path+".json"))) {
            try {
                const configPath = JSON.parse(fs.readFileSync(join(SETTINGS_PATH, path+".json")).toString());
                return configPath[key] === undefined ? defaultValue : configPath[key];
            }
            catch {
                return defaultValue;
            }
        }
        else return defaultValue;
    }

    constructor(targetConf: string, waitUntilUsed = false) {
        this.configName = targetConf+".json";
        if (fs.existsSync(join(SETTINGS_PATH, this.configName))) {
            try {
                this.data = require(join(SETTINGS_PATH, this.configName));
            }
            catch {
                fs.writeFileSync(join(SETTINGS_PATH, this.configName), "{}");
            }
        }
        else {
            if (!waitUntilUsed) fs.writeFileSync(join(SETTINGS_PATH, this.configName), "{}"); 
        }
    }

    get<T = basicJsonTypes>(key: string, defaultValue: T): T {
        const value = this.data[key];
        if (value === undefined) {
            this.set<T>(key, defaultValue);
            return defaultValue;
        }
        return value;
    }

    set<T = basicJsonTypes>(key: string, value: T) {
        this.data[key] = value;
        fs.writeFileSync(join(SETTINGS_PATH, this.configName), JSON.stringify(this.data));
    }

    toggle(key: string) {
        const value = this.data[key];
        if (typeof value !== "boolean") throw new Error(`'${key}' is not a boolean!`);
        this.set(key, !value);
        return !value; 
    }

}