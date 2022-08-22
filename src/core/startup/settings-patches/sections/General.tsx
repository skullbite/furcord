import { ReactNode } from "react";
import Furcord from "../../..";


export default function(this: Furcord) {
    const { React } = this.webpack.essentials;
    const { config } = this;
    const { default: FormSection } = this.webpack.getViaDisplayName("FormSection");
    const { default: SwitchItem } = this.webpack.getViaDisplayName("SwitchItem");

    return class GeneralSettings extends React.Component {
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
        render(): ReactNode {
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
                            const toggle = config.toggle("reactDevTools");
                            this.setState({ reactDevTools: toggle });
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
                            const toggle = config.toggle("transparency");
                            this.setState({ transparency: toggle });
                        }}
                    >
                        Transparency
                    </SwitchItem>
                </FormSection>
            </>; 
            
        }
    };
}