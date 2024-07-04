import axios from 'axios';

const ENDPOINT = 'http://127.0.0.1:8000/users'; // Definindo o endpoint aqui

/*GET*/
async function getUserData(id: number) {
    try {
        const response = await axios.get(`${ENDPOINT}/${id}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
/*Put*/



export default getUserData;

