let modules;
function filterWebpack() {
    if (!modules) { 
        (window as any).webpackChunkdiscord_app.push([[Symbol.for("webpack.owo")], [], ({ c }: { c: [] }) => {
            modules = c;
        }]);
        (window as any).webpackChunkdiscord_app.pop(); 
    }
    if (!modules) return [];
    const mods = [];
    for (const key in modules) {
        const mod = modules[key].exports;
        if (typeof mod === "string" || !mod) continue;
        mods.push(mod);
    }
    return mods;
}

export function getModule(predicate: (obj) => boolean) {
    return filterWebpack().find(m => predicate(m));
}
export function getAllModules(predicate: (obj) => boolean) {
    return filterWebpack().filter(m => predicate(m));
}
export function getViaDisplayName(name: string) {
    return filterWebpack().find(m => m.displayName === name || m.default?.displayName === name);
}
export function getViaProps(...props: string[]) {
    return filterWebpack().find(m => props.every(p => m[p]));
}
export function getViaPrototypes(...protos: string[]) {
    return filterWebpack().find(m => protos.every(p => m.prototype?.[p] || m.default?.prototype?.[p]));
}

export const essentials: {
    React: typeof import("react"),
    ReactDOM: typeof import("react-dom"),
    Redux: any
} = {
    get React() { 
        return getViaProps("createElement", "Component");
    },
    get ReactDOM() { 
        return getViaProps("createPortal", "hydrate");
    },
    get Redux() { 
        return getViaProps("createStore", "compose"); 
    }
};
