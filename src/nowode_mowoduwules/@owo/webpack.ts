let modules = [];
function filterWebpack(predicate: (module: any) => boolean, returnFirst=true) {
    window.webpackChunkdiscord_app.push([[Symbol.for("webpack.owo")], [], ({ c }: { c: [] }) => {
        if (modules.length !== c.length) modules = c;
    }]);
    window.webpackChunkdiscord_app.pop(); 
    const mods = [];
    for (const key in modules) {
        const mod = modules[key].exports;
        if (!mod) continue;
        if (predicate(key)) {
            if (returnFirst) return mod;
            mods.push(mod);
        }
    }
    return returnFirst ? undefined : mods;
}
export function _countModules() {
    return filterWebpack(() => true).length;
}

export function getModule(predicate: (obj) => boolean) {
    return filterWebpack(predicate);
}

export function getAllModules(predicate: (obj) => boolean) {
    return filterWebpack(predicate, false);
}

export function getViaDisplayName(name: string) {
    return filterWebpack(m => m.displayName === name || m.default?.displayName === name);
}

export function getViaProps(...props: string[]) {
    return filterWebpack(m => {
        let propCount = 0;
        for (const p of props) {
            if (m[p] || m.default?.[p]) propCount++;
        }
        return propCount === props.length;
    }, true);
    
}

export function getViaPrototypes(...protos: string[]) {
    return filterWebpack(m => {
        let protoCount = 0;
        for (const p of protos) {
            if (m.prototype?.[p] || m.default?.prototype?.[p] || m.__proto__?.[p] || m.default?.__proto__?.[p]) protoCount++;
        }
        return protoCount === protos.length;
    });
}

export const essentials: {
    React: typeof import("react"),
    ReactDOM: typeof import("react-dom"),
    Redux: any,
    FluxDispatcher: any,
    Flux: any,
    ThemeStore: any,
    constants: any
} = {
    get React() { 
        return getViaProps("createElement", "Component");
    },
    get ReactDOM() { 
        return getViaProps("createPortal", "hydrate");
    },
    get Redux() { 
        return getViaProps("createStore", "compose"); 
    },
    get FluxDispatcher() {
        return getModule(m => m.default?._subscriptions).default;
    },
    get Flux() {
        return getViaProps("Store", "useStateFromStores");
    },
    get ThemeStore() {
        return getViaProps("theme", "setAccessibilityOptions");
    },
    get constants() {
        return getViaProps("ACTIVITY_PLATFORM_TYPES", "API_HOST");
    }
};
