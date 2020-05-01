import { Item } from "./helpers";
import { CompareArrData, compareArrs } from "./compare";

import * as fs from "fs";
import { getItems } from "./getData";

const checkItems = async (sizes: string[] = []): Promise<CompareArrData[]> => {
    return new Promise((resolve, reject) => {
        getItems('all', (items: Item[], err: unknown) => {
            if (err) {
                console.error(err);
                reject(err);
            }
            console.log("Reading items...");
            fs.readFile("./items.json", "utf-8", (err, data) => {
                if (err) throw err;
                console.log("Items read...");
                const trueData = JSON.parse(data);
                const compared = compareArrs(trueData, items, sizes).filter(l => l.changed);
                // console.log(compared);
                // console.log(`Compared length: ${compared.length}`)
                if (compared.length > 0) {
                    console.log("Writing to file...");
                    fs.writeFile("./items.json", JSON.stringify(items, null, 4), (err) => {
                        if (err) throw err;
                    });
                }
                resolve(compared);
            });
        });
    });
};

export { checkItems };
