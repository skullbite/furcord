import { ThemeData } from "./themes";

const { readTheme, compileSass } = window.FurcordNative;

export default class Theme {
    type: "web" | "local";
    style: HTMLStyleElement;
    data: ThemeData;
    constructor(type: "web" | "local", data: ThemeData) {
        this.type = type;
        this.style = document.createElement("style");
        this.style.id = "FURCORD-THEME";
        this.data = data;
    }

    async load() {
        switch (this.type) {
        case "web":
            this.style.textContent = `@import url(${this.data.url})`;
            break;
        case "local":
            // eslint-disable-next-line no-case-declarations
            const themePath = window.__fileUtils.join(this.data.path, this.data.theme);
            let themeFile: string;
            if (this.data.theme.endsWith(".scss")) themeFile = (await compileSass(themePath)).css;
            else themeFile = await readTheme(themePath);
            this.style.textContent = themeFile;
            break;
        }
        document.head.appendChild(this.style);
    }

    unload() {
        document.head.removeChild(this.style);
    }
}