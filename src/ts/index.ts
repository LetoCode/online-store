import '../scss/style.scss';
import './filterCheckBoxChange';
import './filtersSliderChange';
import '../assets/.htaccess';
import { Products } from './types';
import { updateProducts, renderAllFilters, updateFiltersView } from './filtering';
import { handleLocation } from './routing';
import { getAllProducts } from './getProducts';
import { checkCountAllProductsAndUpdateCountOnPage } from './filterCheckBoxChange';

export const productsArrayRaw: Products[] = getAllProducts();

window.addEventListener('load', handleLocation);
window.addEventListener('load', windowLoad);
window.addEventListener('popstate', handleLocation);

export function windowLoad(): void {
    renderAllFilters();
    updateFiltersView();
    updateProducts();
    checkCountAllProductsAndUpdateCountOnPage();
    addListeners();
}

function addListeners(): void {
    const btnResetFilters: HTMLElement | null = document.getElementById('btn-reset-filters');
    if (btnResetFilters) {
        btnResetFilters.addEventListener('click', () => {
            const firstURL: string = window.location.href.split('?')[0];
            window.history.pushState({}, '', firstURL);
            updateProducts();
            updateFiltersView();
        });
    }

    const productsItems: HTMLElement | null = document.querySelector('.products__items');
    if (productsItems) {
        productsItems.addEventListener('click', (event) => {
            if ((event.target as HTMLElement).closest('.btn__details')) {
                handleLocation(event);
            }
        });
    }

    const btnCopyLink: HTMLElement | null = document.getElementById('btn-copy-link');
    if (btnCopyLink) {
        btnCopyLink.addEventListener('click', () => {
            const url: string = window.location.href;
            navigator.clipboard.writeText(url);
            btnCopyLink.setAttribute('title', 'Link has copied!!!');
            setTimeout(() => {
                btnCopyLink.removeAttribute('title');
            }, 2000);
        });
    }
}
