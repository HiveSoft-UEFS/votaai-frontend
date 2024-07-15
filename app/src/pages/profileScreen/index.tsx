import React, { useEffect, useState, ChangeEvent } from 'react';
import BasePage from '../../components/basePage';
import './profileScreen.css';
import CustomButton from '../../components/customButton';
import { getUserData, update, getPollCounts } from '../../services/userServices';
import UpdatePasswordModal from '../../components/forgotPasswordModal/updatePasswordModal';

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
    id: number; // Adicionando o id para atualizar o usuário
}

const ProfileScreen = ({ userId }: { userId: number }) => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [totalPollsCreated, setTotalPollsCreated] = useState(0);
    const [totalPollsParticipated, setTotalPollsParticipated] = useState(0);
    const [openModal, setOpenModal] = useState(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (userData) {
            setUserData({
                ...userData,
                [name]: value,
            });
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await getUserData();
                setUserData(data);
                const { totalCreatedPolls, totalParticipatedPolls } = await getPollCounts(data.id);
                setTotalPollsCreated(totalCreatedPolls || 0);
                setTotalPollsParticipated(totalParticipatedPolls || 0);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchUserData();
    }, [userId]);

    const handleUpdate = async () => {
        if (userData) {
            try {
                const updatedData = await update(userData);
                console.log("User data updated successfully", updatedData);
            } catch (error) {
                console.error('Error updating data:', error);
            }
        }
    };

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

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
                                name="cpf"
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
                            <label htmlFor="votacaoCriada">Votações Criadas:</label>
                            <input
                                type="text"
                                id="votacaoCriada"
                                value={totalPollsCreated.toString()}
                                className="profile-input-profile-screen"
                                readOnly
                            />
                        </div>

                        <div className="input-group-secondary-2-profile-screen">
                            <label htmlFor="votacaoParticipada">Votações Participadas:</label>
                            <input
                                type="text"
                                id="votacaoParticipada"
                                value={totalPollsParticipated.toString()}
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
                                callback={handleOpenModal} // Abre o modal
                            />
                        </div>

                        <div className="button-2-profile-screen">
                            <CustomButton
                                text="Alterar Dados"
                                bgcolor="#EBE5FC"
                                text_color="#295478"
                                font_family="Nunito, sans-serif"
                                font_weight="Bold"
                                callback={handleUpdate}
                            />
                        </div>
                    </div>

                    {/* Modal de Atualização de Senha */}
                    <UpdatePasswordModal 
                    open={openModal} 
                    onClose={handleCloseModal} />
                </BasePage>
            )}
        </>
    );
};

export default ProfileScreen;
