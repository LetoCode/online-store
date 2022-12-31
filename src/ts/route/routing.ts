import { fillProductDetails } from '../view/productPage';
import { showCartPage } from '../view/showCartDataOnCartPage';
import { windowLoad } from '..';

export function handleLocation(event: Event): void {
    const search: string = window.location.search;
    if (search) {
        const html: Node = getHTML('index');
        const main: HTMLElement | null = document.querySelector('.main');
        if (main) {
            main.innerHTML = '';
            main.appendChild(html);
            windowLoad();
        }
    } else {
        let href;
        if (event.target instanceof HTMLAnchorElement) {
            href = event.target.href;
        } else {
            href = window.location.pathname;
        }

        window.history.pushState({}, '', href);
        event.preventDefault();
        event.stopImmediatePropagation();
        if (href) {
            const route = getRoute(href);
            const html: Node = getHTML(route);
            const main: HTMLElement | null = document.querySelector('.main');
            if (main) {
                main.innerHTML = '';
                main.appendChild(html);
                if (href.includes('id=')) {
                    fillProductDetails(href);
                }
                if (route === 'index') {
                    windowLoad();
                }
                if (route === 'cart_page') {
                    showCartPage();
                }
            }
        }
    }
}

function getRoute(href: string): string {
    let result = 'template404';

    // if (href === '/' || href === 'index.html' || href === '/index.html') {
    if (href === '/') {
        result = 'index';
    }
    if (href.includes('id=')) {
        result = `product__details`;
    }
    if (href.includes('cart')) {
        result = 'cart_page';
    }
    return result;
}

function getHTML(route: string): Node {
    let result: Node = document.createTextNode('div');
    const template: HTMLTemplateElement | null = document.querySelector(`#${route}`);
    if (template) {
        const templateClone = template.content.cloneNode(true);
        result = templateClone;
    }
    return result;
}
