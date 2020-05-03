"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gears_1 = require("@enitoni/gears");
const gears_discordjs_1 = require("@enitoni/gears-discordjs");
const middleware_1 = require("./middleware");
const api_1 = require("./api");
const matchPrefixesStrict_1 = require("./matchPrefixesStrict");
require('dotenv').config();
const adapter = new gears_discordjs_1.Adapter({
    token: process.env.BOT_TOKEN,
});
let isRunning = false;
const test = new gears_discordjs_1.CommandBuilder()
    .match(matchPrefixesStrict_1.matchPrefixesStrict("test"))
    .use(context => {
    const { message } = context;
    message.channel.send("Test received!");
})
    .done();
const command = new gears_discordjs_1.CommandBuilder()
    .match(matchPrefixesStrict_1.matchPrefixesStrict("supreme"))
    .use(async (context) => {
    const { message } = context;
    const { args } = context.state;
    console.log("Message received...");
    if (!isRunning) {
        isRunning = true;
        setInterval(async () => {
            const apiData = await api_1.checkItems(args);
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
                    });
                }
                // }
                // } else {
                //     message.channel.send("No changes!");
            }
        }, 5000);
    }
})
    .done();
const commands = new gears_discordjs_1.CommandGroupBuilder()
    .match(gears_1.matchPrefixes("mon!"))
    .use(middleware_1.parseArguments)
    .setCommands(command, test)
    .done();
const bot = new gears_1.Bot({ adapter, commands: [commands] });
bot.start()
    .then(() => {
    console.log("Bot starting!");
})
    .catch(e => {
    throw e;
});
