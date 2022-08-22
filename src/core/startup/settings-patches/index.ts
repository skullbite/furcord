import type Furcord from "../..";
import General from "./sections/General";
import QuickCSS from "./sections/QuickCSS";

export default function(this: Furcord) {
    const ClientDebugInfo = this.webpack.getViaDisplayName("ClientDebugInfo");
    const SettingsView = this.webpack.getViaDisplayName("SettingsView");
    const { React } = this.webpack.essentials;
    const { injectCSS } = this.utils;
    injectCSS(".themeCard{padding:10px;width:45%;margin-right:5%;margin-bottom:5%;}.themeCard .urlThemeSwitch{position:relative;float:right;transform: translateY(-170%);}.themeCard .urlThemeButtons{display:flex;}.urlThemeSection{display:flex;flex-wrap:wrap;}.urlThemeInput{width:100%;}.urlThemeInput-loading{width:75%;}");
    this.patcher.after(ClientDebugInfo, "default", (args, res) => { 
        res.props.children.push(React.cloneElement(res.props.children[3], { children: ["Furcord", " ", "OwO 🐾"] })); 
    });
    this.patcher.after(SettingsView.default.prototype, "getPredicateSections", (args, res: any[]) => {
        if (!res.find(d => d.label === "User Settings")) return;

        res.splice(res.findIndex(d => d.section === "Advanced") + 2, 0, 
            { section: "HEADER", label: "🐾 Furcord" },
            { section: "General", label: "General", element: () => React.createElement(General.call(this)) },
            { section: "Quick CSS", label: "Quick CSS", element: () => React.createElement(QuickCSS.call(this)) },
            { section: "DIVIDER" }
        );
    });
}