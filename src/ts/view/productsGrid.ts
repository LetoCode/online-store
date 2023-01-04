import { Products } from '../types/types';

export function showProducts(productsArray: Products[], sorting: string): void {
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
            const btnAdded = document.createElement('button');
            const btnAddedContainer = document.createElement('div');
            const btnAddedMinus = document.createElement('button');
            const btnAddedCount = document.createElement('span');
            const btnAddedPlus = document.createElement('button');
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

            btnAdd.classList.add('btn');
            btnAdd.classList.add('btn__add');
            btnAdd.classList.add('_active');
            btnAdd.setAttribute('data-product-id', `${product.id}`);
            btnAdd.textContent = 'Add to cart';
            productButtons.append(btnAdd);

            btnAdded.classList.add('btn');
            btnAdded.classList.add('btn__added');
            btnAdded.setAttribute('data-product-id', `${product.id}`);
            btnAddedContainer.classList.add('btn__added__container');
            btnAddedMinus.classList.add('btn__added__minus');
            btnAddedCount.classList.add('btn__added__count');
            btnAddedPlus.classList.add('btn__added__plus');
            btnAddedMinus.textContent = '-';
            btnAddedPlus.textContent = '+';
            btnAddedContainer.setAttribute('data-product-id', `${product.id}`);
            btnAddedPlus.setAttribute('data-product-id', `${product.id}`);
            btnAddedMinus.setAttribute('data-product-id', `${product.id}`);
            btnAddedCount.setAttribute('data-product-id', `${product.id}`);
            btnAddedContainer.appendChild(btnAddedMinus);
            btnAddedContainer.appendChild(btnAddedCount);
            btnAddedContainer.appendChild(btnAddedPlus);
            productButtons.append(btnAddedContainer);

            btnDetails.classList.add('btn');
            btnDetails.classList.add('btn__details');
            btnDetails.setAttribute('href', `/?${product.category}/${product.brand}/id=${product.id}`);
            btnDetails.textContent = 'Details';
            productButtons.append(btnDetails);
        });
    }
}
