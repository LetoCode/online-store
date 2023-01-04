import { Products, promoCodesInfo } from '../types/types';
import { getStorage, parseStorageValue } from '../handlers/storage';
import { productsArrayRaw } from '..';
import { showCartDataInHeader, showCartTotalSumInHeader } from './showCartDataOnMainPage';
import { handleLocation } from '../route/routing';
import { addToStorage } from '../handlers/storage';
import { getStockOfProduct } from '../handlers/getProductsData';
import * as Pagination from './paginationOnCartPage';
import { popupOpen } from './popup';

export const productsInCart: Products[] = [];
const productsCountMap = new Map();
const promoCodes: promoCodesInfo[] = [
    {
        name: 'RS',
        description: 'Rolling Scopes School - 10%',
        value: 10,
    },
    {
        name: 'EPM',
        description: 'EPAM Systems - 15%',
        value: 15,
    },
];
const usedPromoCodes: string[] = [];

export function showCartPage(): void {
    showCartDataInHeader();
    showCartTotalSumInHeader();
    Pagination.setPaginationSettings();

    const storageString: string = getStorage('O-S-cart-now');
    if (storageString) {
        fillProductsInCartAndProductsCountMap();
        showCartHeader();
        if (productsInCart.length > 0) {
            showCartItems();
            showSummary();
        }
        showEmptyCart(false);
    } else {
        showEmptyCart(true);
    }

    if (window.location.pathname.includes('buy')) {
        popupOpen();
    }
}

function fillProductsInCartAndProductsCountMap() {
    const storageString: string = getStorage('O-S-cart-now');
    const storageArr = storageString.split('/');
    productsInCart.length = 0;
    productsCountMap.clear();
    storageArr.forEach((el) => {
        const [currId, currCount] = parseStorageValue(el);
        if (!Number.isNaN(currCount)) {
            const foundProduct: Products | undefined = productsArrayRaw.find((el) => el.id === currId);
            if (foundProduct) productsInCart.push(foundProduct);
            productsCountMap.set(currId, currCount);
        }
    });
}

function showEmptyCart(state: boolean): void {
    const cartEmpty: HTMLElement | null = document.querySelector('.cart-empty__container');
    const cartFull: HTMLElement | null = document.querySelector('.cart');
    if (cartEmpty) cartEmpty.style.display = state ? 'grid' : 'none';
    if (cartFull) cartFull.style.display = state ? 'none' : 'flex';
    initCartListeners();
}

function showCartHeader(): void {
    const cartItemsOnPageElement: HTMLElement | null = document.getElementById('cart-items-on-page');
    const cartPageNumber: HTMLElement | null = document.getElementById('cart-page-number');
    if (cartItemsOnPageElement)
        (cartItemsOnPageElement as HTMLInputElement).value = Pagination.cartItemsOnPage.toString();
    if (cartPageNumber) (cartPageNumber as HTMLInputElement).value = (1).toString();
}

export function showCartItems(): void {
    const fragment: DocumentFragment = document.createDocumentFragment();
    const paginatedProductsInCart = productsInCart.slice(Pagination.start, Pagination.end);
    paginatedProductsInCart.forEach((product, index) => {
        let numberPerOrder: number | undefined = productsInCart.findIndex((el) => product.id === el.id);
        numberPerOrder = numberPerOrder || index;
        let productCount: number | undefined = productsCountMap.get(product.id);
        productCount = productCount || 0;
        const productNode = showCartItem(product, productCount, numberPerOrder + 1);
        fragment.append(productNode);
    });
    const productsCartItems = document.getElementById('products-cart-items');
    if (productsCartItems) {
        productsCartItems.innerHTML = '';
        productsCartItems.append(fragment);
    }
}

