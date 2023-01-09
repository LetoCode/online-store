import { showCartItems, productsInCart } from './showCartDataOnCartPage';
import { getStorage } from '../handlers/storage';

export let cartItemsOnPage = 3;
export let currentPage: number;
export let howManyPages: number;
export let start: number;
export let end: number;

export function setPaginationSettings(thisPage = 1): void {
    const rowsValue: string = (document.getElementById('cart-items-on-page') as HTMLInputElement)?.value;
    let rows = 3;
    const cartLimit: string | null = getStorage('O-S-cartLimit');
    rows = Number(cartLimit) || rows;

    if (rowsValue) {
        rows = +rowsValue;
    }
    cartItemsOnPage = rows;
    currentPage = thisPage;

    howManyPages = Math.ceil(productsInCart.length / rows);
    start = rows * (thisPage - 1);
    end = start + rows;
}

export function changeCartItemsOnPagePagination(): void {
    const cartPageNumber: HTMLElement | null = document.getElementById('cart-page-number');
    const thisPage = +(cartPageNumber as HTMLInputElement).value;
    const cartItemsOnPage: HTMLElement | null = document.getElementById('cart-items-on-page');
    const itemsValue = (cartItemsOnPage as HTMLInputElement).value;
    localStorage.setItem('O-S-cartLimit', itemsValue);
    setPaginationSettings(thisPage);
    showCartItems();
}

export function changePagePagination(event: Event): void {
    let direction = 0;
    const cartPageNumber: HTMLElement | null = document.getElementById('cart-page-number');
    const currentValue: number = +(cartPageNumber as HTMLInputElement).value;
    if ((event.target as HTMLElement)?.closest('products-header__page__left-arrow')) {
        direction = -1;
    } else {
        direction = 1;
    }
    let newValue: number = currentValue + direction;
    newValue = newValue === 0 ? howManyPages : newValue;
    newValue = newValue > howManyPages ? 1 : newValue;
    if (cartPageNumber) {
        (cartPageNumber as HTMLInputElement).value = newValue.toString();
        setPaginationSettings(newValue);
        showCartItems();
    }
}
