import { Matcher } from "@enitoni/gears-discordjs";

const resolveArrayToOne = <T>(arr: T[] | T) => {
    if (Array.isArray(arr)) return arr[0];
    return arr;
};

const symbols = ["-", "."] as const;

export const matchPrefixesStrict = (
    ...keywords: string[]
): Matcher => async context => {
    const regex = new RegExp(
        `^(${keywords.join("|")})([^\\w]|$)( |[\\w]|(<@!?\\d+>)|${symbols.join(
            "|"
        )})*$`,
        "i"
    );

    const isMatching = !!context.content.match(regex) && !context.message.author.bot;
    if (!isMatching) {
        if (keywords[0] === "help|cmds|commands" && !context.message.author.bot) {
            // @ts-ignore
            context.message.delete(1000);
            const newMessage = await context.message.channel.send(
                `**Invalid command, try:** \`cc!help\`**!**`
            );
            // @ts-ignore
            resolveArrayToOne(newMessage).delete(3000);
        }
        return;
    }

    const newContent = context.content.replace(regex, "").trim();

    return { ...context, content: newContent };
};
