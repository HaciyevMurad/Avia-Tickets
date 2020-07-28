import config from '../config/apiConfig';
import axios from 'axios'

class ApiServices{
    constructor(config){
        this.url = config.url;
    }



async countries(){
    try{
        const response = await axios.get(`${this.url}/countries`);
        return response.data;
    }catch(error){
        console.log(error);
    }
}

async cities(){
    try{
        const response = await axios.get(`${this.url}/cities`);
        return response.data;
    }catch(error){
        console.log(error);
    }
}

async prices(params){
    try{
        const response = await axios.get(`${this.url}/prices/cheap`,{
            params
        });
        return response.data;
    }catch(error){
        console.log(error);
    }
}

async airlines(){
    try{
        const response = await axios.get(`${this.url}/airlines`);
        return response.data
    }catch(error){
        console.log(error);
    }
   
}
}

const apiServices = new ApiServices(config);
export default apiServices;