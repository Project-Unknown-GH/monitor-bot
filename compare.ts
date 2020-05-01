import { Item } from "./helpers";

interface CompareData {
    changed: boolean,
    status: "Available" | "Sold Out"
}

interface CompareArrData extends CompareData {
    link: string;
}

const compareSingle = (past: Item, now: Item): CompareData => {
    // console.log(`${past.link}\n${now.link}\n\n`);
    if (past.link === now.link) {
        return {
            changed: past.availability !== now.availability,
            status: now.availability,
        };
    } else {
        return {
            changed: false,
            status: "Sold Out"
        }
    }
};

const compareArrs = (past: Item[], now: Item[]): CompareArrData[] => {
    past.sort((a, b) => {
        const link1 = a.link.toLowerCase(); // ignore upper and lowercase
        const link2 = b.link.toLowerCase(); // ignore upper and lowercase
        return link1 < link2 ? -1 : Number(link1 > link2);
    });
    now.sort((a, b) => {
        const link1 = a.link.toLowerCase(); // ignore upper and lowercase
        const link2 = b.link.toLowerCase(); // ignore upper and lowercase
        return link1 < link2 ? -1 : Number(link1 > link2);
    });
    console.log(`${past.length}|${now.length}`);
    return past.map((l, index) => {
        return {...compareSingle(l, now[index]), ...{link: now[index].link}}
    });
};

export { compareSingle, compareArrs };
