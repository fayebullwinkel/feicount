export enum Category {
    Reise = 0,
    Haushalt = 1,
    Paar = 2,
    Veranstaltung = 3,
    Projekt = 4,
    Freundesgruppe = 5,
    Sonstige = 6
}

export const mapToCategory = (value: string): Category => {
    const currencyKey = value as keyof typeof Category;

    if (currencyKey in Category) {
        return Category[currencyKey];
    } else {
        throw new Error(`Invalid currency value: ${value}`);
    }
};