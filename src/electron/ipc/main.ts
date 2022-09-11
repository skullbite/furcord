import { ipcMain } from "electron";
import { shell } from "electron";
import { COMPILED_PLUGINS, SETTINGS_PATH, THEME_PATH } from "../_constants";
import { join } from "path";
import { readFileSync, readdirSync } from "fs";
import { COMPILE_SASS, GET_LOCAL_SETTING, GET_SETTING, OPEN_PATH, READ_PLUGIN, READ_PLUGIN_DIR, READ_QUICK_CSS, READ_THEME, READ_THEME_DIR, SET_LOCAL_SETTING, SET_SETTING } from "./events";
import * as sass from "sass";
import { get, set } from "../extconfig";

function readThemeDir() {
    return readdirSync(THEME_PATH);
}

function readTheme(_, filename: string) {
    return readFileSync(join(THEME_PATH, filename), "utf8");
}

function readPluginDir() {
    return readdirSync(COMPILED_PLUGINS);
}

function readPlugin(_, filename: string) {
    return readFileSync(join(COMPILED_PLUGINS, filename), "utf8");
}

function compileSass(_, path: string, theme: string) {
    return sass.compile(join(path, theme));
}

function readQuickCSS() {
    return readFileSync(join(SETTINGS_PATH, "quick.css"), "utf8");
}

function openPath(_, path: string) {
    return shell.openPath(path);
}

function getSetting(_, key: string) {
    return global.localStorage.getItem(key);
}

function setSetting(_, key: string, value: any) {
    global.localStorage.setItem(key, value);
}

function getCoreSetting(_, key: string, defaultValue: any) {
    return get(key, defaultValue);
}

function setCoreSetting(_, key: string, value: any) {
    set(key, value);
}


ipcMain.handle(READ_THEME_DIR, readThemeDir);
ipcMain.handle(READ_THEME, readTheme);
ipcMain.handle(READ_PLUGIN_DIR, readPluginDir);
ipcMain.handle(READ_PLUGIN, readPlugin);
ipcMain.handle(COMPILE_SASS, compileSass);
ipcMain.handle(READ_QUICK_CSS, readQuickCSS);
ipcMain.handle(OPEN_PATH, openPath);
ipcMain.handle(GET_SETTING, getSetting);
ipcMain.handle(SET_SETTING, setSetting);
ipcMain.handle(GET_LOCAL_SETTING, getCoreSetting);
ipcMain.handle(SET_LOCAL_SETTING, setCoreSetting);