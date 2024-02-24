export enum Currency {
    EUR = 0,
    USD = 1
}

export const mapToCurrency = (value: string): Currency => {
    const currencyKey = value as keyof typeof Currency;

    if (currencyKey in Currency) {
        return Currency[currencyKey];
    } else {
        throw new Error(`Invalid currency value: ${value}`);
    }
};
