import axios from "axios";

const instance= axios.create({
    baseURL:'https://hellomag.uz/v1/api'
})
export default instance