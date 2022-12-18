import '../scss/style.scss';
import './products-grid';
import './filterCheckBoxChange';
import './filtersSliderChange';
import { updateProducts, renderAllFilers, updateFiltersView } from './filtering';
import { handleLocation } from './routing';

window.addEventListener('load', windowLoad);

function windowLoad(): void {
    renderAllFilers();
    updateFiltersView();
    updateProducts();
    addListeners();
}

function addListeners() {
    const btnResetFilters: HTMLElement = document.getElementById('btn-reset-filters')!;
    btnResetFilters.addEventListener('click', (event) => {
        const firstURL: string = window.location.href.split('?')[0];
        window.history.pushState({}, '', firstURL);
        updateProducts();
        updateFiltersView();
    });

    const productsItems: HTMLElement = document.querySelector('.products__items')!;
    productsItems.addEventListener('click', (event) => {
        if ((event.target as HTMLElement).closest('.btn__details')) {
            handleLocation(event);
        }
    });
}
