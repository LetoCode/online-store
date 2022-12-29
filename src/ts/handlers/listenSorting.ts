import { updateProducts } from '../view/updateViewQueryParams';

export let sorting = 'none';

document.addEventListener('change', (event: Event) => {
    const target: HTMLSelectElement | null = (event.target as HTMLElement).closest('.sort__select');
    if (target) {
        const url = createQueryUrlForSorting(target);
        window.history.pushState({}, '', url);
        updateProducts();
    }
});

function createQueryUrlForSorting(target: HTMLSelectElement): string {
    const fullURL: string = window.location.href;
    const firstURL: string = fullURL.split('?')[0];
    const search: string = window.location.search;
    const key: string | undefined = target.value;
    const value = 'sort';
    let params: URLSearchParams;
    let result = '';
    sorting = key;

    if (search) {
        params = new URLSearchParams(search);
    } else {
        params = new URLSearchParams();
    }
    if (key && value) {
        params.set(value, key);

        if (params.toString().length === 0) {
            result = firstURL;
        } else {
            result = `${firstURL}?${params.toString()}`;
        }
    }
    return result;
}
