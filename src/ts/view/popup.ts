const bodyElement: HTMLElement | null = document.querySelector('body');
const thisPopup: HTMLElement | null = document.getElementById('popup');
import visaLogo from '../../assets/logoVisa.png';
import unionPayLogo from '../../assets/logoUnionPay.png';
import masterCardLogo from '../../assets/logoMasterCard.svg';
import noPaySystemLogo from '../../assets/noPaySystemLogo.webp';
import { handleLocation } from '../route/routing';

export function popupOpen(): void {
    if (thisPopup) {
        thisPopup.classList.add('_open');
        bodyElement?.classList.add('_popup-open');
        thisPopup.addEventListener('click', closeThisPopup);
    }
}

function popupClose(): void {
    if (thisPopup) {
        thisPopup.classList.remove('_open');
        bodyElement?.classList.remove('popup-open');
    }
}

document.addEventListener('keydown', keyDownEscape);

//+++++++++++++++++++++++++++++++listeners++++++++++++++++++++++++++++++++++++++++++++
//--------------------------------key Escape------------------------------------------------
function keyDownEscape(event: Event) {
    if ((event as KeyboardEvent).code === 'Escape') {
        const popupActive: HTMLElement | null = document.querySelector('.popup._open');
        if (popupActive) popupClose();
    }
}

//--------------------------------close popup------------------------------------------------
function closeThisPopup(event: Event) {
    if (!(event.target as HTMLElement).closest('.popup__content')) {
        popupClose();
    }
}

//--------------------------------name------------------------------------------------
const name: HTMLElement | null = document.getElementById('name');

if (name) {
    name.addEventListener('change', () => {
        checkValidName();
    });

    name.addEventListener('input', (event) => {
        removeInvalidClass(event);
    });
}

//--------------------------------phone------------------------------------------------
const phone: HTMLElement | null = document.getElementById('phone');

if (phone) {
    phone.addEventListener('change', () => {
        checkValidPhone();
    });

    phone.addEventListener('input', (event) => {
        removeInvalidClass(event);
    });
}
//--------------------------------address------------------------------------------------
const address: HTMLElement | null = document.getElementById('address');
if (address) {
    address.addEventListener('change', () => {
        checkValidAddress();
    });

    address.addEventListener('input', (event) => {
        removeInvalidClass(event);
    });
}
//--------------------------------email------------------------------------------------
const email: HTMLElement | null = document.getElementById('email');

if (email) {
    email.addEventListener('change', () => {
        checkValidEmail();
    });

    email.addEventListener('input', (event) => {
        removeInvalidClass(event);
    });
}

//--------------------------------cart number------------------------------------------------
const cardNumber: HTMLElement | null = document.getElementById('card-number');
if (cardNumber) {
    cardNumber.addEventListener('change', () => {
        checkValidCardNumber();
    });

    cardNumber.addEventListener('keypress', () => {
        if ((cardNumber as HTMLInputElement).value.length < 19) {
            (cardNumber as HTMLInputElement).value = (cardNumber as HTMLInputElement).value
                .replace(/\W/gi, '')
                .replace(/(.{4})/g, '$1 ');
        } else {
            (cardNumber as HTMLInputElement).value = (cardNumber as HTMLInputElement).value.slice(0, 18);
        }
    });

    cardNumber.addEventListener('keyup', (event) => {
        (cardNumber as HTMLInputElement).value = (cardNumber as HTMLInputElement).value.replace(/[^\d ]/g, '');
        const value: string = (cardNumber as HTMLInputElement).value;
        const firstLetter = value[0];
        removeInvalidClass(event);
        changePayingSystemLogo(firstLetter);
    });
}

//--------------------------------card date------------------------------------------------
const cardDate: HTMLElement | null = document.getElementById('card-date');
if (cardDate) {
    cardDate.addEventListener('change', () => {
        checkValidCardDate();
    });

    cardDate.addEventListener('keypress', () => {
        const value: string = (cardDate as HTMLInputElement).value;
        if (value.length < 5) {
            (cardDate as HTMLInputElement).value = value.replace(/\W/gi, '').replace(/(\d{2})/g, '$1/');
        } else {
            (cardDate as HTMLInputElement).value = value.slice(0, 4);
        }
    });

    cardDate.addEventListener('keyup', () => {
        const value: string = (cardDate as HTMLInputElement).value;
        (cardDate as HTMLInputElement).value = value.replace(/[^/\d\s]/g, '');
        if (+value.slice(0, 2) > 12) {
            (cardDate as HTMLInputElement).value = '';
        }
    });
}

//--------------------------------card cvv------------------------------------------------
const cardCvv: HTMLElement | null = document.getElementById('card-cvv');
if (cardCvv) {
    cardCvv.addEventListener('change', () => {
        checkValidCardCvv();
    });

    cardCvv.addEventListener('input', (event) => {
        removeInvalidClass(event);
        (event.target as HTMLInputElement).value = (event.target as HTMLInputElement).value
            .replace(/\D/gi, '')
            .replace(/(.{3})(.)/i, '$1');
    });
}

