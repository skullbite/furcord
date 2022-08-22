import Furcord from "../../..";
import { shell } from "electron";
import { join } from "path";
import { SETTINGS_PATH } from "../../../../utils/constants";
import { ReactNode } from "react";
import { readFileSync } from "fs";
// import CodeEditor from "@uiw/react-textarea-code-editor/cjs/index";


export default function(this: Furcord) {
    const { config } = this;
    const { React } =  this.webpack.essentials;
    const { default: FormSection } = this.webpack.getViaDisplayName("FormSection");
    const { default: SwitchItem } = this.webpack.getViaDisplayName("SwitchItem");
    const { default: HelpMessage } = this.webpack.getViaDisplayName("HelpMessage");
    const { default: Divider } = this.webpack.getViaDisplayName("FormDivider");
    const { marginBottom40, marginTop20 } = this.webpack.getViaProps("marginBottom40");
    const { Button } = this.webpack.getViaProps("Button");
    

    return class QuickCSS extends React.Component {
        override state: {
            useQuickCSS: boolean
        };
        constructor(props) {
            super(props);
            this.state = {
                useQuickCSS: config.toggle("useQuickCSS") as boolean
            };
        }
        render(): ReactNode {
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
                        value={config.get("useQuickCSS", true)}
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
}