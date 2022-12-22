import { fillProductDetails } from '../view/productPage';
import { renderAllFilters } from '../view/showFiltersView';
import { windowLoad } from '..';

export function handleLocation(event: Event): void {
    renderAllFilters();

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
            //console.log('href1:>', href);
        } else {
            href = window.location.pathname;
            //console.log('href2:>', window.location);
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
            }
        }
    }
}

function getRoute(href: string): string {
    let result = 'template404';

    if (href === '/' || href === 'index.html' || href === '/index.html') {
        result = 'index';
    }
    if (href.includes('id=')) {
        result = `product__details`;
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
