import type Furcord from "../..";
import General from "./sections/General";
import Plugins from "./sections/Plugins";
import QuickCSS from "./sections/QuickCSS";
import Themes from "./sections/Themes";
import { getViaDisplayName, essentials } from "@owo/webpack";

export default function(this: Furcord) {
    const ClientDebugInfo = getViaDisplayName("ClientDebugInfo");
    const SettingsView = getViaDisplayName("SettingsView");
    const { React } = essentials;
    const { injectCSS } = this.utils;
    injectCSS(".dataCard{padding:10px;}.dataSwitch{float:right;}.themeInput{width:74%;margin-right:2%;}.themeInput.processing{width:67%;}.cubes{margin-right:2%}");
    this.patcher.after(ClientDebugInfo, "default", (args, res) => { 
        res.props.children.push(React.cloneElement(res.props.children[3], { children: ["Furcord", " ", "OwO 🐾"] })); 
    });
    this.patcher.after(SettingsView.default.prototype, "getPredicateSections", (args, res: any[]) => {
        if (!res.find(d => d.label === "User Settings")) return;

        res.splice(res.findIndex(d => d.section === "Advanced") + 2, 0, 
            { section: "HEADER", label: "🐾 Furcord" },
            { section: "General", label: "General", element: () => React.createElement(General(this.config)) },
            { section: "Quick CSS", label: "Quick CSS", element: () => React.createElement(QuickCSS(this.config)) },
            { section: "Themes", label: "Themes", element: () => React.createElement(Themes.call(this)) },
            { section: "Plugins", label: "Plugins", element: () => React.createElement(Plugins.call(this)) },
            { section: "DIVIDER" }
        );
    });
}