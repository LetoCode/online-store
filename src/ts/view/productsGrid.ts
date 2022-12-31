import { Products } from '../types/types';

export function showProducts(productsArray: Products[], sorting: string) {
    switch (sorting) {
        case 'rating':
            productsArray.sort((a, b) => b.rating - a.rating);
            break;
        case 'price-low':
            productsArray.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            productsArray.sort((a, b) => b.price - a.price);
            break;
    }

    const productsItems: HTMLElement | null = document.querySelector('.products__items');
    if (productsItems) {
        productsItems.innerHTML = '';
        productsArray.forEach((product) => {
            const productItem = document.createElement('div');
            const productTitle = document.createElement('div');
            const productInfo = document.createElement('div');
            const productButtons = document.createElement('div');
            const btnAdd = document.createElement('button');
            const btnDetails = document.createElement('a');

            if (productsItems) productsItems.append(productItem);
            productItem.classList.add('product');

            const imageBg = product.images[product.images.length - 1];
            productItem.style.background = `url(${imageBg}) 0% 0% / cover`;

            productItem.append(productTitle);
            productTitle.classList.add('product__title');
            productTitle.textContent = `${product.title}`;

            productItem.append(productInfo);
            productInfo.classList.add('product__info');

            const infoContent = [
                `Category: ${product.category}`,
                `Brand: ${product.brand}`,
                `Price: €${product.price}`,
                `Discount: ${product.discountPercentage}%`,
                `Rating: ${product.rating}`,
                `Stock: ${product.stock}`,
            ];
            for (let i = 0; i < 6; i++) {
                const productInfoItem = document.createElement('p');
                productInfo.append(productInfoItem);
                productInfoItem.classList.add('product__info-item');
                productInfoItem.textContent = infoContent[i];
            }

            productItem.append(productButtons);
            productButtons.classList.add('product__buttons');

            productButtons.append(btnAdd);
            btnAdd.classList.add('btn');
            btnAdd.classList.add('btn__add');
            btnAdd.textContent = 'Add to cart';

            productButtons.append(btnDetails);
            btnDetails.classList.add('btn');
            btnDetails.classList.add('btn__details');
            btnDetails.setAttribute('href', `/#${product.category}/${product.brand}/id=${product.id}`);
            btnDetails.textContent = 'Details';
        });
    }
}
