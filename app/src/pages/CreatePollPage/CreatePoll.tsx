import React, {useState} from "react";
import PageTitle from "../../components/pageTitle";
import BasePage from "../../components/basePage";
import "./CreatePoll.css";


const CreatePoll = () =>{
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [dataLimite, setDataLimite] = useState(new Date());
    const [ePublico, setEPublico] = useState(false)
    const [ePrivado, setEPrivado] = useState(false)
    const [multiplaEscolha, setMultiplaEscolha] = useState(false);
    const [escolhaUnica, setEscolhaUnica] = useState(false)


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        
        <div className="center-content">
            <div className="page-content-wrapper">
                <BasePage username="Caio Bruno" title="Criar Votação">
                   {/*
                    <PageTitle text="Criar Enquete" color="white" />
                    */}
                    <form className="create-poll-form" onSubmit={handleSubmit}>
                        <label>
                            Titulo da enquete:
                            <input
                                type="text"
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                            />
                        </label>
                        <label>
                            Descrição da Enquete:
                            <textarea
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                            />
                        </label>
                        <label>
                            
                            Data Limite 
                            <input 
                                type="datetime-local"
                                value={dataLimite.toISOString().substring(0, 16)}
                                onChange={(e) => setDataLimite(new Date(e.target.value))} 
                            />
                        </label>

                        {/* Parte das checkbox  */}
                        <div className="checkbox-section">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={ePublico}
                                    onChange={() => {setEPublico(true); setEPrivado(false)}}
                                />
                                Enquete Pública
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={ePrivado}
                                    onChange={() => {setEPrivado(true); setEPublico(false)}}
                                    
                                />
                                Enquete Privada
        
                            </label>

                            <label>
                                <input
                                    type="checkbox"
                                    checked={escolhaUnica}
                                    onChange={() => {setEscolhaUnica(true); setMultiplaEscolha(false)}}
                                />
                                Escolha Única
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={multiplaEscolha}
                                    onChange={() => {setMultiplaEscolha(true); setEscolhaUnica(false)}}
                                />
                                Multipla Escolha
                            </label>
                        </div>

                        </form>

                    </BasePage>
                </div>
           
        </div>
    )

}
export default CreatePoll;
