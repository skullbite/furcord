/* todo: make actual toast system */
import { getViaProps } from "./webpack";

export function sendToast(message: string, type = 0, { position=0, component=null, duration=3e3 }: {
        position?: 0 | 1,
        component?: JSX.Element,
        duration?: number
    }) {
    const toast = getViaProps("createToast").createToast(message, type, { position, component, duration });
    getViaProps("showToast").showToast(toast);
}