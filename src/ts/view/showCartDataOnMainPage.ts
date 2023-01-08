import { Products } from '../types/types';
import { getStorage, parseStorageValue } from '../handlers/storage';
import { filteredProducts } from './updateViewQueryParams';
import { getStockOfProduct } from '../handlers/getProductsData';
import { productsArrayRaw } from '..';

export function showCartDataInProductGrid<K extends Products>(cartInfo: Map<K, number>): void {
    cartInfo.forEach((value, id) => {
        const btnAdded: HTMLElement | null = document.querySelector(`.btn__added__container[data-product-id="${id}"]`);
        const btnAdd: HTMLElement | null = document.querySelector(`.btn__add[data-product-id="${id}"]`);
        const currentStock = getStockOfProduct(Number(id));
        if (btnAdded && btnAdd) {
            showAddToCartInProductList(btnAdded, value, btnAdd, currentStock);
        }
    });
}

function showAddToCartInProductList(
    btnAdded: HTMLElement,
    value: number,
    btnAdd: HTMLElement,
    currentStock: number
): void {
    const countAddToCart: HTMLElement | null = btnAdded.querySelector('.btn__added__count');
    if (countAddToCart) {
        if (countAddToCart.textContent) {
            const prevCount = Number(countAddToCart.textContent);
            let currCount: number | string = prevCount + value;
            if (currCount <= 0) currCount = '';
            if (currCount > currentStock) currCount = currentStock;
            countAddToCart.textContent = currCount.toString();
        } else {
            countAddToCart.textContent = value.toString();
        }
        changeBntAddView(btnAdded, countAddToCart.textContent, btnAdd);
    }
}

function changeBntAddView(btnAdded: HTMLElement, content: string, btnAdd: HTMLElement): void {
    if (content) {
        btnAdded.classList.add('_active');
        btnAdd.classList.remove('_active');
    } else {
        btnAdded.classList.remove('_active');
        btnAdd.classList.add('_active');
    }
}

export function showCartDataInHeader(): void {
    const headerCartGoodsAmount: HTMLElement | null = document.querySelector('.header-cart__goods-amount');
    if (headerCartGoodsAmount) {
        const item: string = getStorage('O-S-cart-now');
        if (item) {
            const storageArr: string[] = item.split('/');
            const count: number = storageArr.reduce((acc, el) => {
                const currCount: number | undefined = +el.split('=')[1];
                if (currCount) {
                    return acc + currCount;
                } else {
                    return acc;
                }
            }, 0);

            headerCartGoodsAmount.textContent = count.toString();
        } else {
            headerCartGoodsAmount.textContent = '0';
        }
    }
}

export function showCartTotalSumInHeader(): void {
    const headerSumAmount: HTMLElement | null = document.querySelector('.header-sum__amount');
    const productsArr = filteredProducts || productsArrayRaw;
    if (headerSumAmount) {
        const item: string = getStorage('O-S-cart-now');
        if (item) {
            const storageArr: string[] = item.split('/');
            let sum = 0;
            storageArr.forEach((el) => {
                const [currId, currCount] = parseStorageValue(el);
                if (!Number.isNaN(currCount)) {
                    const product: Products | undefined = productsArr.find((el) => el.id === currId);
                    const productPrice: number = product ? product.price : 0;
                    const currSum = currCount * productPrice;
                    sum += currSum;
                }
            });
            headerSumAmount.textContent = sum.toLocaleString('en', { style: 'currency', currency: 'EUR' });
        } else {
            headerSumAmount.textContent = (0).toLocaleString('en', { style: 'currency', currency: 'EUR' });
        }
    }
}

export function restoreCart(): void {
    const storageString: string = getStorage('O-S-cart-now');
    if (storageString) {
        const storageArr = storageString.split('/');
        storageArr.forEach((el) => {
            if (el) {
                const [currId, currCount] = parseStorageValue(el);
                if (!Number.isNaN(currCount)) {
                    const cartInfo = new Map();
                    cartInfo.set(currId, currCount);
                    showCartDataInProductGrid(cartInfo);
                    showCartDataInHeader();
                    showCartTotalSumInHeader();
                }
            }
        });
    } else {
        showCartDataInHeader();
        showCartTotalSumInHeader();
    }
}
