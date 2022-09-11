import { ipcRenderer } from "electron";
import { COMPILE_SASS, GET_LOCAL_SETTING, GET_SETTING, OPEN_PATH, READ_PLUGIN, READ_PLUGIN_DIR, READ_QUICK_CSS, READ_THEME, READ_THEME_DIR, SET_LOCAL_SETTING, SET_SETTING } from "./events";

export default {
    // readFile: async (path: string) => ipcRenderer.invoke(),
    readPluginDir: async (): Promise<string[]> => ipcRenderer.invoke(READ_PLUGIN_DIR),
    readPlugin: async (filename: string) => ipcRenderer.invoke(READ_PLUGIN, filename),
    readThemeDir: async (): Promise<string[]> => ipcRenderer.invoke(READ_THEME_DIR),
    readTheme: async (filename: string) => ipcRenderer.invoke(READ_THEME, filename),
    // todo: compile outside of renderer
    compileSass: async (path: string) => ipcRenderer.invoke(COMPILE_SASS, path),
    readQuickCSS: async () => ipcRenderer.invoke(READ_QUICK_CSS),
    openPath: async (path: string) => ipcRenderer.invoke(OPEN_PATH, path),
    getSetting: async (key: string) => ipcRenderer.invoke(GET_SETTING, key),
    setSetting: async (key: string, value: any): Promise<void> => ipcRenderer.invoke(SET_SETTING, key, value),
    getLocalSetting: async (key: string, defaultValue: any) => ipcRenderer.invoke(GET_LOCAL_SETTING, key, defaultValue),
    setLocalSetting: async (key: string, value: any) => ipcRenderer.invoke(SET_LOCAL_SETTING, key, value)
};