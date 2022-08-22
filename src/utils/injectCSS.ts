export default function injectCSS(css: string) {
    const injection = document.createElement("style");
    injection.id = "FURCORD-INJECTION-OWO";
    injection.textContent = css;

    document.head.appendChild(injection);
    return () => document.head.removeChild(injection);
}