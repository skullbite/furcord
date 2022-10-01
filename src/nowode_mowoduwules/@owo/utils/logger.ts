export default {
    log: (...message: any[]) => console.log("%c[Furcord]", "color:#5765f2;font-weight:bold;", ...message),
    warn: (...message: any[]) => console.warn("%c[Furcord]", "color:#5765f2;font-weight:bold;", ...message),
    error: (...message: any[]) => console.error("%c[Furcord]", "color:#5765f2;font-weight:bold;", ...message)
};