import * as fs from "fs";

// eslint-disable-next-line @typescript-eslint/no-var-requires
export default fs.readdirSync(__dirname).filter(d => d !== "index.js").map(d => require(`./${d}`).default) as unknown as (() => void)[];