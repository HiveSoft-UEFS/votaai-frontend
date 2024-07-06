import React, { useEffect, useState, ChangeEvent } from 'react';
import BasePage from '../../components/basePage';
import './profileScreen.css';
import CustomButton from '../../components/customButton';
import { getUserData } from '../../services/userServices';


interface UserData {
    cpf: string;
    email: string;
    name: string;
    lname: string;
    username: string;
    status: string;
    role: string;
    password: string;
    is_active: boolean;
    is_staff: boolean;
    last_login: string | null;
    is_admin: boolean;

}



const ProfileScreen = ({ userId }: { userId: number }) => {



    //const [userData, setUserData] = useState<UserData | null>(null);



    const [userData, setUserData] = useState({
        id: 0,
        cpf: "",
        email: "",
        name: "",
        lname: "",
        username: "",
        status: "",
        role: "",
        password: "",
        is_active: true,
        is_staff: true,
        last_login: null,
        is_admin: true
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await getUserData(); // Chama a função sem o endpoint
                setUserData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchUserData();
    }, [userId]);


    return (
        <>
            {!userData ? (
                <div>Loading...</div>
            ) : (
                <BasePage username={userData.username} title="PERFIL">
                    <div className="profile-data-profile-screen">

                        <div className="input-group-2-profile-screen">
                            <label htmlFor="cpf">CPF</label>
                            <input
                                type="text"
                                id="cpf"
                                name="cpf" // Adicione o atributo name
                                value={userData.cpf}
                                className="profile-input-profile-screen"
                                onChange={handleChange}
                                readOnly
                            />
                        </div>

                        <div className="input-group-2-profile-screen">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                id="email"
                                name='email'
                                value={userData.email}
                                className="profile-input-profile-screen"
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="profile-data-secondary-profile-screen">
                        <div className="input-group-2-profile-screen">
                            <label htmlFor="firstName">Primeiro Nome</label>
                            <input
                                type="text"
                                id="firstName"
                                value={userData.name}
                                className="profile-input-profile-screen"
                                readOnly
                            />
                        </div>

                        <div className="input-group-2-profile-screen">
                            <label htmlFor="lastName">Sobrenome</label>
                            <input
                                type="text"
                                id="lastName"
                                value={userData.lname}
                                className="profile-input-profile-screen"
                                readOnly
                            />
                        </div>

                        <div className="input-group-2-profile-screen">
                            <label htmlFor="nomeUsuario">Nome de Usuário</label>
                            <input
                                type="text"
                                id="nomeUsuario"
                                name="username"
                                value={userData.username}
                                className="profile-input-profile-screen"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="input-group-secondary-2-profile-screen">
                            <label htmlFor="votacaoCriada">Votação Criadas:</label>
                            <input
                                type="text"
                                id="votacaoCriada"
                                placeholder="0"
                                className="profile-input-profile-screen"
                                readOnly
                            />
                        </div>

                        <div className="input-group-secondary-2-profile-screen">
                            <label htmlFor="votacaoParticipada">Votações Participadas:</label>
                            <input
                                type="text"
                                id="votacaoParticipada"
                                placeholder="0"
                                className="profile-input-profile-screen"
                                readOnly

                            />
                        </div>

                        <div className="button-profile-screen">
                            <CustomButton
                                text="Alterar Senha"
                                bgcolor="#EBE5FC"
                                text_color="#295478"
                                font_family="Nunito, sans-serif"
                                font_weight="Bold"
                            />
                        </div>

                        <div className="button-2-profile-screen">
                            <CustomButton
                                text="Alterar Dados"
                                bgcolor="#EBE5FC"
                                text_color="#295478"
                                font_family="Nunito, sans-serif"
                                font_weight="Bold"
                            />
                        </div>
                    </div>
                </BasePage>)} </>
    );
};
export default ProfileScreen;
