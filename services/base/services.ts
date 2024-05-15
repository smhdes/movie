import { defaultHeaders } from './header';
import axios from "../../node_modules/axios/index";

const serviceCall = axios.create({
    baseURL:process.env.NEXT_PUBLIC_OMDB_URL,
    // headers:defaultHeaders
});

export {serviceCall}