import { getProductsWithParams } from '../handlers/getProductsData';
import { Products } from '../types/types';
import { showPriceFilter, showStockFilter } from './showFiltersView';
import { showProducts } from './productsGrid';
import { productsArrayRaw } from '../index';
import { renderAllFilters } from './showFiltersView';
import { sorting } from '../handlers/listenSorting';

//=============================listen history changes and use filers if they were==================
export let filteredProducts: Products[];
let bigMode: boolean;

export function updateFiltersView(): void {
    //if query parameters are, then we have to update our filters
    const search: string = window.location.search;
    const categories: NodeListOf<Element> = document.querySelectorAll(
        '#category-filter .filter-block__body__element input'
    );
    const brands: NodeListOf<Element> = document.querySelectorAll('#brand-filter .filter-block__body__element input');
    const searchInput: HTMLInputElement | null = document.querySelector('.sort__search-input');
    if (search) {
        const params: URLSearchParams = new URLSearchParams(search);
        const paramsKeys: string[] = Array.from(params.keys());
        const paramsValues: string[] = Array.from(params.values());

        //category
        if (categories) {
            for (const el of categories) {
                if (paramsKeys.includes(el.id) && paramsValues.includes('category')) {
                    (el as HTMLInputElement).checked = true;
                } else {
                    (el as HTMLInputElement).checked = false;
                }
            }
        }

        //brands
        if (brands) {
            for (const el of brands) {
                if (paramsKeys.includes(el.id) && paramsValues.includes('brand')) {
                    (el as HTMLInputElement).checked = true;
                } else {
                    (el as HTMLInputElement).checked = false;
                }
            }
        }

        //price
        if (paramsKeys.includes('price')) {
            const diapason: string | null = params.get('price');
            if (diapason) {
                const minValue = +diapason.split('*')[0];
                const maxValue = +diapason.split('*')[1];
                showPriceFilter(minValue as number, maxValue as number, false);
            }
        }
        //stock
        if (paramsKeys.includes('stock')) {
            const diapason: string | null = params.get('stock');
            if (diapason) {
                const minValue = +diapason.split('*')[0];
                const maxValue = +diapason.split('*')[1];
                showStockFilter(minValue as number, maxValue as number, false);
            }
        }

        // search
        if (paramsKeys.includes('search')) {
            const valueInd = paramsKeys.indexOf('search');
            if (searchInput) {
                searchInput.value = paramsValues[valueInd];
            }
        }

        // view mode
        if (search.includes('big=false')) {
            bigMode = false;
        }
    } else {
        for (const el of categories) {
            (el as HTMLInputElement).checked = false;
        }
        for (const el of brands) {
            (el as HTMLInputElement).checked = false;
        }
        renderAllFilters();
    }
}

export function updateProducts(): void {
    //if query parameters are, then we have to update our products' list
    const search: string = window.location.search;
    filteredProducts = productsArrayRaw;
    if (search) {
        const params: URLSearchParams = new URLSearchParams(search);
        const categoryParams: string[] = [];
        const brandParams: string[] = [];
        const searchParams: string[] = [];
        let priceParams: string[] = [];
        let stockParams: string[] = [];
        params.forEach((value, key) => {
            if (key !== 'price' && key !== 'stock' && key !== 'search' && key !== 'big') {
                [value, key] = [key, value];
            }
            if (key === 'category') {
                categoryParams.push(value);
            }
            if (key === 'brand') {
                brandParams.push(value);
            }
            if (key === 'price') {
                priceParams = [value.split('*')[0], value.split('*')[1]];
            }
            if (key === 'stock') {
                stockParams = [value.split('*')[0], value.split('*')[1]];
            }
            if (key === 'search') {
                searchParams.push(value);
            }
            if (key === 'big' && value === 'false') {
                bigMode = false;
            }
            if (key === 'big' && value === 'true') {
                bigMode = true;
            }
        });

        if (categoryParams.length > 0) {
            filteredProducts = getProductsWithParams('category', categoryParams, filteredProducts);
        }
        if (brandParams.length > 0) {
            filteredProducts = getProductsWithParams('brand', brandParams, filteredProducts);
        }
        if (priceParams.length > 0) {
            filteredProducts = getProductsWithParams('price', priceParams, filteredProducts);
        }
        if (stockParams.length > 0) {
            filteredProducts = getProductsWithParams('stock', stockParams, filteredProducts);
        }
        if (searchParams.length > 0) {
            filteredProducts = getProductsWithParams('search', searchParams, filteredProducts);
        }
        showProducts(filteredProducts, sorting, bigMode);
    } else {
        showProducts(productsArrayRaw, sorting, bigMode);
    }
}
