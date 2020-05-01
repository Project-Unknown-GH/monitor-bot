import { Bot, matchPrefixes } from "@enitoni/gears"
import { Adapter, Command, CommandBuilder, CommandGroupBuilder } from "@enitoni/gears-discordjs"
import { parseArguments, ParseArgumentsState } from "./middleware";
import { checkItems } from "./api";
import { matchPrefixesStrict } from "./matchPrefixesStrict";

require('dotenv').config();

const adapter = new Adapter({
    token: process.env.BOT_TOKEN!
});

const command = new CommandBuilder()
    .match(matchPrefixesStrict("checkState"))
    .use<ParseArgumentsState>(async context => {
        const { message } = context;
        const apiData = await checkItems();
        if (apiData.length === 0) {
            message.channel.send("No new changes!");
        } else {
            message.channel.send(JSON.stringify(apiData));
        }
        message.delete();
    })
    .done();

const commands = new CommandGroupBuilder()
    .match(matchPrefixes("sup!"))
    .use(parseArguments)
    .setCommands(command)
    .done();

const bot = new Bot({ adapter, commands: [commands] });
bot.start()
    .then(() => {
        console.log("Bot starting!");
    })
    .catch(e => {
        throw e;
    });
