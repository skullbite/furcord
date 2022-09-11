import type Furcord from "./core/furcord";
import type fcNative from "./electron/ipc/renderer";
import * as extConfig from "./electron/extconfig";
import * as paths from "./electron/_constants";

declare global {
    interface Window {
        furcord: Furcord;
        FurcordNative: typeof fcNative;
        config: {
            get<T>(key: string, defaultValue: T): T;
            set<T>(key: string, value: T): void;
        };
        extConfig: typeof extConfig;
        webpackChunkdiscord_app: {
            push: (chunk) => any;
            pop: () => any;
        };
        __SENTRY__: any;
        __fileUtils: {
            existsSync: (path: string) => boolean;
            join: (...paths: string[]) => string;
            paths: typeof paths
        };
        DiscordSentry: any;
        DiscordNative: any;
    }
}

export {};