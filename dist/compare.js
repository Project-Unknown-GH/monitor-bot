"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const compareSingle = (past, now) => {
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
        return {
            ...compareSingle(l, past[index]), ...{
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
