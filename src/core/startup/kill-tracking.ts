import Furcord from "..";

declare global {
    interface Window {
        __SENTRY__: any,
        DiscordSentry: any,
    }
}
export default function(this: Furcord) {
    window.__SENTRY__.hub.addBreadcrumb = () => "uwu";
    window.__SENTRY__.hub.getClient().close();
    // window.DiscordSentry.addBreadcrumb = () => "uwu";
    window.DiscordSentry.close();
}