import '../css/style.css'
import './plugins'
import locations from './store/locations';
import formUI from './views/form';
import currencyUI from './views/currency';
import ticketUI from './views/tickets';


document.addEventListener('DOMContentLoaded', ()=>{
    initApp();
    const form = formUI.form
    
    

    form.addEventListener('submit',()=>{
        event.preventDefault()
        onFormSubmit()
    })


    async function initApp(){
        await locations.init();
        formUI.setAutocomplet(locations.shortCityList)
    }

    async function onFormSubmit(){
        const origin = locations.getCityKeyByName(formUI.originValue);
        const destination = locations.getCityKeyByName(formUI.destinationValue);
        const depart_date = formUI.departValue;
        const return_date = formUI.returnValue;
        const currency = currencyUI.currencyValue;

        await locations.fetchTickets({
            origin,
            destination,
            depart_date,
            return_date,
            currency
        })

        ticketUI.renderTickets(locations.lastSearch)
        console.log(locations.lastSearch);
        
       
    }

})