//--------------------------------sumbmit button------------------------------------------------
const btnSummit: HTMLElement | null = document.getElementById('submit-purchases');
const payingSystemLogo: HTMLElement | null = document.getElementById('paying-system-logo');
if (payingSystemLogo) payingSystemLogo.setAttribute('src', noPaySystemLogo);
if (btnSummit) {
    btnSummit.addEventListener('click', (event) => {
        const checkAllValidity: boolean[] = [
            checkValidName(),
            checkValidPhone(),
            checkValidAddress(),
            checkValidEmail(),
            checkValidCardNumber(),
            checkValidCardDate(),
            checkValidCardCvv(),
        ];
        const personFormError: HTMLElement | null = document.querySelector('.person-form__error');
        if (checkAllValidity.indexOf(false) < 0) {
            const popupContent: HTMLElement | null = document.querySelector('.popup__content');
            const popupOrderIsProcessed: HTMLElement | null = document.querySelector('.popup__order-is-processed');
            if (popupContent && popupOrderIsProcessed && personFormError) {
                popupContent.classList.remove('_active');
                personFormError.classList.remove('_active');
                popupOrderIsProcessed.classList.add('_active');
                document.removeEventListener('keydown', keyDownEscape);
                (thisPopup as HTMLElement).removeEventListener('click', closeThisPopup);
                localStorage.removeItem('O-S-cart-now');
                setTimeout(() => {
                    thisPopup?.classList.remove('_open');
                    popupOrderIsProcessed.classList.remove('_active');
                    history.pushState({}, '', '/');
                    handleLocation(event);
                }, 4000);
            }
        } else {
            if (personFormError) {
                personFormError.classList.add('_active');
            }
        }
    });
}

//+++++++++++++++++++++++++++++++++handlers+++++++++++++++++++++++++++++++++++
function removeInvalidClass(event: Event): void {
    //remove invalid class if value is empty
    const value: string = (event.target as HTMLInputElement).value;
    if (!value) (event.target as HTMLInputElement).classList.remove('_invalid');
}

function checkValidity(selectorName: string, checkingRegExp: RegExp): boolean {
    let result = false;
    const element: HTMLElement | null = document.getElementById(selectorName);
    const value: string = (element as HTMLInputElement).value;
    const valid = checkingRegExp.test(value);
    if (element) {
        if (!valid || !value) {
            element?.classList.add('_invalid');
        } else {
            element?.classList.remove('_invalid');
            result = true;
        }
    }
    return result;
}

function changePayingSystemLogo(firstLetter: string) {
    const payingSystemLogo: HTMLElement | null = document.getElementById('paying-system-logo');
    if (payingSystemLogo) {
        payingSystemLogo.setAttribute('src', noPaySystemLogo);
        if (firstLetter === '4') payingSystemLogo.setAttribute('src', visaLogo);
        if (firstLetter === '5') payingSystemLogo.setAttribute('src', masterCardLogo);
        if (firstLetter === '6') payingSystemLogo.setAttribute('src', unionPayLogo);
    }
}
//---------------------------------name-------------------------------------------
function checkValidName(): boolean {
    const checkingRegExp = /^[a-zа-я]+\s[a-zа-я ]+/i;
    return checkValidity('name', checkingRegExp);
}
//--------------------------------phone------------------------------------------------
function checkValidPhone(): boolean {
    const checkingRegExp = /^\+\d{9,}/;
    return checkValidity('phone', checkingRegExp);
}
//--------------------------------address------------------------------------------------
function checkValidAddress(): boolean {
    const checkingRegExp = /^[a-zёа-я0-9]{5,}\s[a-zёа-я0-9]{5,}\s[a-zёа-я0-9 ]{5,}/i;
    return checkValidity('address', checkingRegExp);
}
//--------------------------------email------------------------------------------------
function checkValidEmail(): boolean {
    const checkingRegExp = /^\w+@[a-zA-Z]+?\.[a-zA-Z.]{2,}/i;
    return checkValidity('email', checkingRegExp);
}

//--------------------------------card number------------------------------------------------
function checkValidCardNumber(): boolean {
    const checkingRegExp = /^\d{4} \d{4} \d{4} \d{4}$/;
    return checkValidity('card-number', checkingRegExp);
}

//--------------------------------card date------------------------------------------------
function checkValidCardDate(): boolean {
    const checkingRegExp = /^\d{2}\/\d{2}$/;
    return checkValidity('card-date', checkingRegExp);
}

//--------------------------------card date------------------------------------------------
function checkValidCardCvv(): boolean {
    const checkingRegExp = /^\d{3}$/;
    return checkValidity('card-cvv', checkingRegExp);
}
