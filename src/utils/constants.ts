import { join } from "path";

export const BASE_DIR = join(__dirname, "..", "..");
export const SETTINGS_PATH = join(BASE_DIR, ".settings");
export const THEME_PATH = join(BASE_DIR, "src", "themes");
export const PLUGIN_PATH = join(BASE_DIR, "build", "plugins");