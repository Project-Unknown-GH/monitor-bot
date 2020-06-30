import { Item } from "./helpers";
import { CompareArrData, compareArrs, filterData } from "./compare";

import * as fs from "fs";
import { getItems } from "./getData";
const checkItems = async (sizes: string[] = [], proxy: string | null = null, filters: string[] = [], filename: string = "items"): Promise<CompareArrData[]> => {
    return new Promise((resolve, reject) => {
	    console.log("Filename: " + filename);
        getItems('all', proxy, (rawItems: Item[], err: unknown) => {
            if (typeof rawItems  === "string") {
		console.log(`Error: ${rawItems}`);
                resolve([]);
            } else {
	        const items = filters.length === 0 ? rawItems : filterData(rawItems, filters);
                console.log(items.length, typeof items);
                if (err) {
                    console.error(err);
                    reject(err);
                }
                console.log(new Date());
                console.log("Reading items...");
                fs.readFile(`./${filename}.json`, "utf-8", (err, data) => {
                    if (err) throw err;
                    console.log("Items read...");
                    try {
                        console.log("Comparing...");
                        const trueData = JSON.parse(data);
                        console.log(Object.keys(items).length > 0 && Object.keys(trueData).length > 0)
                        const compared = (() => {
                            if (Object.keys(items).length > 0 && Object.keys(trueData).length > 0) {
                                return compareArrs(trueData, items, sizes).filter(l => l.changed);
                            } else {
                                return []
                            }
                        })();
// console.log(compared);
                        console.log(`Compared length: ${compared.length}`)
                        console.log(compared.length > 0 || Object.keys(trueData).length !== Object.keys(items).length);
                        if (compared.length > 0 || Object.keys(trueData).length !== Object.keys(items).length) {
                            console.log("Writing to file...");
                            fs.writeFile(`./${filename}.json`, JSON.stringify(items, null, 4), (err) => {
                                if (err) throw err;
                            });
                        }
                        resolve(compared);
                    } catch (e) {
                        console.log("We errored :(");
                        fs.writeFile(`./${filename}.json`, JSON.stringify(items, null, 4), (err) => {
                            if (err) throw err
                        });
                        console.error(e);
                    }
                });
            }
        });
    });
};

export { checkItems };
