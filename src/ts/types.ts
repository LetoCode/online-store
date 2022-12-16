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

export interface SearchParameters {
    category?: string;
    price?: string;
    search?: string;
    brand?: string;
    stock?: string;
}
