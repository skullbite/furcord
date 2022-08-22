import Furcord from "..";

export default function(this: Furcord) {
    const ErrorBoundary = this.webpack.getViaDisplayName("ErrorBoundary");
    // all this does is not send analytics
    this.patcher.instead(ErrorBoundary.default.prototype, "componentDidCatch", function (args) {
        this.setState({
            error: args[0],
            info: args[1]
        });
    });
}