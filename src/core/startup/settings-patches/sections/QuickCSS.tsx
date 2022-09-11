import { getViaProps, getViaDisplayName, essentials } from "@owo/webpack";

const { React } = essentials;
const { default: FormSection } = getViaDisplayName("FormSection");
const { default: SwitchItem } = getViaDisplayName("SwitchItem");
const { Button } = getViaProps("Button");

const { readQuickCSS, openPath, getLocalSetting, setLocalSetting } = window.FurcordNative; 
const { join, paths } = window.__fileUtils;

// eslint-disable-next-line @typescript-eslint/ban-types
export default class QuickCSS extends React.Component<{}, { useQuickCSS: boolean }> {
    constructor(props) {
        super(props);
        this.state = {
            useQuickCSS: window.extConfig.get("useQuickCSS", true)
        };
    }
    render() {
        return <>
            <FormSection
                title="Quick CSS"
                tag="h1"
            >
                <SwitchItem
                    value={this.state.useQuickCSS}
                    onChange={async v => {
                        setLocalSetting("useQuickCSS", v);
                        if (!v) document.getElementById("FC-QUICK-CSS").textContent = "";
                        else document.getElementById("FC-QUICK-CSS").textContent = await readQuickCSS();
                        this.setState({ useQuickCSS: v });
                    }}
                >
                        Use Quick CSS
                </SwitchItem>
                <Button
                    onClick={async () => openPath(join(paths.SETTINGS_PATH, "quick.css"))}
                >
                    Open Quick CSS File
                </Button>
            </FormSection>
        </>;
    }
}