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
    const [pages, setPages] = useState([{ id: 1, titulo: "", opcoes: [{ id: 1, valor: "" }, { id: 2, valor: "" }] }]);
    const [ativarStep, setAtivarStep] = useState(0);

    const tema = useTheme();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    const handleChangeOpcao = (pageId: number, opcaoId: number, valor: string) => {
        setPages(pages.map(page => 
            page.id === pageId ? { ...page, opcoes: page.opcoes.map(opcao => opcao.id === opcaoId ? { ...opcao, valor } : opcao) } : page
        ));
    };

    const adicionarOpcao = (pageId: number) => {
        setPages(pages.map(page => 
            page.id === pageId ? { ...page, opcoes: [...page.opcoes, { id: page.opcoes.length + 1, valor: "" }] } : page
        ));
    };

    const removerOpcao = (pageId: number) => {
        setPages(pages.map(page => 
            page.id === pageId ? { ...page, opcoes: page.opcoes.slice(0, -1) } : page
        ));
    };

    const adicionarPagina = () => {
        setPages([...pages, { id: pages.length + 1, titulo: "", opcoes: [{ id: 1, valor: "" }, { id: 2, valor: "" }] }]);
    };

    const removerPagina = () => {
        if (pages.length > 1) {
            const newPages = pages.slice(0, -1);
            setPages(newPages);
            setAtivarStep(prev => Math.min(prev, newPages.length));
        }
    };

    const handleTituloPaginaChange = (pageId: number, valor: string) => {
        setPages(pages.map(page => page.id === pageId ? { ...page, titulo: valor } : page));
    };

    const proximoStep = () => {
        setAtivarStep((prevAtivarStep) => Math.min(prevAtivarStep + 1, pages.length));
    };

    const anteriorStep = () => {
        setAtivarStep((prevAtivarStep) => Math.max(prevAtivarStep - 1, 0));
    };

    return (
        <div className="div-main">
            <BasePage username="Caio Bruno" title="Criar Enquete">
                <div className="center-content">
                    <div style={{ backgroundColor: 'rgb(229, 242, 253)', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', padding: '3px', borderRadius: '8px', }}>
                        {ativarStep === pages.length && (
                            <div className="adicionar-remover-pag">
                                <>
                                <Button size="small" onClick={adicionarPagina} style={{ marginTop: '20px' }}>
                                    Adicionar pergunta
                                </Button>
                                {pages.length > 1 && (
                                    <Button size="small" onClick={removerPagina} style={{ marginTop: '20px', marginLeft: '10px' }}>
                                        Remover pergunta
                                    </Button>
                                )}
                                </>
                            </div>
                        )}
                        
                        {ativarStep === 0 && (
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

                                    <div className="checkbox">
                                        <div className="checkbox-public-private">
                                            <label className="check-Publica-privada">
                                                <input
                                                    type="checkbox"
                                                    checked={ePublico}
                                                    onChange={() => { setEPublico(true); setEPrivado(false); }}
                                                />
                                                Enquete Pública
                                            </label>
                                            <label className="check-Publica-privada">
                                                <input
                                                    type="checkbox"
                                                    checked={ePrivado}
                                                    onChange={() => { setEPrivado(true); setEPublico(false); }}
                                                />
                                                Enquete Privada
                                            </label>
                                        </div>

                                        <div className="checkbox-only-multiple">
                                            <label className="check-unica-multipla">
                                                <input
                                                    type="checkbox"
                                                    checked={escolhaUnica}
                                                    onChange={() => { setEscolhaUnica(true); setMultiplaEscolha(false); }}
                                                />
                                                Escolha Única
                                            </label>
                                            <label className="check-unica-multipla">
                                                <input
                                                    type="checkbox"
                                                    checked={multiplaEscolha}
                                                    onChange={() => { setMultiplaEscolha(true); setEscolhaUnica(false); }}
                                                />
                                                Multipla Escolha
                                            </label>
                                        </div>
                                    </div>
                                    
                                </form>
                            </div>
                        )}

                        {pages.map((page, index) => (
                            ativarStep === (index + 1) && (
                                <div key={`step${index + 1}`}>
                                    <form className="create-poll-form">
                                        <label>
                                            Pergunta:
                                            <input
                                                type="text"
                                                value={page.titulo}
                                                onChange={(e) => handleTituloPaginaChange(page.id, e.target.value)}
                                            />
                                        </label>
                                        {page.opcoes.map(opcao => (
                                            <label key={opcao.id}>
                                                Opção {opcao.id}
                                                <input
                                                    type="text"
                                                    value={opcao.valor}
                                                    onChange={(e) => handleChangeOpcao(page.id, opcao.id, e.target.value)}
                                                />
                                            </label>
                                        ))}
                                    </form>
                                    <div className="buttom-add-remove-options">
                                        <button onClick={() => adicionarOpcao(page.id)}>+ opção</button>
                                        <button onClick={() => removerOpcao(page.id)}>- opção</button>
                                    </div>
                                </div>
                            )
                        ))}


                        <div className="button-carosel">
                            <MobileStepper
                                variant="dots"
                                steps={pages.length + 1}
                                position="static"
                                activeStep={ativarStep}
                                sx={{ maxWidth: 500, flexGrow: 1, marginTop: '10px', color: '#04345c'}}
                                nextButton={
                                    <Button size="small" onClick={proximoStep} disabled={ativarStep === pages.length}>
                                        Próximo
                                        {tema.direction === 'rtl' ? (
                                            <KeyboardArrowLeft />
                                        ) : (
                                            <KeyboardArrowRight />
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
                </div>
            </BasePage>
        </div>
    );
};

export default CreatePoll;


