import { Item } from "./helpers";

interface CompareData {
    changed: boolean,
    status: "Available" | "Sold Out"
}

interface CompareArrData extends CompareData {
    link: string;
}

const compareSingle = (past: Item, now: Item): CompareData => {
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
        const link1 = a.link.toLowerCase();
        const link2 = b.link.toLowerCase();
        return link1 < link2 ? -1 : Number(link1 > link2);
    });
    now.sort((a, b) => {
        const link1 = a.link.toLowerCase();
        const link2 = b.link.toLowerCase();
        return link1 < link2 ? -1 : Number(link1 > link2);
    });
    return past.map((l, index) => {
        return {...compareSingle(l, now[index]), ...{link: now[index].link}}
    });
};

export { compareSingle, compareArrs, CompareArrData };
