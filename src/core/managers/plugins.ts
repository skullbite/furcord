/* eslint-disable @typescript-eslint/no-var-requires */
import { existsSync, readdirSync } from "fs";
import { PLUGIN_PATH } from "../../utils/constants";
import { join } from "path";
import ManagerBase from "./manager";
import Plugin from "../../nowode_mowoduwules/@uwu/plugin";

export default class PluginManager extends ManagerBase {
    plugins: Record<string, Plugin>;
    constructor() {
        super("FC.plugins");
        this.plugins = {};
    }

    init() {
        const enabledPlugins = this.config.get<{[x: string]: boolean}>("plugins", {});
        const pluginDir = readdirSync(PLUGIN_PATH);
        for (const x of pluginDir) {
            console.log(join(PLUGIN_PATH, x, "manifest.json"));
            if (!existsSync(join(PLUGIN_PATH, x, "manifest.json"))) return console.error("No manifest found.");
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const manifest = require(join(PLUGIN_PATH, x, "manifest.json"));
            manifest.dir = x;
            if (!manifest.run || !existsSync(join(PLUGIN_PATH, x, manifest.run))) return console.error("Manifest has no entry point.");
            if (typeof enabledPlugins[x] !== "boolean") enabledPlugins[x] = true;
            const plugin = require(join(PLUGIN_PATH, x, manifest.run)).default;
            this.plugins[x] = new plugin(manifest);
            if (enabledPlugins[x]) {
                
                try {
                    this.plugins[x].start();
                }
                catch (e) {
                    this.plugins[x].startFailed = e;
                }
            }
        }
        this.config.set("plugins", enabledPlugins);
    }

    loadPlugin(plugin: Plugin) {
        const pluginsLoaded = this.config.get("plugins", {});
        if (pluginsLoaded[plugin.manifest.dir]) plugin.stop();
    }
}