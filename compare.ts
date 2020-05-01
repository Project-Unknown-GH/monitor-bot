import { Item } from "./helpers";

interface CompareData {
    changed: boolean,
    status: "Available" | "Sold out"
}

const compareSingle = (past: Item, now: Item): CompareData => ({
    changed: past.availability === now.availability,
    status: past.availability,
});

const compareArrs = (past: Item[], now: Item[]): CompareData[] => past.map((l, index) => compareSingle(l, now[index]));

export { compareArrs };
