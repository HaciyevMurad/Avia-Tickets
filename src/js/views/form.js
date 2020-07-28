import {getAutocompleteInstanse,getDatepickerInstanse} from '../plugins/materialize'
class FormUI{
    constructor(autocompleteInstanse, datepickerInstanse){
        this._form = document.forms['locationControls'];
        this.origin = document.querySelector('#autocomplete-origin');
        this.originAutocomplete = autocompleteInstanse(this.origin);
        this.destination = document.querySelector('#autocomplete-destination');
        this.destinationAutocomplete = autocompleteInstanse(this.destination)
        this.depart = document.querySelector('#datepicker-depart');
        this.return = document.querySelector('#datepicker-return');
        this.departDatepicker = datepickerInstanse(this.depart);
        this.returnDatepicker = datepickerInstanse(this.return);
    }

    get form(){
        return this._form
    }
    get originValue(){
        return this.origin.value
    }
    get destinationValue(){
        return this.destination.value
    }
    get departValue(){
        return this.departDatepicker.toString();
    }
    get returnValue(){
        return this.returnDatepicker.toString();
    }

    setAutocomplet(data){
        this.originAutocomplete.updateData(data);
        this.destinationAutocomplete.updateData(data);
    }


}


const formUI = new FormUI(getAutocompleteInstanse , getDatepickerInstanse);
export default formUI;