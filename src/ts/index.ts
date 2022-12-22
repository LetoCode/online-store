import '../scss/style.scss';
import './handlers/listenFilterCheckBox';
import './handlers/listenSlider';
import '../assets/.htaccess';
import { Products } from './types/types';
import { updateProducts, updateFiltersView } from './view/updateViewQueryParams';
import { renderAllFilters } from './view/showFiltersView';
import { handleLocation } from './route/routing';
import { getAllProducts } from './handlers/getProductsData';
import { checkCountAllProductsAndUpdateCountOnPage } from './handlers/listenFilterCheckBox';
import { checkAllProductsAndUpdateSliderPrice, checkAllProductsAndUpdateSliderStock } from './handlers/listenSlider';

export const productsArrayRaw: Products[] = getAllProducts();

window.addEventListener('DOMContentLoaded', handleLocation);
window.addEventListener('load', windowLoad);
window.addEventListener('popstate', handleLocation);

export function windowLoad(): void {
    renderAllFilters();
    updateFiltersView();
    updateProducts();
    checkCountAllProductsAndUpdateCountOnPage();
    checkAllProductsAndUpdateSliderPrice();
    checkAllProductsAndUpdateSliderStock();
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
            checkCountAllProductsAndUpdateCountOnPage();
            checkAllProductsAndUpdateSliderPrice();
            checkAllProductsAndUpdateSliderStock();
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
