import { addBtnListeners } from '..';
import { restoreCart } from '../view/showCartDataOnMainPage';
import { updateProducts } from '../view/updateViewQueryParams';
import { filteredProducts } from '../view/updateViewQueryParams';
import { updateFilterFoundView } from './getProductsData';
import { checkCountAllProductsAndUpdateCountOnPage } from './listenFilterCheckBox';

document.addEventListener('change', (event) => {
    if (
        (event.target as HTMLElement).id === 'fromSlider-stock' ||
        (event.target as HTMLElement).id === 'toSlider-stock' ||
        (event.target as HTMLElement).id === 'fromSlider-price' ||
        (event.target as HTMLElement).id === 'toSlider-price'
    ) {
        inputRangeFilter(event);
    }
});

function inputRangeFilter(event: Event): void {
    let minValue = '';
    let maxValue = '';
    let value = '';
    let key = '';

    if ((event.target as HTMLInputElement).dataset.filterKey === 'price') {
        const fromSlider: HTMLInputElement | null = document.getElementById('fromSlider-price') as HTMLInputElement;
        if (fromSlider) {
            minValue = fromSlider.value;
        }
        const toSlider: HTMLInputElement | null = document.getElementById('toSlider-price') as HTMLInputElement;
        if (toSlider) {
            maxValue = toSlider.value;
        }
        key = 'price';
    }

    if ((event.target as HTMLInputElement).dataset.filterKey === 'stock') {
        const fromSlider: HTMLInputElement | null = document.getElementById('fromSlider-stock') as HTMLInputElement;
        if (fromSlider) {
            minValue = fromSlider.value;
        }
        const toSlider: HTMLInputElement | null = document.getElementById('toSlider-stock') as HTMLInputElement;
        if (toSlider) {
            maxValue = toSlider.value;
        }
        key = 'stock';
    }
    value = `${minValue}*${maxValue}`;

    const url = createQueryUrlForRange(key, value);
    window.history.pushState({}, '', url);
    updateProducts();
    restoreCart();
    updateFilterFoundView();
    addBtnListeners();

    if ((event.target as HTMLInputElement).dataset.filterKey === 'price') {
        checkAllProductsAndUpdateSliderStock();
    }
    if ((event.target as HTMLInputElement).dataset.filterKey === 'stock') {
        checkAllProductsAndUpdateSliderPrice();
    }
    checkCountAllProductsAndUpdateCountOnPage();
}

export function createQueryUrlForRange(key: string, value: string): string {
    const firstURL: string = window.location.href.split('?')[0];
    const search: string = window.location.search;
    let params: URLSearchParams;

    if (search) {
        params = new URLSearchParams(search);
    } else {
        params = new URLSearchParams();
        params.append('index', 'page');
    }
    params.delete(key);
    params.append(key, value);

    let result: string;
    if (params.toString().length === 0) {
        result = firstURL;
    } else {
        result = `${firstURL}?${params.toString()}`;
    }

    return result;
}

export function checkAllProductsAndUpdateSliderPrice(): void {
    const priceArr: number[] = filteredProducts.map((el) => el.price);
    const fromSliderPrice: HTMLInputElement | null = document.getElementById('fromSlider-price') as HTMLInputElement;
    const toSliderPrice: HTMLInputElement | null = document.getElementById('toSlider-price') as HTMLInputElement;
    const minPriceEl: HTMLElement | null = document.querySelector('#min-price');
    const maxPriceEl: HTMLElement | null = document.querySelector('#max-price');
    if (fromSliderPrice && minPriceEl) {
        fromSliderPrice.value = Math.min(...priceArr).toString();
        minPriceEl.innerText = `€${Math.min(...priceArr).toString()}`;
    }
    if (toSliderPrice && maxPriceEl) {
        toSliderPrice.value = Math.max(...priceArr).toString();
        maxPriceEl.innerText = `€${Math.max(...priceArr).toString()}`;
    }
}

export function checkAllProductsAndUpdateSliderStock(): void {
    const stockArr: number[] = filteredProducts.map((el) => el.stock);
    const fromSliderStock: HTMLInputElement | null = document.getElementById('fromSlider-stock') as HTMLInputElement;
    const toSliderStock: HTMLInputElement | null = document.getElementById('toSlider-stock') as HTMLInputElement;
    const minStockEl: HTMLElement | null = document.querySelector('#min-stock');
    const maxStockEl: HTMLElement | null = document.querySelector('#max-stock');
    if (fromSliderStock && minStockEl) {
        minStockEl.innerText = fromSliderStock.value = Math.min(...stockArr).toString();
    }
    if (toSliderStock && maxStockEl) {
        maxStockEl.innerText = toSliderStock.value = Math.max(...stockArr).toString();
    }
}
