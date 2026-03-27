import { getStockOfProduct } from './getProductsData';

export function addToStorage(id: string, count: number): void {
    let item: string = getStorage('O-S-cart-now');
    if (item) {
        const storageArr = item.split('/');
        const sameElInStorage: number = storageArr.findIndex((el) => el.includes(`id_${id}`));
        if (sameElInStorage >= 0) {
            const prevCount = Number(storageArr[sameElInStorage].split('=')[1]);
            let currCount: number = prevCount + count;
            if (currCount <= 0) {
                storageArr.splice(sameElInStorage, 1);
            } else {
                const maxCol = getStockOfProduct(+id);
                currCount = currCount > maxCol ? maxCol : currCount;
                storageArr[sameElInStorage] = `id_${id}=${currCount}`;
            }
        } else {
            storageArr.push(`id_${id}=${count}`);
        }
        item = storageArr.join('/');
    } else {
        item = `/id_${id}=${count}`;
    }
    localStorage.setItem('O-S-cart-now', item);
}

export function getStorage(item: string): string {
    let result = '';
    const localItem: string | null = localStorage.getItem(item);
    if (localItem) {
        result = localItem;
    }
    return result;
}

export function parseStorageValue(el: string): number[] {
    const splitedEl: string[] = el.split('=');
    const currCount: number | undefined = +splitedEl[1];
    const currId: number | undefined = Number(splitedEl[0].split('_')[1]);
    return [currId, currCount];
}
