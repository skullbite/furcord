import Furcord from "..";

export default function(this: Furcord) {
    (window as any).DiscordNative.window.setDevtoolsCallbacks(null, null);
}