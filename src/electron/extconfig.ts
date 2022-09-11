// because core
import { join } from "path";
import { readFileSync, writeFileSync } from "fs";
import { BASE_DIR } from "./_constants";
let data = {};
const path = join(BASE_DIR, ".settings", "FC.core.json");

try {
    data = JSON.parse(readFileSync(path, "utf8"));
}
catch {
    writeFileSync(path, "{}");
}

export function get(key: string, defaultValue: any) {
    const value = data[key];
    if (value === undefined) {
        set(key, defaultValue);
        return defaultValue;
    }
    return value;
}

export function set(key: string, value: any) {
    data[key] = value;
    writeFileSync(path, JSON.stringify(data));
}

export function toggle(key: string) {
    const value = data[key];
    if (typeof value !== "boolean") throw new Error(`'${key}' is not a boolean!`);
    set(key, !value);
    return !value;
}