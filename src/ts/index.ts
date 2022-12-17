import '../scss/style.scss';
import products from './products.json';
import './products-grid';

window.onload = windowLoad;

function windowLoad(): void {
    //  const path: any = window.location.pathname;
    //  const search: string = window.location.search;
    //  if (search) {
    //      const urlSearchParams: URLSearchParams = new URLSearchParams(search);
    //      console.log('par', search);
    //      urlSearchParams.forEach((value, key) => {
    //          console.log(value, key);
    //      });
    //  } else {
    //      console.log('par', 'no');
    //  }
    //  fetch('../assets/products/products.JSON').then((r) => console.log(r));
    console.log('products', products);
}
