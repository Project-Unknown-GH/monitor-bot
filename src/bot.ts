import proxyUrl from "./proxyUrl";
// import ProxyLists from "proxy-lists"
import { checkItems } from "./api";
const axios = require('axios');

require('dotenv').config();

let isRunning = false;

// const genProxies = (): Promise<Record<string, any>> => {
//     return new Promise((res, rej) => {
//         let endData = null
//         ProxyLists.getProxies({
//             // options
//             countries: ['us'],
//             protocols: ["https"]
//         })
//             .on('data', function (proxies: Record<string, any>[]) {
//                 // Received some proxies.
//                 console.log('got some proxies');
//                 endData = proxies[0];
//                 res(endData);
//             })
//             .on('error', function (error: unknown) {
//                 // Some error has occurred.
//                 console.log('error!', error);
//                 rej(error)
//             })
//             .once('end', function () {
//                 // Done getting proxies.
//                 console.log('end!');
//             });
//     })
// }

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
                embeds.push({
		    title: "https://supremenewyork.com/shop/",
		    url: "https://supremenewyork.com/shop/",
		    footer: {
                	text: `Project Unknown | Powered by https://discord.gg/24TqAYj | ${new Date().toLocaleString("en-US", {timeZone: "America/New_York"})}`
            	    },
                    color: 15539236,
                    fields: [
                        {
                            name: "Title",
                            value: `**${data.title}**`
                        },
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
                        {
                            name: "Link",
                            value: `[Click here](${data.link})`,
                            inline: true,
                        },
                        {
                            name: "Status",
                            value: `${data.status}`,
                            inline: true,
                        }
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
                url: "https://discord.com/api/webhooks/726133952469008397/aENg94lwsRmsCTVuKkOqZmcagZdschiCKdzzzoeBSDUMbKYoPVCvFiaV62ik3ST6-iSc",
                data: { username: 'Unknown', avatarUrl: 'https://d2lllwtzebgpl1.cloudfront.net/d4dafbd834ecc67b9666e869edc0eebb_listingImg_IHnxpLv5Dg.jpg', embeds: currEmbeds }
            });
        }
        isRunning = false;
    }
};

