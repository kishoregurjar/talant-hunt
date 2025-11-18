import axios from "axios";

const instance =axios.create({
    baseURL: 'https://system.indorecricketclub.com/api/v1/',
})


 export default instance