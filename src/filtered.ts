import { doStuff } from "./bot";

const filters = ["shoes", "shoe"];

console.log("Starting filtered");
setInterval(doStuff, 20000, filters, "filtered");
