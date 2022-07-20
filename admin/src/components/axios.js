import axios from 'axios'

const instance = axios.create({
    baseURL:'http://localhost:5000',
})

instance.interceptors.request.use((req)=>{
    if(localStorage.getItem('AuthToken')){
        req.headers['authorization'] = `Bearer ${localStorage.getItem('AuthToken')}`;
    }
    return req;
})

export default instance;
