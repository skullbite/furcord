import { getViaDisplayName } from "@owo/webpack";
import { instead } from "@owo/patcher";

export default () => {
    const ErrorBoundary = getViaDisplayName("ErrorBoundary");
    // all this does is not send analytics
    instead(ErrorBoundary.default.prototype, "componentDidCatch", function (args) {
        this.setState({
            error: args[0],
            info: args[1]
        });
    });
};