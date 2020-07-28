class CurrencyUI{
    constructor(){
        this.currency = document.querySelector('#currency')
    }


    get currencyValue(){
        return this.currency.value;
    }


    getCurrencyValue(){
        const currency = document.querySelector('#currency')
        const dictionary = {
            USD : '$',
            EUR: '€',
            AZN: '₼'
        }
        return dictionary[currency.value]
    }
}

const currencyUI = new CurrencyUI();

export default currencyUI ;