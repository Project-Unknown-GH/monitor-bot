type Available = "Available" | "Sold Out"

interface Item {
    title: string,
    style: string,
    link: string,
    description: string,
    addCartURL: string,
    price: number,
    image: string,
    sizesAvailable: number,
    images: string[],
    availability: Available,
}

export { Item }
