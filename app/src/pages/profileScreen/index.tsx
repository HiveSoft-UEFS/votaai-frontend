import React from "react";
import BasePage from "../../components/basePage";
import './profileScreen.css'
import CustomButton from "../../components/customButton";

const ProfileScreen = () => {
    return(
        <BasePage username="NomeUsuário" title="PERFIL">

        <div className="profile-data-profile-screen">
            <div className="input-group-2-profile-screen">
                <label htmlFor="cpf">CPF</label>
                <input
                    type="text"
                    id="cpf"
                    placeholder="000.000.000-00"
                    className="profile-input-profile-screen"
                />
            </div>

            <div className="input-group-2-profile-screen">
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    id="email"
                    placeholder="Email"
                    className="profile-input-profile-screen"
                />
            </div>
        </div>

        <div className="profile-data-secondary-profile-screen">
            <div className="input-group-2-profile-screen">
                <label htmlFor="firstName">Primeiro Nome</label>
                <input
                    type="text"
                    id="firstName"
                    placeholder="Primeiro Nome"
                    className="profile-input-profile-screen"
                />
            </div>

            <div className="input-group-2-profile-screen">
                <label htmlFor="lastName">Sobrenome</label>
                <input
                    type="text"
                    id="lastName"
                    placeholder="Sobrenome"
                    className="profile-input-profile-screen"
                />
            </div>

            <div className="input-group-2-profile-screen">
                <label htmlFor="nomeUsuario">Nome de Usuário</label>
                <input
                    type="text"
                    id="nomeUsuario"
                    placeholder="Nome de Usuário"
                    className="profile-input-profile-screen"
                />
            </div>

            <div className="input-group-secondary-2-profile-screen">
                <label htmlFor="votacaoCriada">Votação Criadas:</label>
                <input
                    type="text"
                    id="votacaoCriada"
                    placeholder="0"
                    className="profile-input-profile-screen"
                />
            </div>

            <div className="input-group-secondary-2-profile-screen">
                <label htmlFor="votacaoParticipada">Votações Participadas:</label>
                <input
                    type="text"
                    id="votacaoParticipada"
                    placeholder="0"
                    className="profile-input-profile-screen"
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
        
</BasePage>
    );

}
export default ProfileScreen;