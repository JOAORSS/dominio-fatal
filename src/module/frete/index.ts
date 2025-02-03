interface Frete {
    name: string,
    price: number,
    delivery_range: {min: number, max: number},
    status: number,
}

export default Frete;