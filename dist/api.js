"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkItems = void 0;
const compare_1 = require("./compare");
const fs = __importStar(require("fs"));
const getData_1 = require("./getData");
const checkItems = async (sizes = [], proxy = null, filters = [], filename = "items") => {
    console.log(`Using ${proxy} as proxy!`);
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
