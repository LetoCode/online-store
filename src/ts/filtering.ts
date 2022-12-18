import { getAllProducts, getProductsWithParams, getCurrentFilterInfo } from './getProducts';
import { Products } from './types';
import { showBrandsFilter, showCategoryFilter, showPriceFilter, showStockFilter } from './filters-grid';
import { showProducts } from './products-grid';

//=============================listen history changes and use filers if they were==================
// let oldLength: number;
// listen(window.history.length);
// oldLength = -1;
// function listen(currentLength: number) {
//    if (currentLength != oldLength) {
//       updateProducts();

//       console.log('routing here225');
//    }

//    oldLength = window.history.length;
//    setInterval(function () {
//       listen(window.history.length);
//    }, 1000);
// }
export const productsArrayRaw: Products[] = getAllProducts();

export function renderAllFilers() {
    //get all info about products and show all fiters and product list

    const [
        categoriesNamesSet,
        brandsNamesSet,
        minPrice,
        maxPrice,
        minStock,
        maxStock,
        categoriesMapCurrentCount,
        brandsMapCurrentCount,
    ] = getCurrentFilterInfo(productsArrayRaw);

    showCategoryFilter(categoriesNamesSet as string[], categoriesMapCurrentCount as Map<string, number>);
    showBrandsFilter(brandsNamesSet as string[], brandsMapCurrentCount as Map<string, number>);
    showPriceFilter(minPrice as number, maxPrice as number);
    showStockFilter(minStock as number, maxStock as number);

    showProducts(productsArrayRaw);
}

export function updateFiltersView() {
    const search: string = window.location.search;
    console.log('here');
    if (search) {
        const params: URLSearchParams = new URLSearchParams(search);
        const paramsKeys: string[] = Array.from(params.keys());
        const paramsValues: string[] = Array.from(params.values());
        // params.forEach((value, key) => {
        //    if (key !== 'price' && key !== 'stock') { [value, key] = [key, value]; }

        // });
        const categories: NodeListOf<Element> = document.querySelectorAll(
            '#category-filter .filter-block__body__element input'
        )!;
        const brands: NodeListOf<Element> = document.querySelectorAll(
            '#brand-filter .filter-block__body__element input'
        )!;

        console.log(categories);
        for (const el in categories) {
            if (el in paramsKeys && el in paramsValues) {
                // (el as HTMLInputElement).checked = true;
                //console.log(el)
            } else {
                // el.checked = false;
            }
        }
    } else {
        renderAllFilers();
    }
}

export function updateProducts() {
    const search: string = window.location.search;
    if (search) {
        let filteredProducts: Products[] = productsArrayRaw;
        const params: URLSearchParams = new URLSearchParams(search);
        const categoryParams: string[] = [];
        const brandParams: string[] = [];
        let priceParams: string[] = [];
        let stockParams: string[] = [];
        params.forEach((value, key) => {
            if (key !== 'price' && key !== 'stock') {
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
        showProducts(filteredProducts);
    } else {
        showProducts(productsArrayRaw);
    }
}
