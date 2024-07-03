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
    const [categoria, setCategoria] = useState("");
    const [visibilidade, setVisibilidade] = useState("Público");
    const [pages, setPages] = useState([{ id: 1, titulo: "", maxOpcoes: 1, opcoes: [{ id: 1, valor: "" }, { id: 2, valor: "" }] }]);
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
        setPages([...pages, { id: pages.length + 1, titulo: "", maxOpcoes: 1, opcoes: [{ id: 1, valor: "" }, { id: 2, valor: "" }] }]);
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

    const handleMaxOpcoesChange = (pageId: number, valor: number) => {
        setPages(pages.map(page => page.id === pageId ? { ...page, maxOpcoes: valor } : page));
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
                                    <label>
                                        Categoria:
                                        <select
                                            value={categoria}
                                            onChange={(e) => setCategoria(e.target.value)}
                                        >
                                            <option value="">Selecione uma categoria</option>
                                            <option value="Entretenimento">Entretenimento</option>
                                            <option value="Tecnologia">Tecnologia</option>
                                            <option value="Esportes">Esportes</option>
                                            <option value="Alimentação">Alimentação</option>
                                            <option value="Viagens">Viagens</option>
                                            <option value="Cultura e Arte">Cultura e Arte</option>
                                            <option value="Política e Sociedade">Política e Sociedade</option>
                                            <option value="Ciência e Educação">Ciência e Educação</option>
                                            <option value="Moda e Beleza">Moda e Beleza</option>
                                            <option value="Outros">Outros</option>
                                        </select>
                                    </label>
                                    <label>
                                        Visibilidade:
                                        <select
                                            value={visibilidade}
                                            onChange={(e) => setVisibilidade(e.target.value)}
                                        >
                                            <option value="Público">Público</option>
                                            <option value="Restrito">Restrito</option>
                                            <option value="Oculto">Oculto</option>
                                        </select>
                                    </label>
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
                                        <label>
                                            Número máximo de opções que o usuário pode escolher:
                                            <input
                                                type="number"
                                                value={page.maxOpcoes}
                                                onChange={(e) => handleMaxOpcoesChange(page.id, parseInt(e.target.value))}
                                                min="1"
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
