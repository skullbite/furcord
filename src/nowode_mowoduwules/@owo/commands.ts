import { getViaProps } from "./webpack";

interface CommandOptions {
    description?: string,
    name: string,
    required?: boolean,
    /** Reference: https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type */
    type?: 3|4|5|6|7|8|10|11
}

const fcSectionData = {
    id: "1019639596910379122",
    type: 1,
    name: "Furcord",
    get icon() {
        return "490e5d6034d89b62b185587825b62a01";
    },
    bot: {
        username: "Furcord",
        id: "1019639596910379122",
        bot: true,
        discriminator: "3970"
    }
};

const { BUILT_IN_SECTIONS } = getViaProps("BUILT_IN_COMMANDS");
const { BuiltInSectionId } = getViaProps("BuiltInSectionId");

BuiltInSectionId.OWO = "1019639596910379122";
BUILT_IN_SECTIONS["1019639596910379122"] = fcSectionData;

export function addCommand({ name, description="", execute, options=[] }: {
    name: string,
    description?: string
    execute: (args, ext) => void,
    options?: CommandOptions[]
}) {
    const { BUILT_IN_COMMANDS } = getViaProps("BUILT_IN_COMMANDS");
    if (BUILT_IN_COMMANDS.map(d => d.name).includes(name)) throw new TypeError(`Command '${name}' is already registered.`);
    BUILT_IN_COMMANDS.push({
        id: String(Math.min(...BUILT_IN_COMMANDS.map(d => Number(d.id))) - 1),
        applicationId: "1019639596910379122",
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

export function removeCommand(name: string) {
    const { BUILT_IN_COMMANDS } = getViaProps("BUILT_IN_COMMANDS");
    try {
        BUILT_IN_COMMANDS.splice(BUILT_IN_COMMANDS.findIndex(d => d.name === name), 1);
    }
    // eslint-disable-next-line no-empty
    catch {}
}