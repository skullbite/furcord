import ManagerBase from "./manager";
import type Plugin from "../../nowode_mowoduwules/@uwu/plugin";

const { readPluginDir, readPlugin } = window.FurcordNative;

export default class PluginManager extends ManagerBase {
    plugins: Record<string, Plugin>;
    constructor() {
        super("FC.plugins");
        this.plugins = {};
    }

    async init() {
        const enabledPlugins = this.config.get<{[x: string]: boolean}>("plugins", {});
        for (const x of await readPluginDir()) {
            if (typeof enabledPlugins[x] !== "boolean") enabledPlugins[x] = true;
            console.log(x);
            const code = await readPlugin(x);
            eval(code);
        }
        
        // guhh
        // const code = await readPlugin(join(x, manifest.run));
        // const plugin = (require(join(PLUGIN_PATH, x, manifest.run)) as any).default;
            
        /*this.plugins[x] = new plugin(manifest);
            if (enabledPlugins[x]) {
                try {
                    this.plugins[x].start();
                }
                catch (e) {
                    console.error(`Failed to load ${manifest.name}:`, e);
                    this.plugins[x].startFailed = e;
                }
            }*/
        this.config.set("plugins", enabledPlugins);
    }

    loadPlugin(plugin: Plugin) {
        const pluginsLoaded = this.config.get("plugins", {});
        if (pluginsLoaded[plugin.manifest.dir]) plugin.stop();
    }
}