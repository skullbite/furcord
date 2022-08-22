export default class WebpackHandler {
    private cache: any[];
    // eslint-disable-next-line @typescript-eslint/ban-types
    essentials: {
        React: typeof import("react"),
        // ReactDOM: typeof import("reactdom")
    };
    constructor() {
        this.cache = [];

        (window as any).webpackChunkdiscord_app.push([[Symbol.for("OwO")], [], ({ c }: { c: [] }) => {
            this.cache = c;
        }]);
        (window as any).webpackChunkdiscord_app.pop();
        this.essentials = {
            React: this.getViaProps("createElement", "cloneElement"),
            // ReactDOM: this.getViaProps("createPortal", "hydrate"),
        };
    }

    filterCache() {
        return Object.keys(this.cache).map(d => this.cache[d].exports).filter(d => d && typeof d !== "string");
    }

    getModule(predicate: (module: { [x: string]: any }) => boolean): { [x: string]: any } {
        return this.filterCache().find(m => predicate(m));
    }

    getAllModules(predicate: (module: { [x: string]: any }) => boolean): { [x: string]: any }[] {
        return this.filterCache().filter(m => predicate(m));
    }

    getViaDisplayName(name: string) {
        return this.filterCache().find(m => m.displayName === name || m.default?.displayName === name);
    }

    getViaProps(...props: string[]) {
        return this.filterCache().find(m => props.every(p => m[p]));
    }

    getViaPrototypes(...protos: string[]) {
        return this.filterCache().find(m => protos.every(p => m.prototype?.[p] || m.default?.prototype?.[p]));
    }
    
}