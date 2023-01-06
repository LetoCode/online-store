import { addBtnListeners } from '..';
import { restoreCart } from '../view/showCartDataOnMainPage';
import { updateProducts } from '../view/updateViewQueryParams';

document.addEventListener('input', (event: Event) => {
    const target: HTMLInputElement | null = (event.target as HTMLElement).closest('.sort__search-input');
    if (target) {
        const url = createQueryUrlForSearch(target);
        window.history.pushState({}, '', url);
        updateProducts();
        restoreCart();
        addBtnListeners();
    }
});

function createQueryUrlForSearch(target: HTMLInputElement): string {
    const fullURL: string = window.location.href;
    const firstURL: string = fullURL.split('?')[0];
    const search: string = window.location.search;
    const key = 'search';
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
    } else {
        params.delete(key);
    }

    if (params.toString().length === 0) {
        result = firstURL;
    } else {
        result = `${firstURL}?${params.toString()}`;
    }

    return result;
}
