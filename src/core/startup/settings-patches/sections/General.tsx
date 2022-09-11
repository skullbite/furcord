import { getViaDisplayName, essentials } from "@owo/webpack";

const { React } = essentials;
const { default: FormSection } = getViaDisplayName("FormSection");
const { default: SwitchItem } = getViaDisplayName("SwitchItem");

// eslint-disable-next-line @typescript-eslint/ban-types
export default class GeneralSettings extends React.Component<{}, { reactDevTools: boolean, transparency: boolean }>  {
    constructor(props) {
        super(props);
        this.state = {
            reactDevTools: window.extConfig.get("reactDevTools", false),
            transparency: window.extConfig.get("transparency", false)
        };
    }
    render() {
        return <>
            <FormSection
                title="Furcord Settings"
                tag="h1"
            >
                <SwitchItem
                    note={<>
                            Enables react devtools. <b>Requires Restart.</b>
                    </>}
                    value={this.state.reactDevTools}
                    onChange={async v => { 
                        window.extConfig.set("reactDevTools", v);
                        this.setState({ reactDevTools: v });
                    }} 
                >
                        React Dev Tools
                </SwitchItem>
                <SwitchItem
                    note={<>
                            Enables window transparency. <b>Requires Restart.</b>
                    </>}
                    value={this.state.transparency}
                    onChange={v => {
                        window.extConfig.set("transparency", v);
                        this.setState({ transparency: v });
                    }}
                >
                        Transparency
                </SwitchItem>
            </FormSection>
        </>; 
            
    }
}
