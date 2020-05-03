import { Bot, matchPrefixes } from "@enitoni/gears"
import { Adapter, CommandBuilder, CommandGroupBuilder } from "@enitoni/gears-discordjs"
import { parseArguments, ParseArgumentsState } from "./middleware";
import { checkItems } from "./api";
import { matchPrefixesStrict } from "./matchPrefixesStrict";

require('dotenv').config();

const adapter = new Adapter({
    token: process.env.BOT_TOKEN!,
});

const test = new CommandBuilder()
    .match(matchPrefixesStrict("test"))
    .use<ParseArgumentsState>(context => {
        const { message } = context;
        message.channel.send("Test received!");
    })
    .done();

const command = new CommandBuilder()
    .match(matchPrefixesStrict("supreme"))
    .use<ParseArgumentsState>(async context => {
        const {message} = context;
        const {args} = context.state;
        console.log("Message received...");
        setInterval(async () => {
            const apiData = await checkItems(args);
            if (apiData.length > 0) {
                for (const data of apiData) {
                    await message.channel.send({
                        embed: {
                            title: "**Stock changed!**",
                            color: "#ed1c24",
                            fields: [
                                {
                                    name: "Title",
                                    value: `**${data.title}**`,
                                    inline: true,
                                },
                                {
                                    name: "Description",
                                    value: `${data.desc}`,
                                    inline: true,
                                },
                                {
                                    name: "Style",
                                    value: `${data.style}`,
                                    inline: true,
                                },
                                {
                                    name: "Price",
                                    value: `$${data.price}`,
                                    inline: true,
                                },
                                {
                                    name: "Link",
                                    value: `[Click here](${data.link})`,
                                    inline: true,
                                },
                                {
                                    name: "Status",
                                    value: `${data.status}`,
                                    inline: true,
                                },
                            ],
                            image: {
                                url: `${data.image}`,
                            },
                        },
                    })
                }
            // }
            // } else {
            //     message.channel.send("No changes!");
            }
        }, 5000);
    })
    .done();

const commands = new CommandGroupBuilder()
    .match(matchPrefixes("mon!"))
    .use(parseArguments)
    .setCommands(command, test)
    .done();

const bot = new Bot({adapter, commands: [commands]});
bot.start()
    .then(() => {
        console.log("Bot starting!");
    })
    .catch(e => {
        throw e;
    });
