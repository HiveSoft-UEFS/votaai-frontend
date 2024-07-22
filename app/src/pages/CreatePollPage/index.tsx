import React, { useState } from "react";
import BasePage from "../../components/basePage";
import "./CreatePoll.css";
import axios from 'axios';
import Notification from "../../components/notification/Notification";

import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

const DEFAULT_IMAGE_URL = "https://voxnews.com.br/wp-content/uploads/2017/04/unnamed.png";

const CreatePoll = () => {
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [dataLimite, setDataLimite] = useState(new Date());
    const [categoria, setCategoria] = useState("");
    const [visibilidade, setVisibilidade] = useState("Público");
    const [pages, setPages] = useState([{ id: 1, titulo: "", maxOpcoes: 1, opcoes: [{ id: 1, valor: "", img: "" }, { id: 2, valor: "", img: "" }] }]);
    const [ativarStep, setAtivarStep] = useState(0);
    const [mensagem, setMensagem] = useState("")

    const tema = useTheme();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    const handleChangeOpcao = (pageId: number, opcaoId: number, valor: string) => {
        setPages(pages.map(page => 
            page.id === pageId ? { ...page, opcoes: page.opcoes.map(opcao => opcao.id === opcaoId ? { ...opcao, valor } : opcao) } : page
        ));
    };

    const handleChangeOpcaoImg = (pageId: number, opcaoId: number, img: string) => {
        setPages(pages.map(page => 
            page.id === pageId ? { ...page, opcoes: page.opcoes.map(opcao => opcao.id === opcaoId ? { ...opcao, img } : opcao) } : page
        ));
    };

    const adicionarOpcao = (pageId: number) => {
        setPages(pages.map(page => 
            page.id === pageId ? { ...page, opcoes: [...page.opcoes, { id: page.opcoes.length + 1, valor: "", img: "" }] } : page
        ));
    };

    const removerOpcao = (pageId: number) => {
        setPages(pages.map(page => 
            page.id === pageId ? { ...page, opcoes: page.opcoes.slice(0, -1) } : page
        ));
    };

    const adicionarPagina = () => {
        setPages([...pages, { id: pages.length + 1, titulo: "", maxOpcoes: 1, opcoes: [{ id: 1, valor: "", img: "" }, { id: 2, valor: "", img: "" }] }]);
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

    const enviarEnquete = () => {
        let privacyValue;
        switch (visibilidade) {
            case 'Público':
                privacyValue = 'PUBLIC';
                break;
            case 'Oculto':
                privacyValue = 'HIDDEN';
                break;
            case 'Restrito':
                privacyValue = 'RESTRICTED';
                break;
            default:
                privacyValue = 'PUBLIC'; 
                break;
        }

        const data = {
            title: titulo,
            description: descricao,
            finish_date: dataLimite.toISOString().substring(0, 10),
            privacy: privacyValue,
            questions: pages.map(page => ({
                title: page.titulo,
                max_qtd_choices: page.maxOpcoes,
                options: page.opcoes.map(opcao => ({
                    text: opcao.valor,
                    img: opcao.img || DEFAULT_IMAGE_URL 
                }))
            })),
            criation_date: new Date().toISOString().substring(0, 10), 
            status: 'OPEN', 
            creator: 1,
            category: categoria
        };
    
        console.log("Dados da requisição: ", JSON.stringify(data, null, 2));
    
        axios.post('/api/polls/', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log('Enquete criada com sucesso:', response.data);
            setMensagem("Enquete criada com sucesso!");
            limparCampos();
        })
        .catch(error => {
            console.error('Erro ao criar enquete:', error.response ? error.response.data : error.message);
            setMensagem("Erro ao criar enquete.");
        });
    };
    
    const limparCampos = () => {
        setTitulo("");
        setDescricao("");
        setDataLimite(new Date());
        setCategoria("");
        setVisibilidade("Público");
        setPages([{ id: 1, titulo: "", maxOpcoes: 1, opcoes: [{ id: 1, valor: "", img: "" }, { id: 2, valor: "", img: "" }] }]);
        setAtivarStep(0);
    };
    

    const todosCamposPreenchidos = () => {
        if (!titulo || !descricao || !dataLimite || !categoria || !visibilidade) return false;
        for (let page of pages) {
            if (!page.titulo || !page.maxOpcoes) return false;
            for (let opcao of page.opcoes) {
                if (!opcao.valor) return false;
            }
        }
        return true;
    };

    return (
        <div className="div-main">
            <BasePage username="Caio Bruno" title="Criar Enquete">
                <Notification message={mensagem} />
                <div className="center-content">
                    <div style={{ backgroundColor: 'rgb(229, 242, 253)', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', padding: '3px', borderRadius: '8px' }}>
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
                                    <span className="red-asterisk">*</span>Titulo da enquete: 
                                        <input
                                            type="text"
                                            value={titulo}
                                            onChange={(e) => setTitulo(e.target.value)}
                                        />
                                        
                                    </label>
                                    <label>
                                    <span className="red-asterisk">*</span>Descrição da Enquete:
                                        <textarea
                                            value={descricao}
                                            onChange={(e) => setDescricao(e.target.value)}
                                        />
                                    </label>
                                    <label>
                                    <span className="red-asterisk">*</span>Data Limite
                                        <input
                                            type="datetime-local"
                                            value={dataLimite.toISOString().substring(0, 16)}
                                            onChange={(e) => setDataLimite(new Date(e.target.value))}
                                        />
                                    </label>
                                    <label>
                                    <span className="red-asterisk">*</span>Categoria:
                                        <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                                            <option value="">Selecione uma categoria</option>
                                            <option value="ENTERTAINMENT">Entretenimento</option>
                                            <option value="TECHNOLOGY">Tecnologia</option>
                                            <option value="SPORTS">Esportes</option>
                                            <option value="FOOD">Alimentação</option>
                                            <option value="TOURISM">Turismo</option>
                                            <option value="CULTURE">Cultura</option>
                                            <option value="ART">Artes</option>
                                            <option value="POLITICS">Política e Sociedade</option>
                                            <option value="SCIENCE">Ciência e Educação</option>
                                            <option value="FASHION">Moda e Beleza</option>
                                            <option value="CURIOSITIES">Curiosidades</option>
                                            <option value="RANDOM">Aleatorio</option>
                                        </select>
                                    </label>
                                    <label>
                                        Visibilidade:
                                        <select value={visibilidade} onChange={(e) => setVisibilidade(e.target.value)}>
                                            <option value="Público">Público</option>
                                            <option value="Restrito">Restrito</option>
                                            <option value="Oculto">Oculto</option>
                                        </select>
                                    </label>
                                </form>
                            </div>
                        )}
                        
                        {pages.map((page, index) => (
                            <div key={page.id} style={{ display: ativarStep === index + 1 ? 'block' : 'none' }}>
                                <form className="create-poll-form" onSubmit={handleSubmit}>
                                    <label>
                                    <span className="red-asterisk">*</span>Título da pergunta:
                                        <input
                                            type="text"
                                            value={page.titulo}
                                            onChange={(e) => handleTituloPaginaChange(page.id, e.target.value)}
                                        />
                                    </label>
                                    <label>
                                        Máximo de opções selecionáveis:
                                        <input
                                            type="number"
                                            value={page.maxOpcoes}
                                            min="1"
                                            onChange={(e) => handleMaxOpcoesChange(page.id, parseInt(e.target.value))}
                                        />
                                    </label>
                                    {page.opcoes.map(opcao => (
                                        <div key={opcao.id} className="input-div-opcoes">
                                            <label>
                                            <span className="red-asterisk">*</span>Opção {opcao.id}:
                                                <input
                                                    type="text"
                                                    value={opcao.valor}
                                                    onChange={(e) => handleChangeOpcao(page.id, opcao.id, e.target.value)}
                                                />
                                            </label>
                                            <label>
                                                URL da Imagem {opcao.id}:
                                                <input
                                                    type="text"
                                                    value={opcao.img}
                                                    onChange={(e) => handleChangeOpcaoImg(page.id, opcao.id, e.target.value)}
                                                />
                                            </label>
                                        </div>
                                    ))}
                                    <div className="buttom-add-remove-options" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                                        <div>
                                            <button type="button" className="adicionar" onClick={() => adicionarOpcao(page.id)}>+ opção</button>
                                            <button type="button" className="remover" onClick={() => removerOpcao(page.id)}>- opção</button>
                                        </div>
                                        {ativarStep === pages.length && (
                                            <Button
                                                variant="contained"
                                                className="postar"
                                                onClick={enviarEnquete}
                                                disabled={!todosCamposPreenchidos()}
                                                sx={{ bgcolor: !todosCamposPreenchidos() ? '#ccc' : '#05078b', color: 'white' }}
                                            >
                                                Postar
                                            </Button>
                                        )}
                                    </div>
                                </form>
                            </div>
                        ))}

                        <div className="button-carosel">
                            <MobileStepper
                                variant="dots"
                                steps={pages.length + 1}
                                position="static"
                                activeStep={ativarStep}
                                sx={{ maxWidth: 500, flexGrow: 1, marginTop: '10px', color: '#04345c' }}
                                nextButton={
                                    <Button size="small" onClick={proximoStep} disabled={ativarStep === pages.length}>
                                        Próximo
                                        {tema.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                                    </Button>
                                }
                                backButton={
                                    <Button size="small" onClick={anteriorStep} disabled={ativarStep === 0}>
                                        {tema.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
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
}

export default CreatePoll;