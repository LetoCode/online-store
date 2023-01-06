import { addBtnListeners } from '..';
import { restoreCart } from '../view/showCartDataOnMainPage';
import { updateProducts } from '../view/updateViewQueryParams';

document.addEventListener('change', (event: Event) => {
    const target: HTMLSelectElement | null = (event.target as HTMLElement).closest('.sort__select');
    if (target) {
        const url = createQueryUrlForSorting(target);
        window.history.pushState({}, '', url);
        updateProducts();
        restoreCart();
        addBtnListeners();
    }
});

function createQueryUrlForSorting(target: HTMLSelectElement): string {
    const fullURL: string = window.location.href;
    const firstURL: string = fullURL.split('?')[0];
    const search: string = window.location.search;
    const key = 'sort';
    const value: string | undefined = target.value;
    let params: URLSearchParams;
    let result = '';

    if (search) {
        params = new URLSearchParams(search);
    } else {
        params = new URLSearchParams();
        params.append('index', 'page');
    }
    if (key && value) {
        params.set(key, value);

        if (params.toString().length === 0) {
            result = firstURL;
        } else {
            result = `${firstURL}?${params.toString()}`;
        }
    }
    return result;
}
