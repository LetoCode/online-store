document.getElementById('fromSlider-stock')?.addEventListener('change', inputRangeFilter);
document.getElementById('toSlider-stock')?.addEventListener('change', inputRangeFilter);
document.getElementById('fromSlider-price')?.addEventListener('change', inputRangeFilter);
document.getElementById('toSlider-price')?.addEventListener('change', inputRangeFilter);

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
    return `${firstURL}?${params.toString()}`;
}
