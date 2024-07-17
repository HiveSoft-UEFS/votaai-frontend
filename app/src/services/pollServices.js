import axios from 'axios';

const ENDPOINT = 'http://127.0.0.1:8000/polls';
const POLL_HISTORY_ENDPOINT = 'http://localhost:8000/polls/history/';

export const getPollData = async () => {
    try {
        const response = await axios.get(`${ENDPOINT}/`);
        console.log('Dados recebidos:', response.data);
        return response.data;
    } catch (error) {
        console.error('Erro ao fazer requisição:', error);
        throw error;
    }
};

export const getPollSearch = async (value, order, category, tag, code) => {
    try {
        const response = await axios.get(`${ENDPOINT}/search/s`, {
            params: {
                value: value,
                order: order,
                category: category,
                tag: tag,
                code: code
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao fazer requisição:', error);
        throw error;
    }
};

export const getUserPollHistory = async () => {
    try {
        const token = localStorage.getItem('accessToken');
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const response = await axios.get(POLL_HISTORY_ENDPOINT, { headers });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar histórico de enquetes:', error);
        throw error;
    }
};