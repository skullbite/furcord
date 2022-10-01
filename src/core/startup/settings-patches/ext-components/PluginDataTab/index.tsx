import IconButton from "../IconButton";
import { getViaDisplayName, getViaProps, essentials } from "@owo/webpack";
import { open } from "@owo/modals";
import type PluginManager from "../../../../../../src/core/managers/plugins"; // 😩

import { Plugin } from "@uwu";
import SettingsErrorBoundary from "./SettingErrorBoundary";

const { React } = essentials;
const { default: Card } = getViaDisplayName("Card");
const { default: ArrowDropDown } = getViaDisplayName("ArrowDropDown");
const { default: ArrowDropUp } = getViaDisplayName("ArrowDropUp");
const { default: Text } = getViaDisplayName("LegacyText");
const { default: Switch } = getViaDisplayName("Switch");
const { icons } = getViaProps("icons", "select", "multi");
const { default: Divider } = getViaDisplayName("FormDivider");
const { marginBottom8, marginTop20 } = getViaProps("marginBottom40");
const { default: Gear } = getViaDisplayName("Gear");
const { default: Retry } = getViaDisplayName("Retry");
const { default: WarningCircle } = getViaDisplayName("WarningCircle");
const { default: Tooltip } = getViaDisplayName("Tooltip");
const { red } = getViaProps("red");


export default (plugins: PluginManager) => class DataTab extends React.Component<{ plugin: Plugin, key: number }, { open: boolean, isEnabled: boolean }> {
    constructor(props) {
        super(props);
        const pluginsLoaded = plugins.config.get<{ [x:string]: boolean }>("plugins", {});

        this.state = {
            open: false,
            isEnabled: pluginsLoaded[this.props.plugin.manifest.shortName] && !this.props.plugin.startFailed
        };
    }
    render() {
        const { plugin } = this.props;
        return <Card className="dataCard" style={this.props.key < 1 ? {} : { marginTop: "10px" } }>
            <div style={{ display: "flex", alignItems: "center" }}>
                <div 
                    className={icons} 
                    style={{ color: "var(--text-normal)", cursor: "pointer" }} 
                    onClick={() => this.setState({ open: !this.state.open })}
                >
                    { this.state.open ? <ArrowDropUp/> : <ArrowDropDown/> }
                </div>
                { plugin.startFailed ? <Tooltip text={<>
                    <p>Couldnt load this plugin because it had a start up error.<br/>Message: {plugin.startFailed.message}</p>
                </>} color="red">
                    {({ onMouseEnter, onMouseLeave }) => (
                        <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} style={{ padding: "3px", paddingBottom: "1px", paddingRight: "8px" }}><WarningCircle color={red[400]}/></div>
                    )}
                </Tooltip> : null }
                { !plugin.startFailed && plugin.settings && this.state.isEnabled ? <IconButton
                    component={<Gear color="var(--interactive-normal)"/>}
                    onClick={() => open(() => React.createElement(SettingsErrorBoundary, null, React.createElement(plugin.settings as any, { config: plugin.config })), "large")}
                    tooltip="Open Settings"
                /> : null }
                { this.state.isEnabled ? <IconButton
                    component={<Retry color="var(--interactive-normal)"/>}
                    onClick={() => plugins.unloadPlugin(plugin.manifest.shortName, true).then(() => this.forceUpdate())}
                    tooltip="Reload Plugin"
                /> : null }
                <div style={{ marginRight: "auto" }}>
                    <b style={{ fontSize: "large", color: "var(--text-normal)" }}>{ plugin.manifest.name }</b>
                    <p style={{ fontSize: "small", color: "var(--text-muted)", marginBottom: "0px", marginTop: "3px" }}>{ plugin.manifest.author }</p>
                </div>
                <Switch 
                    checked={this.state.isEnabled}
                    disabled={plugin.startFailed !== undefined}
                    onChange={v => {
                        this.setState({ isEnabled: v });
                        const name = plugin.manifest.shortName;
                        v ? plugins.loadPlugin(name + ".js", true) : plugins.unloadPlugin(name);
                    }}
                />
            </div>
            { this.state.open ?
                <>
                    <Divider className={[marginTop20, marginBottom8].join(" ")}/>
                    <Text>{ plugin.manifest.description }</Text>
                </>
                : null }
        </Card>;
    }
};