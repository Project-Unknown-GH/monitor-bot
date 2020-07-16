"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doStuff = void 0;
const proxyUrl_1 = __importDefault(require("./proxyUrl"));
// import ProxyLists from "proxy-lists"
const api_1 = require("./api");
const urls_1 = require("./urls");
const axios = require('axios');
const dotenv = require("dotenv");
require('dotenv').config();
let isRunning = false;
exports.doStuff = async (filters = [], filename) => {
    // const proxy = await genProxies();
    const proxyUrl = await proxyUrl_1.default();
    console.log("Proxy url:", proxyUrl, "Filename:", filename);
    if (!isRunning) {
        isRunning = true;
        console.log("Checking items");
        const apiData = await api_1.checkItems([], proxyUrl, filters, filename);
        const embeds = [];
        if (apiData.length > 0) {
            for (const data of apiData) {
                console.log(data.status === "Available");
                if (data.status !== "Available") {
                    embeds.push({
                        title: data.title,
                        url: data.link,
                        footer: {
                            text: `Project Unknown | Powered by https://discord.gg/24TqAYj | ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })}`
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
                    });
                }
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
                url: urls_1.Webhooks[process.env.WEBHOOK_URL],
                data: { username: 'Unknown', avatarUrl: 'https://d2lllwtzebgpl1.cloudfront.net/d4dafbd834ecc67b9666e869edc0eebb_listingImg_IHnxpLv5Dg.jpg', embeds: currEmbeds }
            });
        }
        isRunning = false;
    }
};
