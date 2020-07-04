import proxyUrl from "./proxyUrl";
// import ProxyLists from "proxy-lists"
import { checkItems } from "./api";
const axios = require('axios');

require('dotenv').config();

let isRunning = false;

export const doStuff = async (filters: string[] = [], filename: string) => {
    // const proxy = await genProxies();
    console.log("Proxy url:", proxyUrl, "Filename:", filename);
    if (!isRunning) {
        isRunning = true;
        console.log("Checking items");
        const apiData = await checkItems([], proxyUrl, filters, filename);
        const embeds = [];
        if (apiData.length > 0) {
            for (const data of apiData) {
	        console.log(data.status === "Available");
	        if (data.status !== "Available") {
                embeds.push({
		    title: data.title,
		    url: data.link,
		    footer: {
                	text: `Project Unknown | Powered by https://discord.gg/24TqAYj | ${new Date().toLocaleString("en-US", {timeZone: "America/New_York"})}`
            	    },
                    color: 15539236,
                    fields: [
                        {
                            name: "Style",
                            value: `${data.style}`,
                            inline: true
                        },
			{
			    name: "Price",
			    value: `$${data.price / 100}`,
			    inline: true
			},
                    ],
                    thumbnail: {
                        url: `${data.image}`,
                    },
		    })
		    }
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
                url: "https://discordapp.com/api/webhooks/727200682439868449/J2TWA4AXHraVUo2eksMz7Snp47HSzQrw7mYv1SbsIjw9vwqosemw4uR5TgurFa1RjR5f",
                data: { username: 'Unknown', avatarUrl: 'https://d2lllwtzebgpl1.cloudfront.net/d4dafbd834ecc67b9666e869edc0eebb_listingImg_IHnxpLv5Dg.jpg', embeds: currEmbeds }
            });
        }
        isRunning = false;
    }
};

