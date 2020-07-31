import { doStuff } from "./bot";
import * as fs from "fs";

const getFilters = (): Promise<string[]> => {
    return new Promise(res => {
        fs.readFile("filters.txt", "utf-8", (err, data) => {
            if (err) throw err;
            res(data.split("\n"));
        })
    })
}

const getWebhooks = (): Promise<string[]> => {
    return new Promise(res => {
        fs.readFile("webhooks_filtered.txt", "utf-8", (err, data) => {
            if (err) throw err;
            res(data.split("\n"));
        })
    })
}

const main = async () => {
    console.log("starting!!!");
    const webhooks = await getWebhooks();
    const filters = await getFilters();
    setInterval(doStuff, 5000, webhooks, filters, "filtered");
}

main();
