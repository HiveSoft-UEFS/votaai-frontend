import React from "react";
import BasePage from "../../components/basePage";
import './profileScreen.css'
import CustomButton from "../../components/customButton";

const ProfileScreen = () => {
    return(
        <BasePage username="NomeUsuário" title="PERFIL">

        <div className="profile-data">
            <div className="input-group-2">
                <label htmlFor="cpf">CPF</label>
                <input
                    type="text"
                    id="cpf"
                    placeholder="000.000.000-00"
                    className="profile-input"
                />
            </div>

            <div className="input-group-2">
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    id="email"
                    placeholder="Email"
                    className="profile-input"
                />
            </div>
        </div>

        <div className="profile-data-secondary">
            <div className="input-group-2">
                <label htmlFor="firstName">Primeiro Nome</label>
                <input
                    type="text"
                    id="firstName"
                    placeholder="Primeiro Nome"
                    className="profile-input"
                />
            </div>

            <div className="input-group-2">
                <label htmlFor="lastName">Sobrenome</label>
                <input
                    type="text"
                    id="lastName"
                    placeholder="Sobrenome"
                    className="profile-input"
                />
            </div>

            <div className="input-group-2">
                <label htmlFor="nomeUsuario">Nome de Usuário</label>
                <input
                    type="text"
                    id="nomeUsuario"
                    placeholder="Nome de Usuário"
                    className="profile-input"
                />
            </div>

            <div className="input-group-2-secondary-2">
                <label htmlFor="votacaoCriada">Votação Criadas:</label>
                <input
                    type="text"
                    id="votacaoCriada"
                    placeholder="0"
                    className="profile-input"
                />
            </div>

            <div className="input-group-2-secondary-2">
                <label htmlFor="votacaoParticipada">Votações Participadas:</label>
                <input
                    type="text"
                    id="votacaoParticipada"
                    placeholder="0"
                    className="profile-input"
                />
            </div>

        </div>
        <div className="button">
            <CustomButton 
                text="Alterar Senha" 
                bgcolor="#EBE5FC"
                text_color="#295478" 
                font_family="Nunito, sans-serif"
                font_weight="Bold"
            /> 
        </div>
</BasePage>
    );

}
export default ProfileScreen;