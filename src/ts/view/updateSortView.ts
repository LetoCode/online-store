setTimeout(() => {
    const search: string = window.location.search;
    const sortSelect: HTMLSelectElement | null = document.querySelector('.sort__select');
    let sortValue = '';
    if (search) {
        const params: URLSearchParams = new URLSearchParams(search);
        params.forEach((value, key) => {
            if (key === 'sort') {
                sortValue = value;
            }
        });
        if (sortSelect) {
            sortSelect.value = sortValue;
            const sortEvent = new Event('change', { bubbles: true });
            sortSelect.dispatchEvent(sortEvent);
        }
    }
}, 100);
