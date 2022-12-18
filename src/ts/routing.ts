export function handleLocation(event: Event): void {
    event.preventDefault();
    const href: string = (event.target as HTMLElement).getAttribute('href')!;
    if (href) {
        const route = routes[href as keyof typeof routes] || routes[404];
        const html: Node = getHTML(route);
        const main: HTMLElement = document.querySelector('.main')!;
        main.innerHTML = '';
        main.appendChild(html);
        window.history.pushState({}, '', route);
    }
}

const routes = {
    404: 'template404',
    '/': '/index.html',
    '/index.html': '/index.html',
};

function getHTML(route: string): Node {
    const template: HTMLTemplateElement | null = document.querySelector(`#${route}`)!;
    const templateClone = template.content.cloneNode(true);
    return templateClone;
}
