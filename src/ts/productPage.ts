import { productsArrayRaw } from './filtering';

export function fillProductDetails(href: string): void {
    const productHref = href.split('/');
    const productId = Number(productHref[productHref.length - 1]) - 1;
    const currProduct = productsArrayRaw[productId];

    const productTitle = document.querySelector('.product__title');
    const productSlides = document.querySelector('.product__slides');
    const productImg: HTMLImageElement | null = document.querySelector('.product__img');
    const productOptions = document.querySelectorAll('.product__option');
    const productPrice = document.querySelector('.product__price');

    if (productTitle) productTitle.textContent = currProduct.title;
    if (productSlides) {
        currProduct.images.forEach((img) => {
            const productSlide = document.createElement('img');
            productSlide.classList.add('product__slide');
            productSlides.append(productSlide);
            productSlide.src = img;
            productSlide.addEventListener('click', () => {
                if (productImg) productImg.src = img;
            });
        });
    }
    if (productImg) productImg.src = currProduct.images[0];

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
