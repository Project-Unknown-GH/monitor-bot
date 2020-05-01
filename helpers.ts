type Available = "Available" | "Sold out"

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
