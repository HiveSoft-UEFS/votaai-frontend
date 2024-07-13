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
/*Post*/
async function create(userData: Object) {
    try {
        const response = await axios.post(`${ENDPOINT}/`, userData);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

/*Patch*/
async function update(userData) {
    const pk = userData.id;
    try {
        const token = localStorage.getItem('accessToken');
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        const response = await axios.patch(`${ENDPOINT}/${pk}/`, userData, { headers });
        return response.data;
    } catch (error) {
        console.error('Error updating user data:', error.response ? error.response.data : error.message);
        throw error;
    }
}
export { getUserData, create, update };


