import axios from 'axios';
const SERVICE_CONNECTOR = axios.create({
    baseURL: "https://wi-recruitment.herokuapp.com"
});

export { SERVICE_CONNECTOR }