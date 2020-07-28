import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';


//init select

const select = document.querySelectorAll('select');
M.FormSelect.init(select);

//init autocomplete

const autocomplete = document.querySelectorAll('.autocomplete');
M.Autocomplete.init(autocomplete);

export function getAutocompleteInstanse(elem){
    return M.Autocomplete.getInstance(elem)
}


//init departpicker

const datepicker = document.querySelectorAll('.datepicker');
M.Datepicker.init(datepicker,{
    showClearBtn: true,
    format: 'yyyy-mm'
});

export function getDatepickerInstanse(elem){
    return M.Datepicker.getInstance(elem)
}

// init dropdown

const dropdown = document.querySelectorAll('.dropdown-trigger');
M.Dropdown.init(dropdown);