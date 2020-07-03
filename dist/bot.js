"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const proxyUrl_1 = __importDefault(require("./proxyUrl"));
// import ProxyLists from "proxy-lists"
const api_1 = require("./api");
const axios = require('axios');
require('dotenv').config();
let isRunning = false;
exports.doStuff = async (filters = [], filename) => {
    // const proxy = await genProxies();
    console.log("Proxy url:", proxyUrl_1.default, "Filename:", filename);
    if (!isRunning) {
        isRunning = true;
        console.log("Checking items");
        const apiData = await api_1.checkItems([], proxyUrl_1.default, filters, filename);
        const embeds = [];
        if (apiData.length > 0) {
            for (const data of apiData) {
                embeds.push({
                    title: "https://supremenewyork.com/shop/",
                    url: "https://supremenewyork.com/shop/",
                    footer: {
                        text: `Project Unknown | Powered by https://discord.gg/24TqAYj | ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })}`
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
                });
            }
            // }
            // } else {
            //     message.channel.send("No changes!");
        }
        while (embeds.length > 0) {
            const currEmbeds = [];
            for (let i = 0; i < 10 && embeds.length !== 0; i++) {
                currEmbeds.push(embeds.shift());
            }
            ;
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
