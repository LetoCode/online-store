import { showCartItems, productsInCart } from './showCartDataOnCartPage';

export let cartItemsOnPage = 3;
export let currentPage: number;
export let howManyPages: number;
export let start: number;
export let end: number;

export function setPaginationSettings(thisPage = 1) {
    const rowsValue: string = (document.getElementById('cart-items-on-page') as HTMLInputElement)?.value;
    let rows = 3;
    if (rowsValue) {
        rows = +rowsValue;
    }
    cartItemsOnPage = rows;
    currentPage = thisPage;

    howManyPages = Math.ceil(productsInCart.length / rows);
    start = rows * (thisPage - 1);
    end = start + rows;
}

export function changeCartItemsOnPagePagination() {
    const cartPageNumber: HTMLElement | null = document.getElementById('cart-page-number');
    const thisPage = +(cartPageNumber as HTMLInputElement).value;
    setPaginationSettings(thisPage);
    showCartItems();
}

export function changePagePagination(event: Event) {
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
