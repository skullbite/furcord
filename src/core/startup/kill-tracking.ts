declare global {
    interface Window {
        __SENTRY__: any,
        DiscordSentry: any,
        DiscordNative: any
    }
}
export default () => {
    window.__SENTRY__.hub.addBreadcrumb = () => "uwu";
    window.__SENTRY__.hub.getClient().close();
    // window.DiscordSentry.addBreadcrumb = () => "uwu";
    window.DiscordSentry.close();
    window.DiscordNative.nativeModules.requireModule("discord_utils").submitLiveCrashReport = () => "owo";
};