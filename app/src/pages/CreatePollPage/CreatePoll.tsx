import React, { useState } from "react";
import BasePage from "../../components/basePage";
import "./CreatePoll.css";

import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

const CreatePoll = () => {
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [dataLimite, setDataLimite] = useState(new Date());
    const [ePublico, setEPublico] = useState(false);
    const [ePrivado, setEPrivado] = useState(false);
    const [multiplaEscolha, setMultiplaEscolha] = useState(false);
    const [escolhaUnica, setEscolhaUnica] = useState(false);
    
    

    const tema = useTheme();
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };
    const [ativarStep, setAtivarStep] = React.useState(0);

    const [arraySteps, setArraySteps] = React.useState([
        <div key="step0"> 
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

                <div className="checkbox-section">
                    <label className="check-Publica-privada">
                        <input
                            type="checkbox"
                            checked={ePublico}
                            onChange={() => { setEPublico(true); setEPrivado(false); }}
                        />
                        Enquete Pública
    
                        <input
                            type="checkbox"
                            checked={ePrivado}
                            onChange={() => { setEPrivado(true); setEPublico(false); }}
                        />
                        Enquete Privada
                    </label>

                    <label className="check-unica-multipla">
                        <input
                            type="checkbox"
                            checked={escolhaUnica}
                            onChange={() => { setEscolhaUnica(true); setMultiplaEscolha(false); }}
                        />
                        Escolha Única

                        <input
                            type="checkbox"
                            checked={multiplaEscolha}
                            onChange={() => { setMultiplaEscolha(true); setEscolhaUnica(false); }}
                        />
                        Multipla Escolha
                    </label>
                </div>
                
            </form>
        
        </div>,

        <div key="step1"> 
            <form className="create-poll-form">
                <label>
                    Titulo da enquete:
                    <input
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                    />
                </label>

                <label>
                Opção 1
                    <input
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}></input>

                </label>


            </form>
        
        </div>
    ])

    

    const proximoStep = () => {
        setAtivarStep((prevAtivarStep) => prevAtivarStep + 1);
      };
    
      const anteriorStep = () => {
        setAtivarStep((prevAtivarStep) => prevAtivarStep - 1);
    };

    const adicionarStep = () => {
        const novoIndeceStep = arraySteps.length;
        const novoStep = <div key={'step${novoIndeceStep}'}></div>;
        setArraySteps([...arraySteps, novoStep])

    }   
 
    return (
        
        <div className="div-main">
            <BasePage username="Caio Bruno" title="Criar Enquete">
                <div className="center-content"> 
                    {/*</BasePage>*/}
                    <div style={{ backgroundColor: 'rgb(229, 242, 253)', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', padding: '3px', borderRadius: '8px',}}>
                        {arraySteps[ativarStep]}
                        <MobileStepper
                            variant="dots"
                            steps={arraySteps.length}
                            position="static"
                            activeStep={ativarStep}
                            sx={{maxWidth: 400, flexGrow: 1, marginTop: '20px'}}
                            nextButton={
                            <Button size="small" onClick={proximoStep} disabled={ativarStep === arraySteps.length -1}>
                                Próximo
                                {tema.direction === 'rtl' ? (
                                    <KeyboardArrowLeft />
                                ) : (
                                    <KeyboardArrowRight/>
                                )}
                            </Button>
                            }
                            backButton={
                                <Button size="small" onClick={anteriorStep} disabled={ativarStep === 0}>
                                {tema.direction === 'rtl' ? (
                                <KeyboardArrowRight />
                                ) : (
                                <KeyboardArrowLeft />
                                )}
                                Voltar
                                </Button>
                            }

                        />
                    </div>
                </div>
            </BasePage>
        </div>
        

            
           


        
        











       
    );
};

export default CreatePoll;