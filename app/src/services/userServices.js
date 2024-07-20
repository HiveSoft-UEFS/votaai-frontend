import axios from 'axios';

const ENDPOINT = 'http://127.0.0.1:8000/users'; // Definindo o endpoint aqui
const ENDPOINT_POLL = 'http://127.0.0.1:8000/polls'; // Definindo o endpoint aqui

/* GET User Data */
async function getUserData() {
    try {
        const token = localStorage.getItem('accessToken');
        const headers = {
            'Authorization': `Bearer ${token}`
        };
          
        const response = await axios.get(`${ENDPOINT}/profile/`, { headers });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

/* POST User Data */
async function create(userData) {
    try {
        const response = await axios.post(`${ENDPOINT}/`, userData);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

/* PATCH User Data */
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

/* PATCH - Atualizar Senha */
async function updatePassword({ userId, currentPassword, newPassword }) {
    try {
        const token = localStorage.getItem('accessToken');
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        const requestData = {
            current_password: currentPassword,
            new_password: newPassword
        };

        // Use o ID do usuário para construir a URL
        const response = await axios.patch(`${ENDPOINT}/${userId}/`, requestData, { headers });
        return response.data;
    } catch (error) {
        console.error('Error updating password:', error.response ? error.response.data : error.message);
        throw error;
    }
}
/* GET Polls Count */
async function getPollCounts(userId) {
    try {
        const token = localStorage.getItem('accessToken');
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        // Chama a API para obter a contagem de polls
        const response = await axios.get(`${ENDPOINT_POLL}/participation/`, { headers });
        const { criadas, participadas } = response.data; // Verifique se os nomes dos campos estão corretos

        return { totalCreatedPolls: criadas, totalParticipatedPolls: participadas };
    } catch (error) {
        console.error('Error fetching poll counts:', error);
        throw error;
    }
}

export { getUserData, create, update, getPollCounts, updatePassword };
