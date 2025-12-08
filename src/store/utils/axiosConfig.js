import axios from "axios";

const instance =axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    // baseURL : 'https://system.indorecricketclub.com/api/v1'
    // baseURL: 'http://localhost:4000/api/v1/',
})


 export default instance