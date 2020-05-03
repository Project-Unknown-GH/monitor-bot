"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isSizeInArr = (size, sizes) => {
    for (const item of sizes) {
        if (size.toLowerCase() === item.size.toLowerCase()) {
            return true;
        }
    }
    return false;
};
const areSizesInArr = (sizes, available) => {
    if (sizes.length === 0) {
        return true;
    }
    for (const size of sizes) {
        if (isSizeInArr(size, available)) {
            return true;
        }
    }
    return false;
};
exports.areSizesInArr = areSizesInArr;