function showCartItem(product: Products, productCount: number, elementNumber: number): Node {
    const template: HTMLTemplateElement | null = document.querySelector('#cart-item-template');
    let templateClone: Node = document.createTextNode('text');
    if (template) {
        templateClone = template.content.cloneNode(true);
        const productsCrtItem: HTMLElement | null = (templateClone as HTMLElement).querySelector(
            '.products-cart__item.cart-item'
        );
        if (productsCrtItem) productsCrtItem.setAttribute('data-product-id', product.id.toString());

        const itemNumberElement: HTMLElement | null = (templateClone as HTMLElement).querySelector(
            '.item-number__element'
        );
        if (itemNumberElement) itemNumberElement.textContent = elementNumber.toString();

        const itemImageLink: HTMLAnchorElement | null = (templateClone as HTMLElement).querySelector(
            '.item-image__link'
        );
        if (itemImageLink) {
            itemImageLink.href = `/#${product.category}/${product.brand}/id=${product.id}`;
            const imageBg = product.images[product.images.length - 1];
            itemImageLink.style.background = `url(${imageBg}) 0% 0% / cover`;
        }

        const itemInfoHeader: HTMLElement | null = (templateClone as HTMLElement).querySelector('.item-info__header');
        if (itemInfoHeader) itemInfoHeader.textContent = product.title;

        const itemInfoDescription: HTMLElement | null = (templateClone as HTMLElement).querySelector(
            '.item-info__description'
        );
        if (itemInfoDescription) itemInfoDescription.textContent = product.description;

        const itemRating: HTMLElement | null = (templateClone as HTMLElement).querySelector(
            '.info-details-container__rating'
        );
        if (itemRating) itemRating.textContent = `Rating: ${product.rating.toString()}`;

        const itemDiscount: HTMLElement | null = (templateClone as HTMLElement).querySelector(
            '.info-details-container__discount'
        );
        if (itemDiscount) itemDiscount.textContent = `Discount: ${product.discountPercentage.toString()}`;

        const itemStock: HTMLElement | null = (templateClone as HTMLElement).querySelector('.item-control__stock');
        if (itemStock) itemStock.textContent = `Stock: ${product.stock.toString()}`;

        const itemCount: HTMLElement | null = (templateClone as HTMLElement).querySelector('.count-choose__count');
        if (itemCount) itemCount.textContent = productCount.toString();

        const itemPrice: HTMLElement | null = (templateClone as HTMLElement).querySelector('.item-control__price');
        if (itemPrice) {
            itemPrice.setAttribute('data-product-id', product.id.toString());
            itemPrice.textContent = (product.price * productCount).toLocaleString('en', {
                style: 'currency',
                currency: 'EUR',
            });
        }

        const countChoosePlus: HTMLElement | null = (templateClone as HTMLElement).querySelector('.count-choose__plus');
        if (countChoosePlus) countChoosePlus.setAttribute('data-product-id', product.id.toString());

        const countChoose: HTMLElement | null = (templateClone as HTMLElement).querySelector('.count-choose__count');
        if (countChoose) countChoose.setAttribute('data-product-id', product.id.toString());

        const countChooseMinus: HTMLElement | null = (templateClone as HTMLElement).querySelector(
            '.count-choose__minus'
        );
        if (countChooseMinus) countChooseMinus.setAttribute('data-product-id', product.id.toString());
    }
    return templateClone;
}

function showSummary(): void {
    const totalCount: number = getTotalCount();
    const totalSumma: number = getTotalSumma();
    const cartSummary: HTMLElement | null = document.querySelector('.cart__summary');
    if (cartSummary) {
        const productsCount: HTMLElement | null = document.querySelector('.summary-info__number-of-products__value');
        if (productsCount) productsCount.textContent = totalCount.toString();

        const summaryInfoSummaValueNoPromo: HTMLElement | null = document.querySelector(
            '.summary-info__summa__value_no-promo'
        );
        if (summaryInfoSummaValueNoPromo)
            summaryInfoSummaValueNoPromo.textContent = totalSumma.toLocaleString('en', {
                style: 'currency',
                currency: 'EUR',
            });

        const summaryInfoSummaValue: HTMLElement | null = document.querySelector('.summary-info__summa__value_promo');
        if (summaryInfoSummaValue)
            summaryInfoSummaValue.textContent = totalSumma.toLocaleString('en', { style: 'currency', currency: 'EUR' });
    }
}

function getTotalSumma(): number {
    let totalSumma = 0;
    productsCountMap.forEach((value, key) => {
        const currProduct: Products | undefined = productsInCart.find((el) => el.id === key);
        if (currProduct) totalSumma = totalSumma + currProduct.price * value;
    });
    return totalSumma;
}

function getTotalCount(): number {
    let totalCount = 0;
    productsCountMap.forEach((value) => (totalCount += value));
    return totalCount;
}

function getTotalDiscount(): number {
    let totalDiscount = 0;
    usedPromoCodes.map((el) => {
        const discountEl = promoCodes.find((item) => item.name === el);
        if (discountEl) totalDiscount += discountEl.value;
    });
    return totalDiscount;
}

function getPromoCodesNames(): string[] {
    return promoCodes.map((el) => el.name);
}

