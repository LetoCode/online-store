export function showCategoryFilter(namesSet: string[], mapCurrentCount: Map<string, number>): void {
    const categoryFilter: HTMLElement | null = document.getElementById('category-filter');
    const fragment: DocumentFragment = document.createDocumentFragment();
    namesSet.forEach((element) => {
        const inputContainer: HTMLElement = document.createElement('div');
        inputContainer.classList.add('filter-block__body__element');
        inputContainer.classList.add('route_filter');
        inputContainer.setAttribute('data-filter-key', 'category');
        inputContainer.setAttribute('data-filter-value', element);

        const elContainer: HTMLElement = document.createElement('div');
        elContainer.classList.add('element__input');

        const input: HTMLElement = document.createElement('input');
        input.setAttribute('type', 'checkbox');
        input.setAttribute('id', element);
        input.setAttribute('name', element);
        elContainer.append(input);

        const label: HTMLElement = document.createElement('label');
        label.setAttribute('for', element);
        label.innerText = element;
        elContainer.append(label);

        const spanContainer: HTMLElement = document.createElement('div');
        spanContainer.classList.add('element__counts');

        const countEl_span1: HTMLElement = document.createElement('span');
        countEl_span1.setAttribute('id', `${element}_currCount`);
        countEl_span1.innerText = mapCurrentCount.get(element)?.toString() || '';
        spanContainer.append(countEl_span1);

        const countEl_span2: HTMLElement = document.createElement('span');
        countEl_span2.innerText = '/';
        spanContainer.append(countEl_span2);

        const countEl_span3: HTMLElement = document.createElement('span');
        countEl_span3.setAttribute('id', `${element}_allCount`);
        countEl_span3.innerText = mapCurrentCount.get(element)?.toString() || '';
        spanContainer.append(countEl_span3);

        inputContainer.append(elContainer);
        inputContainer.append(spanContainer);
        fragment.append(inputContainer);
    });
    if (categoryFilter) {
        categoryFilter.append(fragment);
    }
}

export function showBrandsFilter(namesSet: string[], mapCurrentCount: Map<string, number>): void {
    const categoryFilter: HTMLElement | null = document.getElementById('brand-filter');
    const fragment: DocumentFragment = document.createDocumentFragment();
    namesSet.forEach((element) => {
        const inputContainer: HTMLElement = document.createElement('div');
        inputContainer.classList.add('filter-block__body__element');
        inputContainer.classList.add('route_filter');
        inputContainer.setAttribute('data-filter-key', 'brand');
        inputContainer.setAttribute('data-filter-value', element);

        const elContainer: HTMLElement = document.createElement('div');
        elContainer.classList.add('element__input');

        const input: HTMLElement = document.createElement('input');
        input.setAttribute('type', 'checkbox');
        input.setAttribute('id', element);
        input.setAttribute('name', element);
        elContainer.append(input);

        const label: HTMLElement = document.createElement('label');
        label.setAttribute('for', element);
        label.innerText = element;
        elContainer.append(label);

        const spanContainer: HTMLElement = document.createElement('div');
        spanContainer.classList.add('element__counts');

        const countEl_span1: HTMLElement = document.createElement('span');
        countEl_span1.setAttribute('id', `${element}_currCount`);
        countEl_span1.innerText = mapCurrentCount.get(element)?.toString() || '';
        spanContainer.append(countEl_span1);

        const countEl_span2: HTMLElement = document.createElement('span');
        countEl_span2.innerText = '/';
        spanContainer.append(countEl_span2);

        const countEl_span3: HTMLElement = document.createElement('span');
        countEl_span3.setAttribute('id', `${element}_allCount`);
        countEl_span3.innerText = mapCurrentCount.get(element)?.toString() || '';
        spanContainer.append(countEl_span3);

        inputContainer.append(elContainer);
        inputContainer.append(spanContainer);
        fragment.append(inputContainer);
    });
    if (categoryFilter) {
        categoryFilter.append(fragment);
    }
}

