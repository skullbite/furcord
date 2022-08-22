const patchInfoSym = Symbol.for("patch.owo");

interface PatchInfo {
    patches: {
        before: ((args: IArguments, thisObj: any) => any)[],
        after: ((args: IArguments, res: any, thisObj: any) => any)[],
        instead: ((args: IArguments, og: ((args?: any[]) => any), thisObj: any) => any)[]
    },
    original: (...args: IArguments[]) => any
}

function patch(type: "before" | "after" | "instead", obj: Record<string, any>, func: string, patch) {
    if (!obj || !obj[func]) throw new TypeError(`'${func}' is undefined!`);
    let patchInfo: PatchInfo = obj[func][patchInfoSym];
    if (!patchInfo) {
        patchInfo = { 
            patches: {
                before: [],
                after: [],
                instead: []
            }, 
            original: obj[func] 
        };
        
        obj[func][patchInfoSym] = patchInfo;
        Object.defineProperties(obj[func], Object.getOwnPropertyDescriptors(patchInfo.original));
        obj[func].toString = () => patchInfo.original.toString();
    }
    patchInfo.patches[type].push(patch);
    obj[func] = makeReplacement(patchInfo);
    return () => {
        patchInfo.patches[type].splice(patchInfo.patches[type].findIndex(patch), 1);
        makeReplacement(patchInfo);
    };
}

function makeReplacement(patchInfo: PatchInfo) {
    return function() {
        // eslint-disable-next-line prefer-rest-params
        const args = arguments;
        let res, error;
        
        for (const patch of patchInfo.patches.before) patch.call(this, args, this);

        for (const patch of patchInfo.patches.instead) {
            try {
                res = patch.call(this, args, patchInfo.original);
            }
            catch (e)  {
                error = e;
            }
        }
        
        if (res === void 0 && !patchInfo.patches.instead.length) {
            try {
                res = patchInfo.original.call(this, ...args);
            } catch (e) {
                error = e;
            }
        }
        
        for (const patch of patchInfo.patches.after) {
            const ret = patch.call(this, args, res, this);
            if (ret !== void 0) {
                res = ret;
            }
        }

        if (error) throw error;
        return res;
    };
}

export default {
    before: (obj: Record<string, any>, func: string, patchFn: (args: any[], thisObj: any) => unknown) => patch("before", obj, func, patchFn),
    after: (obj: Record<string, any>, func: string, patchFn: (args: any[], res: any, thisObj: any) => unknown) => patch("after", obj, func, patchFn),
    instead: (obj: Record<string, any>, func: string, patchFn: (args: any[], og: (...args: IArguments[]) => unknown, thisObj: any) => unknown) => patch("instead", obj, func, patchFn)
};