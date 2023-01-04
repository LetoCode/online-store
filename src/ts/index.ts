import '../scss/style.scss';
import './handlers/listenFilterCheckBox';
import './handlers/listenSlider';
import './handlers/listenSorting';
import './view/updateSortView';
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
window.addEventListener('DOMContentLoaded', handleLocation);
window.addEventListener('popstate', handleLocation);

export function windowLoad(): void {
    renderAllFilters();
    updateFiltersView();
    updateProducts();
    checkCountAllProductsAndUpdateCountOnPage();
    checkAllProductsAndUpdateSliderPrice();
    checkAllProductsAndUpdateSliderStock();
    restoreCart();
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

    addBtnListeners();

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

    const btnCart: HTMLElement | null = document.getElementById('cart-link');
    if (btnCart) {
        btnCart.addEventListener('click', (event) => {
            handleLocation(event, event.currentTarget);
        });
    }
}

export function addBtnListeners(): void {
    const productButtons: NodeList = document.querySelectorAll('.product__buttons');
    if (productButtons) {
        productButtons.forEach((element) => {
            element.addEventListener('click', (event) => {
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
        });
    }
}