function initCartListeners(): void {
    document.getElementById('products-cart-items')?.addEventListener('click', productsCartItemsListener);
    document.getElementById('promo__input')?.addEventListener('input', promoInput);
    document
        .getElementById('cart-items-on-page')
        ?.addEventListener('change', Pagination.changeCartItemsOnPagePagination);
    document
        .querySelector('.products-header__page__left-arrow')
        ?.addEventListener('click', Pagination.changePagePagination);
    document
        .querySelector('.products-header__page__right-arrow')
        ?.addEventListener('click', Pagination.changePagePagination);

    document.querySelector('.summary-buy__btn')?.addEventListener('click', popupOpen);
}

function productsCartItemsListener(event: Event): void {
    if ((event.target as HTMLElement).closest('.item-image__link')) {
        handleLocation(event);
    }

    if ((event.target as HTMLElement).closest('.count-choose__plus')) {
        const id: string | undefined = (event.target as HTMLElement).dataset.productId;
        const countChoose: HTMLElement | null = document.querySelector(`.count-choose__count[data-product-id="${id}"]`);
        if (id && countChoose) {
            const maxCol = getStockOfProduct(+id);
            let col: number = productsCountMap.get(+id);
            col = col ? (col += 1) : 0;
            if (col <= maxCol) {
                addToStorage(id, 1);
                productsCountMap.set(+id, col);
            } else {
                col = maxCol;
            }
            changeSumOfProduct(id, 1);
            countChoose.textContent = col.toString();
            showCartDataInHeader();
            showCartTotalSumInHeader();
            showSummary();
            checkUsedPromoCodes();
            hideCheckedPromo();
            fillProductsInCartAndProductsCountMap();
        }
    }

    if ((event.target as HTMLElement).closest('.count-choose__minus')) {
        const id: string | undefined = (event.target as HTMLElement).dataset.productId;
        const countChoose: HTMLElement | null = document.querySelector(`.count-choose__count[data-product-id="${id}"]`);
        if (id && countChoose) {
            addToStorage(id, -1);
            showCartDataInHeader();
            showCartTotalSumInHeader();
            let col: number = productsCountMap.get(+id);
            col = col ? (col -= 1) : 0;
            productsCountMap.set(+id, col);
            changeSumOfProduct(id, -1);
            countChoose.textContent = col.toString();
            showSummary();
            checkUsedPromoCodes();
            hideCheckedPromo();
            fillProductsInCartAndProductsCountMap();
            if (col === 0) {
                const productsCrtItem: HTMLElement | null = document.querySelector(
                    `.products-cart__item.cart-item[data-product-id="${id}"]`
                );
                if (productsCrtItem) productsCrtItem.remove();

                //change pagination
                const lastCurrentPage = Pagination.currentPage;
                Pagination.setPaginationSettings(lastCurrentPage);
                const howManyPages = Pagination.howManyPages;
                const newCurrent = lastCurrentPage > howManyPages ? howManyPages : lastCurrentPage;
                Pagination.setPaginationSettings(newCurrent);
                showCartItems();
                const cartPageNumber: HTMLElement | null = document.getElementById('cart-page-number');
                if (cartPageNumber) (cartPageNumber as HTMLInputElement).value = newCurrent.toString();
            }
            if (productsInCart.length === 0) showEmptyCart(true);
        }
    }
}

function changeSumOfProduct(id: string, addProduct: number) {
    const itemPrice: HTMLElement | null = document.querySelector(`.item-control__price[data-product-id="${id}"]`);
    const product = productsInCart.find((el) => el.id === +id);
    const productCount = productsCountMap.get(+id);
    console.log('product', product);
    console.log('productCount', productCount);
    console.log('itemPrice', product);
    if (itemPrice && product)
        itemPrice.textContent = (product.price * (productCount + addProduct)).toLocaleString('en', {
            style: 'currency',
            currency: 'EUR',
        });
}

function promoInput(event: Event): void {
    const promoCodesNames: string[] = getPromoCodesNames();
    const promoName: string = (event.target as HTMLInputElement).value;
    if (promoCodesNames.includes(promoName) && !usedPromoCodes.includes(promoName)) {
        showRightPromoAddButton(promoName);
    }
}

