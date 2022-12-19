export function handleLocation(event: Event): void {
    console.log('ffff');
    if (event.target instanceof HTMLElement) {
        event.preventDefault();
        const href: string | null = (event.target as HTMLElement).getAttribute('href');
        if (href) {
            const route = routes[href as keyof typeof routes] || routes[404];
            const html: Node = getHTML(route);
            const main: HTMLElement | null = document.querySelector('.main');
            if (main) {
                main.innerHTML = '';
                main.appendChild(html);
                window.history.pushState({}, route, route);
            }
        }
    } else {
        console.log(window.location);
    }
}

const routes = {
    404: 'template404',
    '404.html': 'template404',
    '/404.html': 'template404',
    '/': '/index.html',
    '/index.html': '/index.html',
};

function getHTML(route: string): Node {
    let result: Node = document.createTextNode('div');
    const template: HTMLTemplateElement | null = document.querySelector(`#${route}`);
    if (template) {
        const templateClone = template.content.cloneNode(true);
        result = templateClone;
    }
    return result;
}
