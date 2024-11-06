import axios from 'axios';

export const baseurl = 'http://localhost:5000/api'

export const postApi = async(apiUrl, body) => {
    try{
        const response = await axios.post(apiUrl, body, {
            headers: {
                'Content-Type': 'application/json'
            },
        });
        return {data: response.data, error: null};
    }catch(error){
        const message = error.response?.data?.message || error.response?.data || error.message || 'An error occurred';
        return {data: null, error: message}
    }
}



export const getApi = async(apiUrl) => {
    try{
        const response = await axios.get(apiUrl, {
            headers: {
                'Content-Type': 'application/json'
            },
        });
        return {data: response.data, error: null};
    }catch(error){
        const message = error.response?.data?.message || error.response?.data || error.message || 'An error occurred';
        return {data: null, error: message}
    }
}