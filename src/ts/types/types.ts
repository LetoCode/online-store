export interface Products {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}

export interface categories {
    category: string;
    amount: number;
}

export interface SearchParameters {
    category?: string;
    price?: string;
    search?: string;
    brand?: string;
    stock?: string;
}

export type FilterInfo = number | string[] | Map<string, number>;

export type promoCodesInfo = {
    name: string;
    description: string;
    value: number;
};

export type images = {
    url: string;
    fileSize: string | undefined;
};
