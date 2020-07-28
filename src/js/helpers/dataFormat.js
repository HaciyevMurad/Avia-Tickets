import {format} from 'date-fns'


export function dateFormat(str, type){
    const date = new Date(str)
    return format(date,type)
}