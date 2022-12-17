function route(event: Event): void {
   event = event || window.event;
   const target: EventTarget = event.target!;
   if (target) {
      event.preventDefault();
      window.history.pushState({}, '', (target as HTMLElement).getAttribute('href') as string);
   }
}

export function handleLocation() {
   console.log('routing here');
   const search: string = window.location.search.substring(1);
   if (search) {
      getSearchParams(search);
   }
   const path: string = window.location.pathname;
}

function getSearchParams(search: string) {
   const params = new URLSearchParams(search);
}

// handleLocation();
// window.route = route;

listen(window.history.length);
var oldLength = -1;
function listen(currentLength: number) {
   if (currentLength != oldLength) {
      console.log('routing here225');
   }

   oldLength = window.history.length;
   setInterval(function () {
      listen(window.history.length);
   }, 1000);
}