"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const compare_1 = require("./compare");
const fs = __importStar(require("fs"));
const getData_1 = require("./getData");
const checkItems = async (sizes = [], proxy = null, filters = [], filename = "items") => {
    return new Promise((resolve, reject) => {
        console.log("Filename: " + filename);
        getData_1.getItems('all', proxy, (rawItems, err) => {
            if (typeof rawItems === "string") {
                console.log(`Error: ${rawItems}`);
                resolve([]);
            }
            else {
                const items = filters.length === 0 ? rawItems : compare_1.filterData(rawItems, filters);
                console.log(items.length, typeof items);
                if (err) {
                    console.error(err);
                    reject(err);
                }
                console.log(new Date());
                console.log("Reading items...");
                fs.readFile(`./${filename}.json`, "utf-8", (err, data) => {
                    if (err)
                        throw err;
                    console.log("Items read...");
                    try {
                        console.log("Comparing...");
                        const trueData = JSON.parse(data);
                        console.log(Object.keys(items).length > 0 && Object.keys(trueData).length > 0);
                        const compared = (() => {
                            if (Object.keys(items).length > 0 && Object.keys(trueData).length > 0) {
                                return compare_1.compareArrs(trueData, items, sizes).filter(l => l.changed);
                            }
                            else {
                                return [];
                            }
                        })();
                        // console.log(compared);
                        console.log(`Compared length: ${compared.length}`);
                        console.log(compared.length > 0 || Object.keys(trueData).length !== Object.keys(items).length);
                        if (compared.length > 0 || Object.keys(trueData).length !== Object.keys(items).length) {
                            console.log("Writing to file...");
                            fs.writeFile(`./${filename}.json`, JSON.stringify(items, null, 4), (err) => {
                                if (err)
                                    throw err;
                            });
                        }
                        resolve(compared);
                    }
                    catch (e) {
                        console.log("We errored :(");
                        fs.writeFile(`./${filename}.json`, JSON.stringify(items, null, 4), (err) => {
                            if (err)
                                throw err;
                        });
                        console.error(e);
                    }
                });
            }
        });
    });
};
exports.checkItems = checkItems;
