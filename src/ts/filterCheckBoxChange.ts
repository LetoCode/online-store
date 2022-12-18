import { updateProducts } from './filtering';

document.addEventListener('click', (event: MouseEvent) => {
    let mode = 'del';

    if ((event.target as HTMLElement).closest('.route_filter')) {
        if ((event.target as HTMLInputElement).checked) {
            mode = 'add';
        }
        const target: HTMLElement = (event.target as HTMLElement).closest('.route_filter')!;
        const url = createQueryUrlForCheckbox(target, mode);
        window.history.pushState({}, '', url);
        updateProducts();
    }
});

function createQueryUrlForCheckbox(target: HTMLElement, mode: string): string {
    const firstURL: string = window.location.href.split('?')[0];
    const search: string = window.location.search;
    const key: string = target.dataset.filterKey!;
    const value: string = target.dataset.filterValue!;
    let params: URLSearchParams;

    if (search) {
        params = new URLSearchParams(search);
    } else {
        params = new URLSearchParams();
    }

    if (mode === 'del') {
        params.delete(value);
    } else {
        params.append(value, key);
    }

    let result: string;
    if (params.toString().length === 0) {
        result = firstURL;
    } else {
        result = `${firstURL}?${params.toString()}`;
    }
    return result;
}
