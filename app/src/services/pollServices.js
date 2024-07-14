import axios from 'axios';

const ENDPOINT = 'http://127.0.0.1:8000/polls'; 

export const getPollData = async () => {
    try {
        const response = await axios.get(ENDPOINT);
        console.log('Dados recebidos:', response.data);
        return response.data; // Retorna os dados recebidos, se necessário
    } catch (error) {
        console.error('Erro ao fazer requisição:', error);
        throw error; // Ou trate o erro de outra maneira, conforme necessário
    }
};

export const getPollSearch= async (value, order, category, tag, code) => {
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
        return response.data; // Retorna os dados recebidos, se necessário
    } catch (error) {
        console.error('Erro ao fazer requisição:', error);
        throw error; // Ou trate o erro de outra maneira, conforme necessário
    }
};