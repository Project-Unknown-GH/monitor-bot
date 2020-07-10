"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterData = exports.compareArrs = exports.compareSingle = void 0;
const compareSingle = (past, now) => {
    // console.log(`${past.availability}|${now.availability}\n${past.link}|${now.link}`);
    if (past.link === now.link) {
        return {
            changed: past.availability !== now.availability,
            status: now.availability,
        };
    }
    else {
        return {
            changed: false,
            status: "Sold Out",
        };
    }
};
exports.compareSingle = compareSingle;
const compareArrs = (past, now, sizes) => {
    // console.log(past[0]);
    // console.log(now[0]);
    if (!past.sort || !now.sort) {
        return [];
    }
    if (!Array.isArray(past)) {
        return [];
    }
    past.sort((a, b) => {
        const link1 = a.link.toLowerCase();
        const link2 = b.link.toLowerCase();
        return link1 < link2 ? -1 : Number(link1 > link2);
    });
    if (!Array.isArray(now)) {
        return [];
    }
    now.sort((a, b) => {
        const link1 = a.link.toLowerCase();
        const link2 = b.link.toLowerCase();
        return link1 < link2 ? -1 : Number(link1 > link2);
    });
    // const filtered = now.filter((l, index) => {
    //     if (l.title === "Woven Toggle Shirt") {
    //         // console.log({...compareSingle(l, past[index]), ...{
    //         //         title: now[index].title,
    //         //         desc: now[index].description,
    //         //         style: now[index].style,
    //         //         price: now[index].price,
    //         //         link: now[index].link,
    //         //         image: now[index].image,
    //         //     }});
    //         // console.log(l.title, l.sizesAvailable !== null ? areSizesInArr(sizes, l.sizesAvailable) : true, sizes, l.sizesAvailable);
    //     }
    //     return (l.sizesAvailable !== null ? areSizesInArr(sizes, l.sizesAvailable) : true);
    // });
    return now.map((l, index) => {
        const pastItem = past.find(j => j.link === l.link);
        // console.log(!!pastItem)
        return {
            ...compareSingle(l, pastItem !== null && pastItem !== void 0 ? pastItem : l),
            ...{
                title: now[index].title,
                desc: now[index].description,
                style: now[index].style,
                price: now[index].price,
                link: now[index].link,
                image: now[index].image,
            },
        };
    });
};
exports.compareArrs = compareArrs;
const filterData = (arr, filters) => {
    console.log(arr);
    return arr.filter(l => l.title.split(" ").map(j => j.toLowerCase()).some(j => filters.map(i => i.toLowerCase()).includes(j)));
};
exports.filterData = filterData;
