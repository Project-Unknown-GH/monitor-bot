import { Bot, matchPrefixes } from "@enitoni/gears"
import { Adapter, CommandBuilder, CommandGroupBuilder } from "@enitoni/gears-discordjs"
import { parseArguments, ParseArgumentsState } from "./middleware";
import { checkItems } from "./api";
import { matchPrefixesStrict } from "./matchPrefixesStrict";

require('dotenv').config();

const adapter = new Adapter({
    token: process.env.BOT_TOKEN!
});

const command = new CommandBuilder()
    .match(matchPrefixesStrict("monitor"))
    .use<ParseArgumentsState>(async context => {
        const { message } = context;
        const { args } = context.state;
        // setInterval(async () => {
        console.log("Message received...");
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
                                    inline: true
                                },
                                {
                                    name: "Description",
                                    value: `${data.desc}`,
                                    inline: true
                                },
                                {
                                    name: "Style",
                                    value: `${data.style}`,
                                    inline: true
                                },
                                {
                                    name: "Price",
                                    value: `$${data.price}`,
                                    inline: true
                                },
                                {
                                    name: "Link",
                                    value: `[Click here](${data.link})`,
                                    inline: true
                                },
                                {
                                    name: "Status",
                                    value: `${data.status}`,
                                    inline: true
                                }
                            ],
                            image: {
                                url: `${data.image}`
                            }
                        }
                    })
                }
            }
        // }, 60000);
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
