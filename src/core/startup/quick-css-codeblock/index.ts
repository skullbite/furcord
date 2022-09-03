import { essentials, getViaDisplayName } from "@owo/webpack";
import { after } from "@owo/patcher";
import AddSnippet from "./AddSnippet";
const { React } = essentials;

export default () => {
    const MiniPopover = getViaDisplayName("MiniPopover");
    after(MiniPopover, "default", (args, res) => {
        if (!res.props.children[1]) return;
        const popoutContext = res.props.children[1].props;
        if (!popoutContext.message) return;
        const { message } = popoutContext;
        if (!/```css\n(.*)\n?```/gm.test(message.content)) return; 
        res.props.children.splice(0, 0, React.createElement(AddSnippet, { message }));
    });
};