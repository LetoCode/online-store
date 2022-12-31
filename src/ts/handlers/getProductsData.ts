import products from '../data/products.json';
import { Products } from '../types/types';
import { productsArrayRaw } from '../index';

export function getAllProducts(): Products[] {
    return Object.values(products)[0];
}

export function getProductsWithParams(key: string, value: string[], products: Products[]): Products[] {
    let result: Products[];
    if (products.length === 0) {
        products = productsArrayRaw;
    }

    if (key === 'price' || key === 'stock') {
        const minValue: number = +value[0];
        const maxValue: number = +value[1];
        result = products.filter((el) => {
            if (
                (el[key as keyof Products] as number) >= minValue &&
                (el[key as keyof Products] as number) <= maxValue
            ) {
                return el;
            }
        });
    } else {
        result = products.filter((el) => {
            if (value.includes(el[key as keyof Products] as string)) {
                return el;
            }
        });
    }

    return result;
}

export function getCurrentFilterInfo(productsArray: Products[]) {
    const categoriesNames: string[] = [];
    const brandsNames: string[] = [];
    const prices: number[] = [];
    const stocks: number[] = [];

    productsArray.forEach((el) => {
        categoriesNames.push(el.category);
        brandsNames.push(el.brand);
        prices.push(el.price);
        stocks.push(el.stock);
    });

    const categoriesNamesSet = Array.from(new Set(categoriesNames));
    const brandsNamesSet = Array.from(new Set(brandsNames));
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const minStock = Math.min(...stocks);
    const maxStock = Math.max(...stocks);
    const categoriesMapCurrentCount: Map<string, number> = new Map();
    const brandsMapCurrentCount: Map<string, number> = new Map();

    categoriesNames.forEach((el) => {
        const arr = productsArray.filter((arrEl) => {
            return arrEl.category === el;
        });
        categoriesMapCurrentCount.set(el, arr.length);
    });

    brandsNames.forEach((el) => {
        const arr = productsArray.filter((arrEl) => {
            return arrEl.brand === el;
        });
        brandsMapCurrentCount.set(el, arr.length);
    });

    return [
        categoriesNamesSet,
        brandsNamesSet,
        minPrice,
        maxPrice,
        minStock,
        maxStock,
        categoriesMapCurrentCount,
        brandsMapCurrentCount,
    ];
}

export function getStockOfProduct(id: number): number {
    const el: Products | undefined = productsArrayRaw.find((el) => el.id === id);
    return el ? el.stock : 0;
}
