/* eslint-disable @typescript-eslint/no-var-requires */
const { build } = require("esbuild");
const { join } = require("path");
const { watch, readdirSync, existsSync, readFileSync, mkdirSync } = require("fs");
const { inspect } = require("util");

if (!existsSync(__dirname, "addons")) {
    mkdirSync(join(__dirname, "..", "addons"));
    mkdirSync(join(__dirname, "..", "addons", "plugins"));
    mkdirSync(join(__dirname, "..", "addons", "themes"));
}
    
const pluginRequireFix = {
    name: "pluginsyay",
    setup: build => {
        build.onResolve({ filter: /.*/ }, args => {
            return {
                namespace: "ploogs",
                path: args.path
            };
        });

        build.onLoad({ filter: /.*/, namespace: "ploogs" }, args => {
            const dir = args.path.split("/").pop();

            const pluginDir = readdirSync(args.path);
            if (!pluginDir.includes("manifest.json")) throw new Error("No manifest file.");
            const manifest = require(join(args.path, "manifest.json"));
            for (const y of ["name", "description", "author", "run"]) {
                if (!manifest[y]) throw new Error(`${dir}: Manifest is missing required key ${y}`);
            }
            manifest.shortName = dir;
            if (!existsSync(join(args.path, manifest.run))) throw new Error("Couldn't find an entry point");
            let file = readFileSync(join(args.path, manifest.run), "utf8");
            file = `(()=>{const exports = { manifest: ${inspect(manifest)} };\n` + file;
            file += "\nreturn exports;})()";


            // const files = readdirSync(args.path);
            /*let code = "module.exports = {}\n";
            for (const x of files) {
                if (x === "owo") continue;
                if (!statSync(join(args.path, x)).isDirectory()) throw new Error();
                const pluginDir = readdirSync(join(args.path, x));
                if (!pluginDir.includes("manifest.json")) throw new Error("No manifest file.");
                const manifest = require(join(args.path, x, "manifest.json"));
                for (const y of ["name", "description", "author", "run"]) {
                    if (!manifest[y]) throw new Error(`${x}: Manifest is missing required key ${y}`);
                }
                if (!existsSync(join(args.path, x, manifest.run))) throw new Error("Couldn't find an entry point");
                code += `module.exports["${x}"] = require("${join(args.path, x, manifest.run)}");\n`;
                /*let file = readFileSync(join(args.path, x, manifest.run), "utf8");
                file = file.replace(/require\s?\(("|')@(owo|uwu)(\/.*)?("|')\)/g, (...args) => `window.${args[2]}${args[3] ? args[3].replace(/\//g, ".") : ""}`);
                code += file;

            }*/
            
            return {
                contents: file,
                resolveDir: join(__dirname, "src", "nowode_mowoduwules", "index.ts")
            };
        });

    }
};

const modulesPlugin = {
    name: "modules",
    setup: build => {
        build.onResolve({ filter: /nowode_mowoduwules/ }, args => {
            return {
                namespace: "fc-modules",
                path: args.path
            };
        });

        build.onLoad({ filter: /nowode_mowoduwules\/@owo\/index\.ts/, namespace: "fc-modules" }, () => {
            
            return {
                contents: "module.exports = window.owo;window.owo = module.exports;"
            };
        });
        build.onLoad({ filter: /nowode_mowoduwules\/@uwu\/index\.ts/, namespace: "fc-modules" }, () => {
            return {
                contents: "module.exports = window.uwu;window.uwu = module.exports;"
            };
        });
    }
};

function buildStuff() { 
    build({
        entryPoints: [join(__dirname, "src", "core")],
        outfile: "build/owo.min.js",
        banner: { js: "/* hi owo */" },
        bundle: true,
        // minify: true,
        jsxFactory: "__React.createElement",
        jsxFragment: "__React.Fragment",
        plugins: [modulesPlugin],
        logLevel: "info"
    });

    build({
        entryPoints: [join(__dirname, "src", "electron", "patcher.ts")],
        outfile: "build/uwu.min.js",
        banner: { js: "/* ur cute */" },
        bundle: true,
        minify: true,
        platform: "node",
        external: ["electron"],
        logLevel: "info"
    });

    build({
        entryPoints: [join(__dirname, "src", "electron", "preload.ts")],
        outfile: "build/preload.min.js",
        bundle: true,
        color: true,
        minify: true,
        platform: "node",
        external: ["electron"], 
        logLevel: "info"
    });
    for (const x of readdirSync(join(__dirname, "addons", "plugins"))) { 
        if (x === "owo") continue;
        build({
            entryPoints: [join(__dirname, "addons", "plugins", x)],
            external: ["@owo", "@uwu"],
            outfile: `build/plugins/${x}.js`,
            format: "cjs",
            platform: "browser",
            bundle: true,
            minify: true,
            write: true,
            jsxFactory: "__React.createElement",
            jsxFragment: "__React.Fragment",
            plugins: [pluginRequireFix]
        });
    }
}


if (process.argv.includes("--watch")) {
    console.clear();
    console.log("Watcher started owo");
    watch(__dirname, { recursive: true }, (_, filename) => {
        if ([".git", "injectors", "build", "addons"].some(d => filename.includes(d))) return;
        console.clear();
        try {
            buildStuff();
        }
        catch (e) {
            console.error(e); 
        }
    });
}
else buildStuff();