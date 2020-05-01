import { areSizesInArr, Item } from "./helpers";

interface CompareData {
    changed: boolean,
    status: "Available" | "Sold Out"
}

interface CompareArrData extends CompareData {
    title: string,
    desc: string,
    style: string,
    price: number
    link: string,
    image: string
}

const compareSingle = (past: Item, now: Item): CompareData => {
    if (past.link === now.link) {
        return {
            changed: past.availability !== now.availability,
            status: now.availability,
        }
    } else {
        return {
            changed: false,
            status: "Sold Out",
        }
    }
};

const compareArrs = (past: Item[], now: Item[], sizes: string[]): CompareArrData[] => {
    // console.log(past[0]);
    // console.log(now[0]);
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
    return now
        .filter(l => l.sizesAvailable !== null ? areSizesInArr(sizes, l.sizesAvailable) : true)
        .map((l, index) => {
            return {
                ...compareSingle(l, past[index]), ...{
                    title: now[index].title,
                    desc: now[index].description,
                    style: now[index].style,
                    price: now[index].price,
                    link: now[index].link,
                    image: now[index].image,
                },
            }
        });
};

export { compareSingle, compareArrs, CompareArrData };
