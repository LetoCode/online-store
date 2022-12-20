import { updateProducts } from './filtering';
import { filteredProducts } from './filtering';
import { Products } from './types';

document.addEventListener('click', (event: MouseEvent) => {
    let mode = 'del';

    if ((event.target as HTMLElement).closest('.route_filter')) {
        if ((event.target as HTMLInputElement).checked) {
            mode = 'add';
        }
        const target: HTMLElement | null = (event.target as HTMLElement).closest('.route_filter');
        if (target) {
            const url = createQueryUrlForCheckbox(target, mode);
            window.history.pushState({}, '', url);
            updateProducts();
            checkCountAllProductsAndUpdateCountOnPage();
        }
    }
});

function createQueryUrlForCheckbox(target: HTMLElement, mode: string): string {
    const firstURL: string = window.location.href.split('?')[0];
    const search: string = window.location.search;
    const key: string | undefined = target.dataset.filterKey;
    const value: string | undefined = target.dataset.filterValue;
    let params: URLSearchParams;
    let result = '';

    if (search) {
        params = new URLSearchParams(search);
    } else {
        params = new URLSearchParams();
    }
    if (key && value) {
        if (mode === 'del') {
            params.delete(value);
        } else {
            params.append(value, key);
        }

        if (params.toString().length === 0) {
            result = firstURL;
        } else {
            result = `${firstURL}?${params.toString()}`;
        }
    }
    return result;
}

export function checkCountAllProductsAndUpdateCountOnPage() {
    const elementCounts: NodeListOf<Element> | null = document.querySelectorAll('.element__current-count');
    if (elementCounts) {
        for (const selector of elementCounts) {
            const filterKey: string = selector.id.split('_')[0];
            const filterValue: string = selector.id.split('_')[1];
            const counterArr: Products[] | undefined = filteredProducts.filter(
                (el) => el[filterKey as keyof Products] === filterValue
            );
            (selector as HTMLElement).innerText = counterArr.length.toString();
        }
    }
}
