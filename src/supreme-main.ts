import { doStuff } from "./bot";
import * as fs from "fs";

const getWebhooks = () => {
    return new Promise(res => {
        fs.readFile("webhooks_main.txt", "utf-8", (err, data) => {
            if (err) throw err;
            res(data.split("\n"));
        })
    })
}

const main = async () => {
    console.log("starting!!!");
    const webhooks = await getWebhooks();
    setInterval(doStuff, 5000, webhooks);
}

main();