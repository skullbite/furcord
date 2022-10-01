import ManagerBase from "./manager";
import type Plugin from "@uwu/plugin";
import logger from "@owo/utils/logger";

const { readPluginDir, readPlugin } = window.FurcordNative;

export default class PluginManager extends ManagerBase {
    plugins: Record<string, Plugin>;
    constructor() {
        super("FC.plugins");
        this.plugins = {};
    }

    async init() {
        for (const x of await readPluginDir()) this.loadPlugin(x);
    }

    async loadPlugin(name: string, loadIn=false) {
        const plugs = this.config.get<{[x: string]: boolean}>("plugins", {});
        const shortName = name.split(".").shift();
        if (typeof plugs[shortName] !== "boolean" || loadIn) plugs[shortName] = true;
        const code = await readPlugin(name);
        const pluginData = eval(code);
        const plugin = new pluginData.default(pluginData.manifest);
        logger.log(`Loading ${pluginData.manifest.name}...`);
        this.plugins[shortName] = plugin;
        if (plugs[shortName]) {
            try {
                plugin.start();
            }
            catch (e) {
                logger.error(`Failed to load ${pluginData.manifest.name}:`, e);
                this.plugins[shortName].startFailed = e;
            }
        }
        this.config.set("plugins", plugs);
    }
    async unloadPlugin(name: string, reload=false) {
        const plugs = this.config.get<{[x: string]: boolean}>("plugins", {});
        const plugin = this.plugins[name];
        logger.log(`Unloading ${plugin.manifest.name}...`);
        try {
            plugin.stop();
        }
        catch (e) {
            logger.error(`Failed to unload ${plugin.manifest.name}:`, e);
        }
        if (reload) this.loadPlugin(name + ".js");
        else { 
            plugs[name] = false;
            this.config.set("plugins", plugs);
        }
    }
}