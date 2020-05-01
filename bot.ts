import { Bot, matchPrefixes } from "@enitoni/gears"
import { Adapter, Command, CommandGroupBuilder } from "@enitoni/gears-discordjs"
import { parseArguments } from "./middleware";

require('dotenv').config();

const adapter = new Adapter({
    token: process.env.BOT_TOKEN
});

const command = new Command({
    matcher: matchPrefixes("test"),
    action: context => {
        const { message } = context;
        message.channel.send("Test received!");
    }
});

const commands = new CommandGroupBuilder()
    .match(matchPrefixes("sup!"))
    .use(parseArguments)
    .setCommands(command)
    .done();

const bot = new Bot({ adapter, commands: [commands] });
console.log(process.env.BOT_TOKEN);
bot.start()
    .then(() => {
        console.log("Bot starting!");
    })
    .catch(e => {
        throw e;
    });
