import api from '../services/apiServices';
import {dateFormat} from '../helpers/dataFormat';

class Locations{
    constructor(api,helpers){
        this.api - api;
        this.countries = null;
        this.cities = null;
        this.airlines = null;
        this.shortCityList = null;
        this.lastSearch = {};
        this.format = helpers.dateFormat
    }

    async init(){

        const response = await Promise.all([
            api.countries(),
            api.cities(),
            api.airlines()
        ])

        const [countries,cities,airlines] = response;
        this.countries = this.sterializeCounties(countries);
        this.cities = this.sterializeCities(cities);
        this.airlines = this.sterializeAirlines(airlines);

        this.shortCityList = this.createShortCityList(this.cities);

        console.log(airlines);
        return response
        
    }

    sterializeCounties(countries){
        return countries.reduce((acc,country)=>{
            country.name = country.name || country.name_translations.en;
            acc[country.code] = country;
            return acc;
        },{})
    }

    sterializeCities(cities){
        return cities.reduce((acc,city)=>{
            city.name = city.name || city.name_translations.en;
            const country_name = this.getCountryNameByCode(city.country_code);
            const full_name = `${ city.name},${country_name}`;
            acc[city.code] = {
                ...city,
                country_name,
                full_name
            };
            return acc
        },{})
    }

    sterializeAirlines(airlines){
        return airlines.reduce((acc,airline)=>{
            airline.logo = `http://pics.avs.io/200/200/${airline.code}.png`;
            airline.name = airline.name || airline.name_translations.en;
            acc[airline.code] = airline;
            return acc;
        },{})
    }

    sterializeTickets(reponseData){
        return Object.values(reponseData).map(item=>{
            return {
                ...item,
                origin_name : this.getCityNameByCode(item.origin),
                destination_name : this.getCityNameByCode(item.destination),
                airline_name : this.getAirlineNameByCode(item.airline),
                airline_logo : this.getAirlineLogoByCode(item.airline),
                departure_at : this.format(item.departure_at, 'dd MMM yyyy hh:mm'),
                return_at : this.format(item.return_at, 'dd MMM yyyy hh:mm')
            }
        })
        
    }

    createShortCityList(cities){
        return Object.entries(cities).reduce((acc,[,value])=>{
            acc[value.full_name] = null;
            return acc;
        },{})
    }

    async fetchTickets(params){
        const response =  await api.prices(params);
        this.lastSearch = this.sterializeTickets(response.data)
        
        
    }

    getCityNameByCode(code){
        return this.cities[code].name
    }

    getAirlineNameByCode(code){
        return this.airlines[code] ? this.airlines[code].name : ''
    }

    getAirlineLogoByCode(code){
        return this.airlines[code] ? this.airlines[code].logo : ''
    }

    getCountryNameByCode(code){
        return this.countries[code].name;
        
    }

    getCityKeyByName(key){
        const city = Object.values(this.cities).find(item => item.full_name === key);
        return city.code;

    }
}


const locations = new Locations(api,{dateFormat});
export default locations;