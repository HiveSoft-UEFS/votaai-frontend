import axios from 'axios';

const POLL_HISTORY_ENDPOINT = 'http://localhost:8000/polls/history/'; // Endpoint correto para histórico de enquetes

async function getUserPollHistory() {
    try {
        const token = localStorage.getItem('accessToken');
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const response = await axios.get(POLL_HISTORY_ENDPOINT, { headers });
        return response.data;
    } catch (error) {
        console.error('Error fetching poll history:', error);
        throw error;
    }
}

export { getUserPollHistory };