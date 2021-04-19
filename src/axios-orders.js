import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burgerbuilder-31d67-default-rtdb.firebaseio.com'
});

export default instance;