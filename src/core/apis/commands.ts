import funcPatcher from "../funcPatcher";
import type WebpackHandler from "../webpack";


interface CommandOptions {
    description?: string,
    name: string,
    required?: boolean,
    /** Reference: https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type */
    type?: 3|4|5|6|7|8|10|11
}
export default class Commands {
    #wp: WebpackHandler;
    #p: typeof funcPatcher;
    constructor(wp, p) {
        this.#wp = wp;
        this.#p = p;
        const { BUILT_IN_SECTIONS } = this.#wp.getViaProps("BUILT_IN_COMMANDS");
        const { BuiltInSectionId } = this.#wp.getViaProps("BuiltInSectionId");
        BuiltInSectionId.OWO = "-69";
        BUILT_IN_SECTIONS[-69] = {
            id: "-69",
            type: 0,
            get name() {
                return "Furcord";
            },
            get icon() {
                return "https://cdn.discordapp.com/app-icons/695490578192007219/637560c9423e4b0b2ce048b2a0f976df.png?size=256";
            }
        };
        /*const ApplicationCommandDiscoverySectionList = this.#wp.getViaDisplayName("ApplicationCommandDiscoverySectionList");
        const stuff = this.#wp.getViaProps("canUseApplicationCommands");
        let didPushSection = false;

        this.#p.instead(ApplicationCommandDiscoverySectionList, "default", (args, og) => {
            if (!didPushSection) { 
                args[0].sections.push(BUILT_IN_SECTIONS[-69]); 
                didPushSection = true;
            }
            return og(...args);
        });
        this.#p.instead(stuff, "canUseApplicationCommands", (args, og) => {
            console.log(args);
            return og(...args);
        });*/
    }

    addCommand({ name, description="", execute, options=[] }: {
        name: string,
        description?: string
        execute: (args, ext) => void,
        options?: CommandOptions[]
    }) {
        const { BUILT_IN_COMMANDS } = this.#wp.getViaProps("BUILT_IN_COMMANDS");
        if (BUILT_IN_COMMANDS.map(d => d.name).includes(name)) throw new TypeError(`Command '${name}' is already registered.`);
        BUILT_IN_COMMANDS.push({
            id: String(Math.min(...BUILT_IN_COMMANDS.map(d => Number(d.id))) - 1),
            applicationId: "-69",
            inputType: 0,
            type: 1,
            name,
            displayName: name,
            description,
            displayDescription: description,
            options,
            execute
        });
    }

    removeCommand(name: string) {
        const { BUILT_IN_COMMANDS } = this.#wp.getViaProps("BUILT_IN_COMMANDS");
        try {
            BUILT_IN_COMMANDS.splice(BUILT_IN_COMMANDS.findIndex(d => d.name === name), 1);
        }
        // eslint-disable-next-line no-empty
        catch {}
    }
}