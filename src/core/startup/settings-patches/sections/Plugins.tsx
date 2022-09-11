import { essentials, getViaProps, getViaDisplayName } from "@owo/webpack";
import Furcord from "../../../furcord";
import PluginDataTab from "../ext-components/PluginDataTab";

const { React, ThemeStore } = essentials;
const { default: FormSection } = getViaDisplayName("FormSection");
const { default: EmptyState } = getViaProps("EmptyStateText");


export default function(this: Furcord) {
    const { plugins } = this.managers;
    const _PluginDataTab = PluginDataTab(plugins);
    
    return class PluginSettings extends React.Component {
        render() {
            return <>
                <FormSection title="Plugins" tag="h1">
                    { /* TODO: switch to map */ }
                    { Object.keys(plugins.plugins).length ? Object.keys(plugins.plugins).map(d => plugins.plugins[d]).map((p, k) => <_PluginDataTab plugin={p} key={k}/>) : <EmptyState theme={ThemeStore.default.theme}>
                        <EmptyState.Image
                            width={433}
                            height={232}
                            lightSrc="/assets/36c9a2fb7d0593a581a92373121c2848.svg"
                            darkSrc="/assets/b36c705f790dad253981f1893085015a.svg"
                        />
                        <EmptyState.Text note="You came a little early... This is still being worked on."/>
                    </EmptyState>}
                    
                </FormSection>
            </>;
        }
    };
}

