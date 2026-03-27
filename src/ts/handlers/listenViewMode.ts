import { addBtnListeners } from '..';
import { restoreCart } from '../view/showCartDataOnMainPage';
import { updateProducts } from '../view/updateViewQueryParams';

document.addEventListener('click', (event: Event) => {
    const target: HTMLElement | null = (event.target as HTMLElement).closest('.sort__view-small');
    if (target) {
        const url = createQueryUrlForViewMode(false);
        window.history.pushState({}, '', url);
        updateProducts();
        restoreCart();
        addBtnListeners();
    }
});

document.addEventListener('click', (event: Event) => {
    const target: HTMLElement | null = (event.target as HTMLElement).closest('.sort__view-big');
    if (target) {
        const url = createQueryUrlForViewMode(true);
        window.history.pushState({}, '', url);
        updateProducts();
        restoreCart();
        addBtnListeners();
    }
});

function createQueryUrlForViewMode(bigMode: boolean): string {
    const fullURL: string = window.location.href;
    const firstURL: string = fullURL.split('?')[0];
    const search: string = window.location.search;
    const key = 'big';
    const value = bigMode.toString();
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
    }

    if (params.toString().length === 0) {
        result = firstURL;
    } else {
        result = `${firstURL}?${params.toString()}`;
    }

    return result;
}
