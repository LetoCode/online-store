import products from './products.json';
import { Products } from './types';

export function getAllProducts() {
    return Object.values(products)[0];
}

export function getProductsWithParams(urlSearchParams: URLSearchParams): Products[] {
    let productsArray: Products[];

    productsArray = getAllProducts();
    // urlSearchParams.forEach((value, key) => {
    //    productsArray = productsArrayRaw.filter(el => {
    //       return el[key] === value;
    //    })
    // });
    // console.log(productsArray);
    return productsArray;
}

export function getCurrentFilterInfo(productsArray: Products[]) {
    const categoriesNames: string[] = [];
    const brandsNames: string[] = [];
    const prices: number[] = [];
    const stocks: number[] = [];
    //let categories: Products[];

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
