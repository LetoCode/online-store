import { updateProducts } from '../view/updateViewQueryParams';

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

function inputRangeFilter(event: Event) {
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
}

function createQueryUrlForRange(key: string, value: string): string {
    const firstURL: string = window.location.href.split('?')[0];
    const search: string = window.location.search;
    let params: URLSearchParams;

    if (search) {
        params = new URLSearchParams(search);
    } else {
        params = new URLSearchParams();
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
