import Theme from "../../../../managers/theme";
import IconButton from "../IconButton";
import ManifestModal from "./ManifestModal";
import { getViaDisplayName, getViaProps, essentials } from "@owo/webpack";
import { open } from "@owo/modals";
import type ThemeManager from "../../../../managers/themes";

const { React } = essentials;
const { default: Card } = getViaDisplayName("Card");
const { default: ArrowDropDown } = getViaDisplayName("ArrowDropDown");
const { default: ArrowDropUp } = getViaDisplayName("ArrowDropUp");
const { default: Text } = getViaDisplayName("LegacyText");
const { default: Switch } = getViaDisplayName("Switch");
const { icons } = getViaProps("icons", "select", "multi");
const { default: Divider } = getViaDisplayName("FormDivider");
const { marginBottom20, marginTop20, marginBottom8 } = getViaProps("marginBottom40");
const { icon } = getViaProps("iconWrapper", "clickable");


export default (themes: ThemeManager) => class DataTab extends React.Component<{ theme: Theme, key: number, callback: () => void }, { open: boolean, isEnabled: boolean }> {
    constructor(props) {
        super(props);
        const { theme } = this.props;
        this.state = {
            open: false,
            isEnabled: theme.type === "web" ? 
                themes.config.get("urlThemes", []).find(d => d.url === theme.data.url).isOn : 
                themes.config.get<{[x: string]: boolean}>("localThemes", {})[theme.data.manifest.shortName]
        };
    }
    render() {
        const { theme, callback } = this.props;    
        return <Card className="dataCard" style={this.props.key < 1 ? {} : { marginTop: "10px" } } >
            <div style={{ display: "flex", alignItems: "center" }}>
                <div 
                    className={icons} 
                    style={{ color: "var(--text-normal)", cursor: "pointer" }} 
                    onClick={() => this.setState({ open: !this.state.open })}
                >
                    { this.state.open ? <ArrowDropUp/> : <ArrowDropDown/> }
                </div>
                <div style={{ marginRight: "auto" }}>
                    <b style={{ fontSize: "large", color: "var(--text-normal)" }}>{ theme.data.manifest.name }</b>
                    <p style={{ fontSize: "small", color: "var(--text-muted)", marginBottom: "0px", marginTop: "3px" }}>{ theme.data.manifest.author }</p>
                </div>
                <Switch 
                    checked={this.state.isEnabled}
                    onChange={v => { 
                        this.setState({ isEnabled: v });
                        v ? theme.load() : theme.unload();
                        switch (theme.type) {
                        case "web":
                            const urlThemeArray = themes.config.get("urlThemes", []);
                            urlThemeArray[urlThemeArray.findIndex(t => t.url === theme.data.url)].isOn = v;
                            themes.config.set("urlThemes", urlThemeArray);
                            break;
                        case "local":
                            const localThemes = themes.config.get("localThemes", {});
                            localThemes[theme.data.manifest.shortName] = v;
                            themes.config.set("localThemes", localThemes);
                            break;
                        }
                    }}
                />
            </div>
            { this.state.open ?
                <>
                    <Divider className={[marginTop20, marginBottom20].join(" ")}/>
                    { /*<p style={{ fontSize: "small", color: "var(--text-muted)", marginBottom: "0px", marginTop: "3px" }}>{ theme.manifest.manifest.description }</p> */ }
                    <Text>{ theme.data.manifest.description }</Text>
                    <Divider className={[marginBottom8, marginTop20].join(" ")}/>
                    <div style={{ display: "flex" }}>
                        { theme.type === "web" ? <IconButton
                            component={<svg width="16" height="16" fill="currentColor" className={icon} viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                            </svg>}
                            onClick={() => open(() => React.createElement(ManifestModal, theme.data.manifest), "large")}
                            tooltip="Edit Manifest"
                        /> : null }
                        <IconButton
                            component={theme.type === "web" ? <svg width="16" height="16" fill="currentColor" className={icon} viewBox="0 0 16 16">
                                <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z"/>
                            </svg> : <svg width="16" height="16" fill="currentColor" className={icon} viewBox="0 0 16 16">
                                <path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4H2.19zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707z"/>
                            </svg>}
                            onClick={() => theme.type === "web" ? window.open(theme.data.url) : window.FurcordNative.openPath(theme.data.path)}
                            tooltip="Open Source"
                        />
                        { theme.type === "web" ? <IconButton
                            component={<svg width="16" height="16" fill="currentColor" className={icon} viewBox="0 0 16 16">
                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                            </svg>}
                            onClick={() =>{
                                if (this.state.isEnabled) theme.unload();
                                const urlThemeArray = themes.config.get("urlThemes", []);
                                urlThemeArray.splice(urlThemeArray.findIndex(d => d.url === theme.data.url), 1);
                                themes.themes.splice(themes.themes.findIndex(d => d.data.url === theme.data.url), 1);
                                themes.config.set("urlThemes", urlThemeArray);
                                callback();
                            }}
                            tooltip="Delete Theme"
                        /> : null }
                    </div>
                </>
                : null }
        </Card>;
    }
};
