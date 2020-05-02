import { Middleware } from "@enitoni/gears-discordjs";

export type ParseArgumentsState = { args: string[] };

export const parseArguments: Middleware<ParseArgumentsState> = (
    context,
    next
) => {
    const { message, state } = context;

    const input = message.content.slice("mon!".length).trim();
    state.args = input.split(/ +/).slice(1);

    return next();
};
