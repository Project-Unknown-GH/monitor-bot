import { compareSingle } from "../src/compare";
import { Item } from "../src/helpers";

import { expect } from "chai";

describe('Compare single', function () {
    const templateItem: Omit<Item, "availability"> = {
        "title": "Le shirt",
        "style": "Violet",
        "link": "http://www.supremenewyork.com/shop/sweatshirts/al1qigtzr/iki14srab",
        "description": "Cotton fleece with cutout logo appliqué at chest. ",
        "addCartURL": "blah.com",
        "price": 158,
        "image": "https://assets.supremenewyork.com/188962/vi/hZiiM3_KhGM.jpg",
        "sizesAvailable": [],
        "images": [
            "https://assets.supremenewyork.com/188962/zo/hZiiM3_KhGM.jpg",
        ]
    };
    describe('Availability does not change', function () {
        it('Should return sold out if it is still sold out', function () {
            const item: Item = {...templateItem, ...{availability: "Sold Out"}};
            expect(compareSingle(item, item)).to.deep.equal({changed: false, status: "Sold Out"});
        });
        it('Should return available if it is still available', function () {
            const item: Item = {...templateItem, ...{availability: "Available"}};
            expect(compareSingle(item, item)).to.deep.equal({changed: false, status: "Available"});
        });
    });
    describe('Availability changes', function () {
        const soldItem: Item = {...templateItem, ...{availability: "Sold Out"}};
        const availItem: Item = {...templateItem, ...{availability: "Available"}};
        it('Should return change from sold to available', function () {
            expect(compareSingle(soldItem, availItem)).to.deep.equal({changed: true, status: "Available"});
        });
        it('Should return change from sold to available', function () {
            expect(compareSingle(availItem, soldItem)).to.deep.equal({changed: true, status: "Sold Out"});
        });
    });
});
