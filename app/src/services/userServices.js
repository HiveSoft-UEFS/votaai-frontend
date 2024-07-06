import axios from 'axios';

const ENDPOINT = 'http://127.0.0.1:8000/users'; // Definindo o endpoint aqui

/*GET*/
async function getUserData() {
    try {
        const token = localStorage.getItem('accessToken')
        const headers = {
            'Authorization': `Bearer ${token}`
        };
          
        const response = await axios.get(`${ENDPOINT}/profile/`, {headers});
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
/*Put*/
async function create(userData: Object) {
    try {
        const response = await axios.post(`${ENDPOINT}/`, userData);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export { getUserData, create };


