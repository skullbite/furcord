import { essentials, getViaProps, getViaDisplayName } from "@owo/webpack";
import { webFrame } from "electron/renderer";
import Furcord from "../../..";
import PluginDataTab from "../ext-components/PluginDataTab";

const { React } = essentials;
const { default: FormSection } = getViaDisplayName("FormSection");
const { default: EmptyState } = getViaProps("EmptyStateText");
const { FrecencyUserSettingsActionCreators } = getViaProps("FrecencyUserSettingsActionCreators");


const themeThing = {
    1: "dark",
    2: "light"
};
export default function(this: Furcord) {
    const { plugins } = this.managers;
    const _PluginDataTab = PluginDataTab(plugins);
    
    return class PluginSettings extends React.Component {
        render() {
            return <>
                <FormSection title="Plugins" tag="h1">
                    { /* TODO: switch to map */ }
                    { Object.keys(plugins.plugins).length ? Object.keys(plugins.plugins).map(d => plugins.plugins[d]).map((p, k) => <_PluginDataTab plugin={p} key={k}/>) : <EmptyState>
                        <EmptyState.Image
                            width={433}
                            height={232}
                            lightSrc="/assets/645df33d735507f39c78ce0cac7437f0.svg"
                            darkSrc="/assets/8c998f8fb62016fcfb4901e424ff378b.svg"
                        />
                        <EmptyState.Text note="You came a little early... This is still being worked on."/>
                    </EmptyState>}
                    
                </FormSection>
            </>;
        }
    };
}

