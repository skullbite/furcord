let modules = [];
function filterWebpack() {
    window.webpackChunkdiscord_app.push([[Symbol.for("webpack.owo")], [], ({ c }: { c: [] }) => {
        if (modules.length !== c.length) modules = c;
    }]);
    window.webpackChunkdiscord_app.pop(); 
    const mods = [];
    for (const key in modules) {
        const mod = modules[key].exports;
        if (!mod) continue;
        mods.push(mod);
    }
    return mods;
}
export function _countModules() {
    return filterWebpack().length;
}

export function getModule(predicate: (obj) => boolean) {
    const modules = filterWebpack();
    for (const x of modules) {
        if (predicate(x)) return x;
    }
}

export function getAllModules(predicate: (obj) => boolean) {
    const modules = filterWebpack();
    const toRet = [];
    for (const x of modules) {
        if (predicate(x)) toRet.push(x);
    }
    return toRet;
}

export function getViaDisplayName(name: string) {
    const modules = filterWebpack();
    for (const x of modules) {
        if (x.displayName === name || x.default?.displayName == name) return x;
    }
}

export function getViaProps(...props: string[]) {
    const modules = filterWebpack();
    for (const x of modules) {
        let propCount = 0;
        for (const p of props) {
            if (x[p] || x.default?.[p]) propCount++;
        }
        if (propCount === props.length) return x;
    }
}

export function getViaPrototypes(...protos: string[]) {
    const modules = filterWebpack();
    for (const x of modules) {
        let protoCount = 0;
        for (const p of protos) {
            if (x.prototype?.[p] || x.default?.prototype?.[p] || x.__proto__?.[p] || x.default?.__proto__?.[p]) protoCount++;
        }
        if (protoCount === protos.length) return x;
    }
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
