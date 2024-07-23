import axios from "axios";

const instance= axios.create({
    baseURL:'https://akfamakon-onrender.onrender.com/api'
})
export default instance