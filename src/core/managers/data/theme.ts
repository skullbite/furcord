import { readFileSync } from "fs";
import { join } from "path";
import { ThemeData } from "../themes";
import * as sass from "sass";


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

    load() {
        switch (this.type) {
        case "web":
            this.style.textContent = `@import url(${this.data.url})`;
            break;
        case "local":
            // eslint-disable-next-line no-case-declarations
            const themePath = join(this.data.path, this.data.theme);
            let themeFile: string;
            if (this.data.theme.endsWith(".scss")) themeFile = sass.compile(themePath).css;
            else themeFile = readFileSync(themePath).toString();
            this.style.textContent = themeFile;
            break;
        }
        document.head.appendChild(this.style);
    }

    unload() {
        document.head.removeChild(this.style);
    }
}