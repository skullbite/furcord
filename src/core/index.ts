import { _countModules, essentials, getViaProps } from "@owo/webpack";


async function loadFurcord() {
    if (!window.webpackChunkdiscord_app?.push || _countModules() < 7000) {
        await new Promise(() => setTimeout(loadFurcord, 5));
        return;
    }
    Object.defineProperty(window, "__React", { get: () => essentials.React });
    const { get, set } = getViaProps("ObjectStorage", "impl").impl;
    window.config = { get, set };
    const { default: Furcord } = await import("./furcord");
    window.furcord = new Furcord();
    window.furcord.runStartup();
}

if (document.readyState === "loading") window.document.addEventListener("DOMContentLoaded", loadFurcord);
else loadFurcord();