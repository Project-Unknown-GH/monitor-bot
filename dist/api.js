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
const checkItems = async (sizes = []) => {
    return new Promise((resolve, reject) => {
        getData_1.getItems('all', (items, err) => {
            if (err) {
                console.error(err);
                reject(err);
            }
            console.log("Reading items...");
            console.log(Array.isArray(items) ? "" : items);
            fs.readFile("./items.json", "utf-8", (err, data) => {
                if (err)
                    throw err;
                console.log("Items read...");
                const trueData = JSON.parse(data);
                const compared = compare_1.compareArrs(trueData, items, sizes).filter(l => l.changed);
                // console.log(compared);
                // console.log(`Compared length: ${compared.length}`)
                if (compared.length > 0) {
                    console.log("Writing to file...");
                    fs.writeFile("./items.json", JSON.stringify(items, null, 4), (err) => {
                        if (err)
                            throw err;
                    });
                }
                resolve(compared);
            });
        });
    });
};
exports.checkItems = checkItems;
