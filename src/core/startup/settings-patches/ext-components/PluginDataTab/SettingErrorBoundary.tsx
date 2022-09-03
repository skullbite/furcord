import { essentials, getViaDisplayName } from "@owo/webpack";

const { default: HelpMessage } = getViaDisplayName("HelpMessage");
const { default: FormSection } = getViaDisplayName("FormSection");
const { React } = essentials;
export default class SettingsErrorBoundary extends React.Component<{ children: any }, { caught: boolean, error?: Error }> {
    constructor(props) {
        super(props);
        this.state = {
            caught: false
        };
    }
    componentDidCatch(e) {
        this.setState({ caught: true, error: e });
    }
    render() {
        return this.state.caught ? <>
            <FormSection title="Oh dear..." tag="h1">
                <HelpMessage messageType={2}>
                    { /* eslint-disable-next-line react/no-unescaped-entities */ }
                    The settings component for this plugin didn't load...<br/>
                    Short Error: {this.state.error.message}
                </HelpMessage>
            </FormSection>
        </> : this.props.children;
    }
}