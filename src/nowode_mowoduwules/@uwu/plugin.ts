/* eslint-disable @typescript-eslint/no-empty-function */
import ConfigHandler from "../../core/config";

export interface PluginManifest {
    name: string,
    description: string,
    author: string,
    run: string,
    shortName: string
}

export default class Plugin {
    config: ConfigHandler;
    manifest: PluginManifest;
    settings?: () => React.Component<{ config: ConfigHandler }> | React.PureComponent<{ config: ConfigHandler }> | JSX.Element;
    startFailed?: Error;
    constructor(manifest) {
        this.config = new ConfigHandler(`${manifest.shortName}.plugin`, true);
        this.manifest = manifest;
    }

    start() {}
    stop() {}
}