import { Item } from "./helpers";
import { compareArrs } from "./compare";

import * as supreme from "supreme-api";
import * as fs from "fs";

const checkItems = () => {
    supreme.getItems('all', (items: Item[], err) => {
        if (err) {
            console.error(err);
            return err;
        }
        console.log("Data retrieved.");
        fs.readFile("items.json", "utf-8", (err, data) => {
            if (err) throw err;
            const trueData = JSON.parse(data);
            const compared = compareArrs(trueData, items).filter(l => l.changed === true);
            console.log(compared);
            fs.writeFile("items.json", JSON.stringify(items), (err) => {
                if (err) throw err;
                console.log("Wrote to the file!");
            });
        });
    });
}
