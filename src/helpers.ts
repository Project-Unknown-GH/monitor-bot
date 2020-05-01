type Available = "Available" | "Sold Out"

interface Size {
    id: number,
    size: string
}

interface Item {
    title: string,
    style: string,
    link: string,
    description: string,
    addCartURL: string,
    price: number,
    image: string,
    sizesAvailable: Size[],
    images: string[],
    availability: Available,
}

const isSizeInArr = (size: string, sizes: Size[]) => {
    for (const item of sizes) {
        if (size.toLowerCase() === item.size.toLowerCase()) {
            return true;
        }
    }
    return false;
};

const areSizesInArr = (sizes: string[], available: Size[]) => {
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

export { Item, Size, areSizesInArr }
