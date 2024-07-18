import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Remova os tokens do localStorage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken'); // Se você estiver armazenando o refresh token também

        // Redirecione o usuário para a página de login ou home
        navigate('/'); // Altere '/login' para a rota que você deseja redirecionar após o logout
    }, [navigate]);

    return null;
};

export default Logout;