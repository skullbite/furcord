import { shell } from "electron";
import { join } from "path";
import { SETTINGS_PATH } from "../../../../utils/constants";
import { readFileSync } from "fs";
import { getViaProps, getViaDisplayName, essentials } from "@owo/webpack";

const { React } = essentials;
const { default: FormSection } = getViaDisplayName("FormSection");
const { default: SwitchItem } = getViaDisplayName("SwitchItem");
const { default: HelpMessage } = getViaDisplayName("HelpMessage");
const { default: Divider } = getViaDisplayName("FormDivider");
const { marginBottom40, marginTop20 } = getViaProps("marginBottom40");
const { Button } = getViaProps("Button");

export default (config) => class QuickCSS extends React.Component {
    override state: {
        useQuickCSS: boolean
    };
    constructor(props) {
        super(props);
        this.state = {
            useQuickCSS: config.get("useQuickCSS", true) as boolean
        };
    }
    render() {
        return <>
            <FormSection
                title="Quick CSS"
                tag="h1"
            >
                    
                <HelpMessage messageType={1}>
                    Unfortunately there is no CSS editor yet. You have to edit your Quick CSS in an external editor for now.
                </HelpMessage>
                <Divider className={[marginBottom40, marginTop20].join(" ")}/>
                <SwitchItem
                    value={this}
                    onChange={() => {
                        const val = config.toggle("useQuickCSS");
                        if (!val) document.getElementById("FC-QUICK-CSS").textContent = "";
                        else document.getElementById("FC-QUICK-CSS").textContent = readFileSync(join(SETTINGS_PATH, "quick.css")).toString();
                        this.setState({ useQuickCSS: val });
                    }}
                >
                        Use Quick CSS
                </SwitchItem>
                <Button
                    onClick={() => shell.openPath(join(SETTINGS_PATH, "quick.css"))}
                >
                    Open Quick CSS File
                </Button>
            </FormSection>
        </>;
    }
};