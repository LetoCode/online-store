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

        const input: HTMLInputElement = document.createElement('input');
        input.setAttribute('type', 'checkbox');
        input.setAttribute('id', element);
        input.setAttribute('name', element);
        input.checked = false;
        elContainer.append(input);

        const label: HTMLElement = document.createElement('label');
        label.setAttribute('for', element);
        label.innerText = element;
        elContainer.append(label);

        const spanContainer: HTMLElement = document.createElement('div');
        spanContainer.classList.add('element__counts');

        const countEl_span1: HTMLElement = document.createElement('span');
        countEl_span1.setAttribute('id', `category_${element}_currCount`);
        countEl_span1.classList.add('element__current-count');
        countEl_span1.innerText = mapCurrentCount.get(element)?.toString() || '';
        spanContainer.append(countEl_span1);

        const countEl_span2: HTMLElement = document.createElement('span');
        countEl_span2.innerText = '/';
        spanContainer.append(countEl_span2);

        const countEl_span3: HTMLElement = document.createElement('span');
        countEl_span3.setAttribute('id', `category_${element}_allCount`);
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

        const input: HTMLInputElement = document.createElement('input');
        input.setAttribute('type', 'checkbox');
        input.setAttribute('id', element);
        input.setAttribute('name', element);
        input.checked = false;
        elContainer.append(input);

        const label: HTMLElement = document.createElement('label');
        label.setAttribute('for', element);
        label.innerText = element;
        elContainer.append(label);

        const spanContainer: HTMLElement = document.createElement('div');
        spanContainer.classList.add('element__counts');

        const countEl_span1: HTMLElement = document.createElement('span');
        countEl_span1.setAttribute('id', `brand_${element}_currCount`);
        countEl_span1.classList.add('element__current-count');
        countEl_span1.innerText = mapCurrentCount.get(element)?.toString() || '';
        spanContainer.append(countEl_span1);

        const countEl_span2: HTMLElement = document.createElement('span');
        countEl_span2.innerText = '/';
        spanContainer.append(countEl_span2);

        const countEl_span3: HTMLElement = document.createElement('span');
        countEl_span3.setAttribute('id', `brand_${element}_allCount`);
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

export function showPriceFilter(minPrice: number, maxPrice: number, changeAttributes = true): void {
    const fromSliderPrice: HTMLInputElement | null = document.querySelector('#fromSlider-price');
    const toSliderPrice: HTMLInputElement | null = document.querySelector('#toSlider-price');
    const minPriceEl: HTMLElement | null = document.querySelector('#min-price');
    const maxPriceEl: HTMLElement | null = document.querySelector('#max-price');
    if (fromSliderPrice && toSliderPrice && minPriceEl && maxPriceEl) {
        minPriceEl.textContent = minPrice.toString();
        maxPriceEl.textContent = maxPrice.toString();
        if (changeAttributes) {
            fromSliderPrice.setAttribute('min', minPrice.toString());
            fromSliderPrice.setAttribute('max', maxPrice.toString());
        }
        fromSliderPrice.value = minPrice.toString();
        if (changeAttributes) {
            toSliderPrice.setAttribute('min', minPrice.toString());
            toSliderPrice.setAttribute('max', maxPrice.toString());
        }
        toSliderPrice.value = maxPrice.toString();

        fromSliderPrice.addEventListener('input', () => {
            controlFromSlider(fromSliderPrice, toSliderPrice, minPriceEl);
        });
        toSliderPrice.addEventListener('input', () => {
            controlToSlider(fromSliderPrice, toSliderPrice, maxPriceEl);
        });
    }
}

export function showStockFilter(minStock: number, maxStock: number, changeAttributes = true): void {
    const fromSliderStock: HTMLInputElement | null = document.querySelector('#fromSlider-stock');
    const toSliderStock: HTMLInputElement | null = document.querySelector('#toSlider-stock');
    const minStockEl: HTMLElement | null = document.querySelector('#min-stock');
    const maxStockEl: HTMLElement | null = document.querySelector('#max-stock');
    if (fromSliderStock && toSliderStock && minStockEl && maxStockEl) {
        minStockEl.textContent = minStock.toString();
        maxStockEl.textContent = maxStock.toString();
        if (changeAttributes) {
            fromSliderStock.setAttribute('min', minStock.toString());
            fromSliderStock.setAttribute('max', maxStock.toString());
        }
        fromSliderStock.value = minStock.toString();
        if (changeAttributes) {
            toSliderStock.setAttribute('min', minStock.toString());
            toSliderStock.setAttribute('max', maxStock.toString());
        }
        toSliderStock.value = maxStock.toString();

        fromSliderStock.addEventListener('input', () => {
            controlFromSlider(fromSliderStock, toSliderStock, minStockEl);
        });
        toSliderStock.addEventListener('input', () => {
            controlToSlider(fromSliderStock, toSliderStock, maxStockEl);
        });
    }
}

function controlFromSlider(fromSlider: HTMLInputElement, toSlider: HTMLInputElement, minEl: HTMLElement) {
    const [from, to] = getParsed(fromSlider, toSlider);
    if (from > to) {
        fromSlider.value = to.toString();
    }
    minEl.textContent = fromSlider.value;
}

function controlToSlider(fromSlider: HTMLInputElement, toSlider: HTMLInputElement, maxEl: HTMLElement) {
    const [from, to] = getParsed(fromSlider, toSlider);
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