function showRightPromoAddButton(promoName: string): void {
    const checkedPromo: HTMLElement | null = document.querySelector('.checked-promo');
    const checkedPromoTitle: HTMLElement | null = document.querySelector('.checked-promo__title');
    const checkedPromoBtn: HTMLElement | null = document.querySelector('.checked-promo__btn');
    const usedPromoCode: promoCodesInfo | undefined = promoCodes.find((el) => el.name === promoName);
    if (usedPromoCode && checkedPromo && checkedPromoTitle && checkedPromoBtn) {
        checkedPromo.classList.add('_active');
        checkedPromoTitle.textContent = usedPromoCode.description;
        checkedPromoBtn.addEventListener('click', () => addPromo(promoName), { once: true });
    }
}

function addAppliedPromoTemplate(): void {
    const promoBody: HTMLElement | null = document.querySelector('.promo-body');
    const fragment: DocumentFragment = document.createDocumentFragment();
    const appliedPromoTemplate: HTMLTemplateElement | null = document.querySelector('#applied-promo-template');
    if (promoBody) promoBody.innerHTML = '';
    usedPromoCodes.forEach((promoName) => {
        const promoClone = appliedPromoTemplate?.content.cloneNode(true);
        const promoBodyName = (promoClone as HTMLElement).querySelector('.promo-body__name');
        const promoBodyDropBtn = (promoClone as HTMLElement).querySelector('.promo-body__drop-btn');
        const usedPromoCode: promoCodesInfo | undefined = promoCodes.find((el) => el.name === promoName);
        if (promoBodyName && usedPromoCode) promoBodyName.textContent = usedPromoCode.description;
        if (promoBodyDropBtn)
            promoBodyDropBtn.addEventListener('click', () => dropPromo(promoName, promoBodyDropBtn), { once: true });
        if (promoClone) fragment.append(promoClone);
    });
    promoBody?.append(fragment);
}

function addPromo(promoName: string): void {
    const promoCodesNames: string[] = getPromoCodesNames();
    if (promoCodesNames.includes(promoName) && !usedPromoCodes.includes(promoName)) {
        usedPromoCodes.push(promoName);
        checkUsedPromoCodes();
        hideCheckedPromo();
    }
}

function dropPromo(promoName: string, promoBodyDropBtn: Element): void {
    if (usedPromoCodes.includes(promoName)) {
        const idx: number = usedPromoCodes.findIndex((el) => el === promoName);
        usedPromoCodes.splice(idx, 1);
        checkUsedPromoCodes();
        const parent = promoBodyDropBtn.parentElement;
        if (parent) parent.remove();
    }
}

function checkUsedPromoCodes(): void {
    const summaryInfoSummaNoPromo: HTMLElement | null = document.querySelector('.summary-info__summa_no-promo');
    const summaryInfoSummaValuePromo: HTMLElement | null = document.querySelector('.summary-info__summa__value_promo');
    const appliedPromo: HTMLElement | null = document.querySelector('.applied-promo');
    const headerSumAmount: HTMLElement | null = document.querySelector('.header-sum__amount');
    if (usedPromoCodes.length > 0 && appliedPromo) {
        summaryInfoSummaNoPromo?.classList.add('_active');
        appliedPromo.classList.add('_active');
        addAppliedPromoTemplate();
        const totalSumma: number = getTotalSumma();
        const totalDiscount: number = getTotalDiscount();
        if (summaryInfoSummaValuePromo && headerSumAmount) {
            const sum: number = totalSumma - (totalSumma * totalDiscount) / 100;
            headerSumAmount.textContent = summaryInfoSummaValuePromo.textContent = sum.toLocaleString('en', {
                style: 'currency',
                currency: 'EUR',
            });
        }
    } else {
        summaryInfoSummaNoPromo?.classList.remove('_active');
        appliedPromo?.classList.remove('_active');
        const totalSumma: number = getTotalSumma();
        if (summaryInfoSummaValuePromo && headerSumAmount) {
            headerSumAmount.textContent = summaryInfoSummaValuePromo.textContent = totalSumma.toLocaleString('en', {
                style: 'currency',
                currency: 'EUR',
            });
        }
    }
}

function hideCheckedPromo(): void {
    const promoInput: HTMLElement | null = document.getElementById('promo__input');
    if (promoInput) (promoInput as HTMLInputElement).value = '';
    const checkedPromo: HTMLElement | null = document.querySelector('.checked-promo');
    if (checkedPromo) checkedPromo.classList.remove('_active');
    const checkedPromoTitle: HTMLElement | null = document.querySelector('.checked-promo__title');
    if (checkedPromoTitle) checkedPromoTitle.textContent = '';
}
