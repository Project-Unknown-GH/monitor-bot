import { checkItems } from "./api";
const axios = require('axios');

require('dotenv').config();

let isRunning = false;

const doStuff = async () => {
    if (!isRunning) {
        isRunning = true;
        console.log("Checking items");
        const apiData = await checkItems();
        const embeds = [];
        if (apiData.length > 0) {
            for (const data of apiData) {
                embeds.push({
                    title: "**Stock changed!**",
                    color: 15539236,
                    fields: [
                        {
                            name: "Title",
                            value: `**${data.title}**`,
                            inline: true,
                        },
                        {
                            name: "Style",
                            value: `${data.style}`,
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
                })
            }
            // }
            // } else {
            //     message.channel.send("No changes!");
        }
        while (embeds.length > 0) {
            const currEmbeds = [];
            for (let i = 0; i < 10 && embeds.length !== 0; i++) { currEmbeds.push(embeds.shift()) };
            console.log("Sending!");
            axios({
                method: 'post',
                url: 'https://discordapp.com/api/webhooks/708285711006171156/wpGG8gARQpC0hY5ZG2g3zgzwNfeH0ryHGvnzxISRFIQ1dn7qwVB7YTO3XZhuAr1g-ChE',
                data: {username: 'Unknown', avatarUrl: 'https://d2lllwtzebgpl1.cloudfront.net/d4dafbd834ecc67b9666e869edc0eebb_listingImg_IHnxpLv5Dg.jpg', embeds: currEmbeds}});
        }
        isRunning = false;
    }
};

console.log("starting!!!");
setInterval(doStuff, 20000);
