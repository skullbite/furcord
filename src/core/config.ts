import * as fs from "fs";
import { SETTINGS_PATH } from "../utils/constants";
import { join } from "path";
type basicJsonTypes = boolean | string | number | any[];
export default class ConfigHandler {
    #data: Record<string, basicJsonTypes> = {};
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

    constructor(targetConf: string) {
        this.configName = targetConf+".json";
        if (fs.existsSync(join(SETTINGS_PATH, this.configName))) {
            try {
                this.#data = JSON.parse(fs.readFileSync(join(SETTINGS_PATH, this.configName)).toString());
            }
            catch {
                fs.writeFileSync(join(SETTINGS_PATH, this.configName), "{}");
            }
        }
        else fs.writeFileSync(join(SETTINGS_PATH, this.configName), "{}");
    }

    get(key: string, defaultValue: basicJsonTypes) {
        const value = this.#data[key];
        if (value === undefined) {
            this.set(key, defaultValue);
            return defaultValue;
        }
        return value;
    }

    set(key: string, value: basicJsonTypes) {
        this.#data[key] = value;
        fs.writeFileSync(join(SETTINGS_PATH, this.configName), JSON.stringify(this.#data));
    }

    toggle(key: string) {
        const value = this.#data[key];
        if (typeof value !== "boolean") throw new Error(`'${key}' is not a boolean!`);
        this.set(key, !value);
        return !value; 
    }

}