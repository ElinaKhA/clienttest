import { $host } from "./index";
export const getAllBooks = async () =>{
    const {data} = await $host.get('http://localhost:5202/GetBooks')
    return data
}