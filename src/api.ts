import { Item } from "./helpers";
import { CompareArrData, compareArrs } from "./compare";

// @ts-ignore
import * as supreme from "supreme-api";
import * as fs from "fs";

const checkItems = async (): Promise<CompareArrData[]> => {
     return new Promise((resolve, reject) => {
         supreme.getItems('all', (items: Item[], err: unknown) => {
             if (err) {
                 console.error(err);
                 reject(err);
             }
             fs.readFile("./items.json", "utf-8", (err, data) => {
                 if (err) throw err;
                 const trueData = JSON.parse(data);
                 const compared = compareArrs(trueData, items).filter(l => l.changed);
                 fs.writeFile("./items.json", JSON.stringify(items), (err) => {
                     if (err) throw err;
                 });
                 resolve(compared);
             });
         });
     });
};

export { checkItems };
