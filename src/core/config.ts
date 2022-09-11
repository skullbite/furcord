type basicJsonTypes = boolean | string | number | any[];

export default class ConfigHandler {
    private data: Record<string, any> = {};
    configName: string;

    constructor(targetConf: string, waitUntilUsed = false) {
        this.configName = targetConf;
        try {
            const data = window.config.get<undefined | string>(targetConf, undefined);
            if (!data) {
                this.data = {};
                if (!waitUntilUsed) window.config.get(targetConf, "{}");
            }
            else this.data = JSON.parse(data);
        }
        catch {
            this.data = {};
            window.config.get(targetConf, "{}");
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
        window.config.set(this.configName, JSON.stringify(this.data));
    }

    toggle(key: string) {
        const value = this.data[key];
        if (typeof value !== "boolean") throw new Error(`'${key}' is not a boolean!`);
        this.set(key, !value);
        return !value; 
    }

}