export function showPriceFilter(minPrice: number, maxPrice: number): void {
    const fromSliderPrice: HTMLInputElement | null = document.querySelector('#fromSlider-price')!;
    const toSliderPrice: HTMLInputElement | null = document.querySelector('#toSlider-price')!;
    const minPriceEl: HTMLElement | null = document.querySelector('#min-price')!;
    const maxPriceEl: HTMLElement | null = document.querySelector('#max-price')!;
    minPriceEl.textContent = minPrice.toString();
    maxPriceEl.textContent = maxPrice.toString();
    fromSliderPrice.setAttribute('min', minPrice.toString());
    toSliderPrice.setAttribute('min', minPrice.toString());
    fromSliderPrice.setAttribute('max', maxPrice.toString());
    toSliderPrice.setAttribute('max', maxPrice.toString());
    toSliderPrice.value = maxPrice.toString();

    fromSliderPrice.addEventListener('input', (event) => {
        controlFromSlider(event, fromSliderPrice, toSliderPrice, minPriceEl, maxPriceEl);
    });
    toSliderPrice.addEventListener('input', (event) => {
        controlToSlider(event, fromSliderPrice, toSliderPrice, minPriceEl, maxPriceEl);
    });

    setAccess(toSliderPrice, toSliderPrice);
}

export function showStockFilter(minStock: number, maxStock: number): void {
    const fromSliderStock: HTMLInputElement | null = document.querySelector('#fromSlider-stock')!;
    const toSliderStock: HTMLInputElement | null = document.querySelector('#toSlider-stock')!;
    const minStockEl: HTMLElement | null = document.querySelector('#min-stock')!;
    const maxStockEl: HTMLElement | null = document.querySelector('#max-stock')!;
    minStockEl.textContent = minStock.toString();
    maxStockEl.textContent = maxStock.toString();
    fromSliderStock.setAttribute('min', minStock.toString());
    toSliderStock.setAttribute('min', minStock.toString());
    fromSliderStock.setAttribute('max', maxStock.toString());
    toSliderStock.setAttribute('max', maxStock.toString());
    toSliderStock.value = maxStock.toString();

    fromSliderStock.addEventListener('input', (event) => {
        controlFromSlider(event, fromSliderStock, toSliderStock, minStockEl, maxStockEl);
    });
    toSliderStock.addEventListener('input', (event) => {
        controlToSlider(event, fromSliderStock, toSliderStock, minStockEl, maxStockEl);
    });

    setAccess(toSliderStock, toSliderStock);
}

function controlFromSlider(
    event: Event,
    fromSlider: HTMLInputElement,
    toSlider: HTMLInputElement,
    minEl: HTMLElement,
    maxEl: HTMLElement
) {
    const [from, to] = getParsed(fromSlider, toSlider);
    if (from > to) {
        fromSlider.value = to.toString();
    }
    minEl.textContent = fromSlider.value;
}

function controlToSlider(
    event: Event,
    fromSlider: HTMLInputElement,
    toSlider: HTMLInputElement,
    minEl: HTMLElement,
    maxEl: HTMLElement
) {
    const [from, to] = getParsed(fromSlider, toSlider);
    setAccess(toSlider, toSlider);
    if (from <= to) {
        toSlider.value = to.toString();
    } else {
        toSlider.value = from.toString();
    }
    maxEl.textContent = toSlider.value;
}

function getParsed(currentFrom: HTMLInputElement, currentTo: HTMLInputElement): number[] {
    const from: number = parseInt(currentFrom.value, 10);
    const to: number = parseInt(currentTo.value, 10);
    return [from, to];
}

function setAccess(first: HTMLInputElement, second: HTMLInputElement): void {
    // if (Number(second.value) <= 0) {
    //     first.style.zIndex = '2';
    // } else {
    //     first.style.zIndex = '0';
    // }
}
