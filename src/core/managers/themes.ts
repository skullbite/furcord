import { readdirSync } from "fs";
import { join } from "path";
import { THEME_PATH } from "../../utils/constants";
import Theme from "./data/theme";
import ManagerBase from "./manager";

export interface ThemeData {
    url?: string,
    theme?: string,
    path?: string,
    manifest: {
        name: string,
        shortName?: string, 
        author: string,
        description: string
    }
}

export default class ThemeManager extends ManagerBase {
    themes: Theme[];
    constructor() {
        super("FC.themes");
        this.themes = [];
    }

    init() {
        this.loadUrlThemes();
        this.loadLocalThemes();
    }

    loadUrlThemes() {
        const urlThemeArray = this.config.get<ThemeData[]>("urlThemes", []);
        urlThemeArray.forEach(d => {
            const isEnabled = (d as any).isOn;
            const theme = new Theme("web", d);
            if (isEnabled) theme.load();
            this.themes.push(theme);
        });
    }
    loadLocalThemes() {
        const localThemeArray = readdirSync(THEME_PATH);
        const localThemes = this.config.get("localThemes", {});
        localThemeArray.forEach(d => {
            if (d === ".DS_Store") return;
            const themePath = readdirSync(join(THEME_PATH, d));
            const manifestFile = themePath.find(f => ["powercord_manifest.json", "manifest.json"].includes(f));
            if (!manifestFile) return;
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const { name, description, author, theme } = require(join(THEME_PATH, d, manifestFile));
            if (typeof localThemes[d] !== "boolean") localThemes[d] = true;

            const _theme = new Theme("local", {
                theme,
                path: join(THEME_PATH, d), 
                manifest: {
                    name,
                    shortName: d,
                    description,
                    author
                } 
            });
            if (localThemes[d]) _theme.load();
            this.themes.push(_theme);
        });

    }

    reloadLocalThemes() {
        const localThemeArray = readdirSync(THEME_PATH);
        const localThemes = this.config.get("localThemes", {});
        localThemeArray.forEach(d => {
            const themePath = readdirSync(join(THEME_PATH, d));
            const manifestFile = themePath.find(f => ["powercord_manifest.json", "manifest.json"].includes(f));
            if (!manifestFile) return;
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const { name, description, author, theme } = require(join(THEME_PATH, d, manifestFile));
            if (typeof localThemes[d] !== "boolean") localThemes[d] = true;

            const _theme = new Theme("local", {
                theme,
                path: join(THEME_PATH, d), 
                manifest: {
                    name,
                    shortName: d,
                    description,
                    author
                } 
            });
            if (localThemes[d]) _theme.load();
            this.themes.push(_theme);
        });
    }
    async addThemeFromUrl(url: string) {
        // nah this regex stuff is annoying
        // if (!/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/g.test(url) || 
        if (!url.endsWith(".css")) throw new TypeError("Link is invalid.");
        const themeArray = this.config.get<ThemeData[]>("urlThemes", []);
        if (themeArray.some(theme => theme.url === url)) throw new Error("Theme is already registered.");
        const res = await fetch(url);
        if (!res.ok || res.url.includes("discord.com/channels")) throw new Error("Failed to retrieve theme.");
        const rawTheme = await res.text();
        const manifest = {
            name: "Unnamed Theme",
            author: "Unknown Author",
            description: "A mysterious theme..."
        };

        // try to get bd theme data
        try {
            const unparsedManifest = rawTheme.split("*/")[0].split("\n");
            unparsedManifest.shift();
            unparsedManifest.forEach(m => { 
                // eslint-disable-next-line prefer-const
                let [, , key, ...value] = m.split(" ");
                if (!key) return;
                key = key.replace("@", ""); 
                if (Object.keys(manifest).includes(key)) manifest[key] = value.join(" ");
            });
        }
        // eslint-disable-next-line no-empty
        catch {}
        const themeData = {
            url,
            manifest,
            isOn: true
        };
        const themeClass = new Theme("web", themeData);
        themeClass.load();

        themeArray.push(themeData);
        this.themes.push(themeClass);
        this.config.set("urlThemes", themeArray);
    }
}