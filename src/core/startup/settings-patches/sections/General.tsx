import { getViaDisplayName, essentials } from "@owo/webpack";

const { React } = essentials;
const { default: FormSection } = getViaDisplayName("FormSection");
const { default: SwitchItem } = getViaDisplayName("SwitchItem");

export default (config) => class GeneralSettings extends React.Component {
    override state: {
        reactDevTools: boolean
        transparency: boolean
    };
    constructor(props) {
        super(props);
        this.state = {
            reactDevTools: config.get("reactDevTools", false) as boolean,
            transparency: config.get("transparency", false) as boolean
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
                    onChange={() => { 
                        const t = config.toggle("reactDevTools");
                        this.setState({ reactDevTools: t });
                    }} 
                >
                        React Dev Tools
                </SwitchItem>
                <SwitchItem
                    note={<>
                            Enables window transparency. <b>Requires Restart.</b>
                    </>}
                    value={this.state.transparency}
                    onChange={() => {
                        const t = config.toggle("transparency");
                        this.setState({ transparency: t });
                    }}
                >
                        Transparency
                </SwitchItem>
            </FormSection>
        </>; 
            
    }
};
