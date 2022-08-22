export default {
    log: (...message: any[]) => console.log("%c🐾", "background-color:white;padding:5px;border-radius:5px;", ...message),
    warn: (...message: any[]) => console.warn("%c🐾", "background-color:white;padding:5px;border-radius:5px;", ...message),
    error: (...message: any[]) => console.error("%c[❌ Furcord]", "color:#cdab03;font-weight:bool;", ...message)
};