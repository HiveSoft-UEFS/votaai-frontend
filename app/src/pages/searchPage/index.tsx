import React, { useState, useEffect  } from 'react';
import './TelaPesquisa.css';
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import PollCard from "../../components/pollCard";
import { useNavigate } from 'react-router-dom';
import { getPollData, getPollSearch } from '../../services/pollServices';

const araujo = [
    {
        id: 1,
        title: "Melhor passarinho por país",
        description: "Escolha o melhor passarinho por país",
        creator: "EdmiasAraujo",
        tags:["passaro","ornitologia"],
        pollCreation: new Date('May 02, 2024 23:15:30'),
        pollClosing: new Date('July 03, 2024, 12:00:00'),
        category: "Ciência",
        question: [
            {
                title: "Brasil",
                option: [
                    {title: "pitiguari",image: "####"},
                    {title: "tucano",image: "####"},
                    {title: "canario",image: "####"},
                    {title: "arara azul",image:"####"}
                ]
            },
            {
                title: "Estados Unidos",
                option: [
                    {title: "garça cinzenta",image: "####"},
                    {title: "blue heron",image: "####"},
                    {title: "kestrel",image: "####"}
                ]
            },
            {
                title: "Colombia",
                "option": [
                    {title: "apuim",image: "####"},
                    {title: "anhuma",image: "####"},
                    {title: "andorinhao",image: "####"},
                    {title: "arredio-do-rio",image: "####"}
                ]
            },
        ]
    },
    {
        id: 2,
        title: "Passarinho com melhor canto",
        description: "Quero um passarinho para criar. Recomendem os melhores cantos",
        creator: "Neneu",
        tags:["criacao","passarinho"],
        pollCreation: new Date('April 19, 2024 12:11:24'),
        pollClosing: new Date('August 03, 2024, 12:00:00'),
        category: "Ciência",
        question: [
            {
                title: "Melhor canto",
                option: [
                    {title: "canario",image: "####"},
                    {title: "calopsita",image: "####"},
                    {title: "passaro-preto",image: "####"},
                    {title: "sabia",image: "####"}
                ]
            }
        ]
    },
    {
        id: 3,
        title: "Pior passarinho do mundo",
        description: "Escolha o pior passarinho",
        creator: "Godeias",
        tags:["criacao","passarinho"],
        pollCreation: new Date('February 11, 2024 05:15:04'),
        pollClosing: new Date('September 11, 2024, 12:00:00'),
        category: "Ciência",
        question: [
            {
                title: "Pior passaro",
                option: [
                    {title: "canario",image: "####"},
                    {title: "calopsita",image: "####"},
                    {title: "passaro-preto",image: "####"},
                    {title: "sabia",image: "####"}
                ]
            }
        ]
    },
    {
        id: 4,
        title: "Melhor gaiola para calopsita",
        description: "Escolha o pior passarinho",
        creator: "Josias Carmo",
        tags:["gaiola","passarinho"],
        pollCreation: new Date('May 02, 2024, 23:15:30'),
        pollClosing: new Date('July 22, 2024, 12:00:00'),
        category: "Outros",
        question: [
            {
                title: "Pior passaro",
                option: [
                    {title: "canario",image: "####"},
                    {title: "calopsita",image: "####"},
                    {title: "passaro-preto",image: "####"},
                    {title: "sabia",image: "####"}
                ]
            }
        ]
    },
    {
        id: 5,
        title: "Melhor caçador de pardal da região de Feira de Santana",
        description: "Escolha o pior passarinho",
        creator: "Lupa122",
        tags:["cacador","ave"],
        pollCreation: new Date('May 02, 2024 23:15:30'),
        pollClosing: new Date('July 02, 2024, 12:00:00'),
        category: "Outros",
        question: [
            {
                title: "Pior passaro",
                option: [
                    {title: "canario",image: "####"},
                    {title: "calopsita",image: "####"},
                    {title: "passaro-preto",image: "####"},
                    {title: "sabia",image: "####"}
                ]
            }
        ]
    },
    {
        id: 6,
        title: "Devo criar gato tendo uma criação de cardeais?",
        description: "Escolha o pior passarinho",
        creator: "Ganimedes",
        tags:["gato","duvida"],
        pollCreation: new Date('May 02, 2024 23:15:30'),
        pollClosing: new Date('June 30, 2024, 12:00:00'),
        category: "Outros",
        question: [
            {
                title: "Pior passaro",
                option: [
                    {title: "canario",image: "####"},
                    {title: "calopsita",image: "####"},
                    {title: "passaro-preto",image: "####"},
                    {title: "sabia",image: "####"}
                ]
            }
        ]
    },
    {
        id: 7,
        title: "Qual é o melhor pássaro de estimação?",
        description: "Escolha o melhor pássaro para ter como animal de estimação.",
        creator: "Ana Birdlover",
        tags: ["pets", "aves"],
        pollCreation: new Date('July 15, 2023 09:30:00'),
        pollClosing: new Date('September 30, 2024, 18:00:00'),
        category: "Outros",
        question: [
          {
            title: "Melhor pássaro",
            option: [
              { title: "Periquito", image: "####" },
              { title: "Cacatua", image: "####" },
              { title: "Papagaio", image: "####" },
              { title: "Canário", image: "####" }
            ]
          }
        ]
    },
    {
        id: 8,
        title: "Qual é a ave mais rara da Amazônia?",
        description: "Escolha a ave mais rara entre as espécies da Amazônia.",
        creator: "Ricardo Amazonicus",
        tags: ["aves", "biodiversidade"],
        pollCreation: new Date('August 02, 2021 14:00:00'),
        pollClosing: new Date('October 31, 2024, 23:59:59'),
        category: "Ciência",
        question: [
            {
            title: "Ave mais rara",
            option: [
                { title: "Arara vermelha", image: "####" },
                { title: "Uirapuru", image: "####" },
                { title: "Harpia", image: "####" },
                { title: "Mutum-do-norte", image: "####" }
            ]
            }
        ]
    },
    {
        id: 9,
        title: "Qual ave tem o voo mais alto?",
        description: "Escolha a ave conhecida pelo voo mais alto entre as espécies existentes.",
        creator: "Carlos Skysurfer",
        tags: ["aves", "altitude"],
        pollCreation: new Date('June 20, 2024 10:45:00'),
        pollClosing: new Date('November 15, 2024, 12:00:00'),
        category: "Ciência",
        question: [
            {
            title: "Voo mais alto",
            option: [
                { title: "Águia-real", image: "####" },
                { title: "Albatroz", image: "####" },
                { title: "Ganso-bar-headed", image: "####" },
                { title: "Condor-andino", image: "####" }
            ]
            }
        ]
    },
    {
        id: 10,
        title: "Qual é o pássaro mais rápido do mundo?",
        description: "Escolha o pássaro conhecido pela sua velocidade impressionante.",
        creator: "Fernanda Speedybird",
        tags: ["aves", "velocidade"],
        pollCreation: new Date('September 05, 2022 08:00:00'),
        pollClosing: new Date('December 10, 2024, 15:30:00'),
        category: "Curiosidades",
        question: [
            {
            title: "Pássaro mais rápido",
            option: [
                { title: "Falcão-peregrino", image: "####" },
                { title: "Andorinhão", image: "####" },
                { title: "Aguia-arpia", image: "####" },
                { title: "Gavião-real", image: "####" }
            ]
            }
        ]
    },
    {
        id: 11,
        title: "Qual é o pássaro símbolo da Austrália?",
        description: "Escolha o pássaro que representa a fauna da Austrália.",
        creator: "Mateus Downunder",
        tags: ["aves", "Austrália"],
        pollCreation: new Date('February 10, 2024 12:00:00'),
        pollClosing: new Date('January 15, 2025, 20:00:00'),
        category: "Cultura",
        question: [
            {
            title: "Pássaro símbolo",
            option: [
                { title: "Cacatua", image: "####" },
                { title: "Emu", image: "####" },
                { title: "Cisne-negro", image: "####" },
                { title: "Kookaburra", image: "####" }
            ]
            }
        ]
    },
    {
        id: 12,
        title: "Qual é o pássaro mais colorido da América do Sul?",
        description: "Escolha o pássaro conhecido pelas suas cores vibrantes na América do Sul.",
        creator: "Lorena Colorbird",
        tags: ["aves", "cores"],
        pollCreation: new Date('November 15, 2023 16:30:00'),
        pollClosing: new Date('February 28, 2025, 10:00:00'),
        category: "Curiosidades",
        question: [
            {
            title: "Pássaro colorido",
            option: [
                { title: "Arara-azul", image: "####" },
                { title: "Tucano", image: "####" },
                { title: "Pica-pau-amarelo", image: "####" },
                { title: "Sai-azul", image: "####" }
            ]
            }
        ]
    },
    {
        id: 13,
        title: "Qual é a ave mais inteligente do mundo?",
        description: "Escolha a ave conhecida pela sua inteligência excepcional.",
        creator: "Juliana Brainbird",
        tags: ["aves", "inteligência"],
        pollCreation: new Date('January 01, 2024 14:45:00'),
        pollClosing: new Date('March 31, 2025, 18:30:00'),
        category: "Ciência",
        question: [
            {
            title: "Ave mais inteligente",
            option: [
                { title: "Papagaio", image: "####" },
                { title: "Corvo", image: "####" },
                { title: "Pica-pau", image: "####" },
                { title: "Aguia", image: "####" }
            ]
            }
        ]
    },
    {
        id: 14,
        title: "Qual é a ave mais perigosa do mundo?",
        description: "Escolha a ave conhecida por ser perigosa para humanos.",
        creator: "Pedro Riskbird",
        tags: ["aves", "perigo"],
        pollCreation: new Date('January 10, 2023 11:00:00'),
        pollClosing: new Date('April 30, 2025, 16:00:00'),
        category: "Curiosidades",
        question: [
            {
            title: "Ave mais perigosa",
            option: [
                { title: "Águia-real", image: "####" },
                { title: "Coruja", image: "####" },
                { title: "Gavião", image: "####" },
                { title: "Avestruz", image: "####" }
            ]
            }
        ]
    },
    {
        id: 15,
        title: "Qual é a ave mais ameaçada de extinção no Brasil",
        description: "Escolha a ave que enfrenta maior risco de extinção no território brasileiro.",
        creator: "Fernanda Conservationist Conservationist",
        tags: ["aves"],
        pollCreation: new Date('February 15, 2023 09:00:00'),
        pollClosing: new Date('May 20, 2025, 14:30:00'),
        category: "Ciência",
        question: [
            {
            title: "Ave ameaçada de extinção",
            option: [
                { title: "Ararinha-azul", image: "####" },
                { title: "Gralha-azul", image: "####" },
                { title: "Sabiá-laranjeira", image: "####" },
                { title: "Tartaruga-amazônica", image: "####" }
            ]
            }
        ]
    },
]
const SearchPage = () => {
    const [activeButton, setActiveButton] = useState<string>('new');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [polls, setPolls] = useState<any[]>([]);
    const handleButtonClick = (index: string) => {setActiveButton(index);};
    const fetchData = (searchTerm: string) => {setSearchTerm(searchTerm);};
    useEffect(() => {
        const fetchPolls = async () => {
            try {
                let data = searchTerm;
                let polls=[];
                console.log(data,'\n\n')
                if (data.startsWith('#')) {
                    polls = await getPollSearch(data.substring(1), activeButton, '', true, false);
                } else if (data.startsWith('@')) {
                    polls = await getPollSearch(data.substring(1), activeButton, '', false, true);
                } else {
                    polls = await getPollSearch(data, activeButton, '', false, false);
                    console.log(polls)
                }
                setPolls(polls);
            } catch (error) {
                console.error('Erro ao obter dados da pesquisa:', error);
            }
        };

        fetchPolls();
    }, [searchTerm, activeButton]); 
    const navigate = useNavigate();
    return (
        <div className="container-searchPage"> 
            <Navbar onSearchSubmit={fetchData} />
            <div className="c-content-searchPage">
                <div className='subnavbar'>
                    <div className="opcoesFiltro">
                        <button className={`${activeButton === 'new' ? 'active button1' : 'button1'}`} onClick={() => handleButtonClick('new')}>Recentes</button>
                        <button className={`${activeButton === 'old' ? 'active button2' : 'button2'}`} onClick={() => handleButtonClick('old')}>Antigas</button>
                        <button className={`${activeButton === 'pop' ? 'active button3' : 'button3'}`} onClick={() => handleButtonClick('pop')}>Populares</button>
                    </div>
                </div>
                <div className="resultado">
                <div className="row row-eq-height row-cols-4 fileira">
                    {polls.map(poll => (
                        <div  className="col mb-4">
                            <div className='colunas'>
                                <PollCard
                                    title={poll.title}
                                    description={""}
                                    creator={poll.creator}
                                    category={poll.category}
                                    expiry={new Date(poll.finish_date)}
                                    tags={poll.tags.split('#').filter(Boolean)}
                                    style={{ maxHeight: '350px' }}
                                ></PollCard>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            </div>

            <Footer/>

        </div>
 
        
    );
}

export default SearchPage;

