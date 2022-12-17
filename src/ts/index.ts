import '../scss/style.scss';
import { Products } from './types';
import { getAllProducts, getProductsWithParams, getCurrentFilterInfo } from './productsInfo';
import { showBrandsFilter, showCategoryFilter, showPriceFilter, showStockFilter } from './appView';

let productsArrayRaw: Products[];

window.onload = windowLoad;

function windowLoad(): void {
    productsArrayRaw = getAllProducts();
    const search: string = window.location.search;
    const urlSearchParams: URLSearchParams = new URLSearchParams(search);
    const productsArray = getProductsWithParams(urlSearchParams);
    const [
        categoriesNamesSet,
        brandsNamesSet,
        minPrice,
        maxPrice,
        minStock,
        maxStock,
        categoriesMapCurrentCount,
        brandsMapCurrentCount,
    ] = getCurrentFilterInfo(productsArray);

    showCategoryFilter(categoriesNamesSet as string[], categoriesMapCurrentCount as Map<string, number>);
    showBrandsFilter(brandsNamesSet as string[], brandsMapCurrentCount as Map<string, number>);
    showPriceFilter(minPrice as number, maxPrice as number);
    showStockFilter(minStock as number, maxStock as number);
    // const path: any = window.location.pathname;
}
