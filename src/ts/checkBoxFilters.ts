document.addEventListener('click', (event: MouseEvent) => {
   let mode = 'del';

   if ((event.target as HTMLElement).closest('.route_filter')) {
      if ((event.target as HTMLInputElement).checked) {
         mode = 'add';
      }
      const target: HTMLElement = (event.target as HTMLElement).closest('.route_filter')!;
      const url = createQueryUrlForCheckbox(target, mode);
      console.log(url)
      window.history.pushState({}, '', url);
   }

   // if ((event.target as HTMLElement).closest('.route_link')) {
   //    if ((event.target as HTMLInputElement).checked) {
   //       mode = 'add';
   //    }
   //    const target: HTMLElement = (event.target as HTMLElement).closest('.route_link')!;
   //    const url = createQueryUrlForCheckbox(target);
   //    window.history.pushState({}, '', url);
   // }
});

function createQueryUrlForCheckbox(target: HTMLElement, mode: string): string {
   const firstURL: string = window.location.href.split('?')[0];
   const search: string = window.location.search;
   const key: string = target.dataset.filterKey!;
   const value: string = target.dataset.filterValue!;
   let params: URLSearchParams;

   if (search) {
      params = new URLSearchParams(search);
   } else {
      params = new URLSearchParams();
   }

   if (mode === 'del') {
      params.delete(value);
   } else {
      params.append(value, key);
   }
   return `${firstURL}?${params.toString()}`;
}
