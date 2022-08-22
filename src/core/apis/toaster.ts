import WebpackHandler from "../webpack";

/* todo: make actual toast system */
export default class Toaster {
    #wp: WebpackHandler;
    constructor(wp) {
        this.#wp = wp;
    }
    sendToast(message: string, type = 0, { position=0, component=null, duration=3e3 }: {
        position?: 0 | 1,
        component?: JSX.Element,
        duration?: number
    }) {
        const toast = this.#wp.getViaProps("createToast").createToast(message, type, { position, component, duration });
        this.#wp.getViaProps("showToast").showToast(toast);
    }
}