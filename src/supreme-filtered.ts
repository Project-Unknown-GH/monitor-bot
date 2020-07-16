import { doStuff } from "./bot";

const filters = ["shirt", "underwear"];

console.log("Starting filtered");
setInterval(doStuff, 20000, filters, "filtered");
