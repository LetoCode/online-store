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
import { addToStorage } from './handlers/storage';
import {
    showCartDataInProductGrid,
    showCartDataInHeader,
    showCartTotalSumInHeader,
    restoreCart,
} from './view/showCartDataOnMainPage';

export const productsArrayRaw: Products[] = getAllProducts();
let listenersAdded: boolean;

window.addEventListener('DOMContentLoaded', handleLocation);
window.addEventListener('popstate', handleLocation);

export function windowLoad(): void {
    const mainLoading: HTMLElement | null = document.querySelector('.main__loading _active');
    renderAllFilters();
    updateFiltersView();
    updateProducts();
    checkCountAllProductsAndUpdateCountOnPage();
    checkAllProductsAndUpdateSliderPrice();
    checkAllProductsAndUpdateSliderStock();
    restoreCart();
    if (!listenersAdded) {
        addListeners();
    }
    if (mainLoading) mainLoading.classList.remove('_active');

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
            if (
                (event.target as HTMLElement).closest('.btn__add') ||
                (event.target as HTMLElement).closest('.btn__added__plus')
            ) {
                const id: string | undefined = (event.target as HTMLElement).dataset.productId;
                if (id) {
                    addToStorage(id, 1);
                    const cartInfo = new Map();
                    cartInfo.set(id, 1);
                    showCartDataInProductGrid(cartInfo);
                    showCartDataInHeader();
                    showCartTotalSumInHeader();
                }
            }

            if ((event.target as HTMLElement).closest('.btn__added__minus')) {
                const id: string | undefined = (event.target as HTMLElement).dataset.productId;
                if (id) {
                    addToStorage(id, -1);
                    const cartInfo = new Map();
                    cartInfo.set(id, -1);
                    showCartDataInProductGrid(cartInfo);
                    showCartDataInHeader();
                    showCartTotalSumInHeader();
                }
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

    listenersAdded = true;
}
