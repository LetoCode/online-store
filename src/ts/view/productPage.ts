import { addBtnListeners, productsArrayRaw } from '../index';
import { images, Products } from '../types/types';
import { setBtnAdd } from './productsGrid';
import { restoreCart } from './showCartDataOnMainPage';

export function fillProductDetails(href: string): void {
    const productHref = href.split('/');
    const productId: string | undefined = productHref.at(-1)?.slice(3);
    if (productId) {
        const productIdNumber: number = +productId;
        const currProduct: Products | undefined = productsArrayRaw.find((el) => el.id === productIdNumber);
        const productButtons: HTMLElement | null = document.querySelector('.product__buttons');
        const btnBuy = document.createElement('button');

        if (productButtons) {
            setBtnAdd(productButtons, currProduct);
            addBtnListeners();
            restoreCart();

            productButtons.append(btnBuy);
            btnBuy.classList.add('btn');
            btnBuy.classList.add('btn__product-buy');
            btnBuy.textContent = 'Buy Now';
            btnBuy.addEventListener('click', () => {
                window.location.href = '/?cart&buy';
            });
        }

        if (currProduct) {
            fillBreadcrumb(currProduct);

            const productTitle = document.querySelector('.product__title');
            const productSlides = document.querySelector('.product__slides');
            const productImg: HTMLImageElement | null = document.querySelector('.product__img');
            const productOptions = document.querySelectorAll('.product__option');
            const productPrice = document.querySelector('.product__price');

            if (productTitle) productTitle.textContent = currProduct.title;
            if (productImg) {
                productImg.src = currProduct.thumbnail;
            }

            const images: images[] = [];
            currProduct.images.forEach((img) => {
                const fileSize = getFileSize(img);
                images.push({
                    url: img,
                    fileSize: fileSize,
                });
            });
            const set = new Set();
            const uniqImages = images.filter((img) => !set.has(img['fileSize']) && set.add(img['fileSize']));

            if (productSlides) {
                uniqImages.forEach((img) => {
                    const productSlide = document.createElement('img');
                    productSlides.append(productSlide);
                    productSlide.classList.add('product__slide');
                    productSlide.src = img.url;
                    productSlide.addEventListener('click', () => {
                        if (productImg) productImg.src = img.url;
                    });
                });
            }

            const optionsContent = [
                currProduct.description,
                currProduct.discountPercentage,
                currProduct.rating,
                currProduct.stock,
                currProduct.brand,
                currProduct.category,
            ];

            for (let i = 0; i < 6; i++) {
                const optionText = productOptions[i].querySelector('.product__option-text');
                if (optionText) optionText.textContent = optionsContent[i].toString();
            }

            if (productPrice) productPrice.textContent = `€${currProduct.price}.00`;
        }
    }
}

function fillBreadcrumb(product: Products): void {
    const breadcrumb = document.querySelector('.breadcrumb');
    const category = document.createElement('a');
    const brand = document.createElement('a');
    const title = document.createElement('a');

    if (breadcrumb) {
        breadcrumb.innerHTML += `>>`;
        breadcrumb.append(category);
        category.classList.add('breadcrumb__item');
        category.textContent = product.category;
        category.href = `/?index=page&${product.category}=category`;

        breadcrumb.innerHTML += `>>`;
        breadcrumb.append(brand);
        brand.classList.add('breadcrumb__item');
        brand.textContent = product.brand;
        brand.href = `/?index=page&${product.brand}=brand`;

        breadcrumb.innerHTML += `>>`;
        breadcrumb.append(title);
        title.classList.add('breadcrumb__item');
        title.textContent = product.title;
    }
}

function getFileSize(url: string | URL): string | undefined {
    const req = new XMLHttpRequest();
    req.open('GET', url, false);
    req.send();
    const fileSize = req.getResponseHeader('content-length');
    if (fileSize) {
        return fileSize;
    }
}
