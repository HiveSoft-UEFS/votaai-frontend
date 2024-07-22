import React, { useState, useEffect } from 'react';
import './TelaPesquisa.css';
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import PollCard from "../../components/pollCard";
import { useNavigate } from 'react-router-dom';
import { getPollSearch } from '../../services/pollServices';
import ModalVotacao from "../../components/pollModal/ModalVotacao"; // Importar o componente ModalVotacao

const SearchPage = () => {
    const [activeButton, setActiveButton] = useState<string>('pop');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [polls, setPolls] = useState<any[]>([]);
    const [highlightedPoll, setHighlightedPoll] = useState<number | null>(null);
    const [expandedPoll, setExpandedPoll] = useState<number | null>(null);
    const [modalAberto, setModalAberto] = useState(false); // Estado para controlar o modal
    const [pollOpen, setPoll] = useState<any>(null); // Estado para armazenar a enquete aberta

    const handleButtonClick = (index: string) => { setActiveButton(index); };
    const fetchData = (searchTerm: string) => { setSearchTerm(searchTerm); };

    useEffect(() => {
        const fetchPolls = async () => {
            try {
                let data = searchTerm;
                let polls = [];
                console.log(data, '\n\n');
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

    const goClose = () => {
        setModalAberto(false);
    };

    const handleOpenModal = async (pollId: number) => {
        await getPoll(pollId);
        setModalAberto(true);
    };

    const getPoll = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:8000/polls/${id}/`);
            if (!response.ok) {
                throw new Error('Sem net');
            }
            const data = await response.json();
            setPoll(data);
        } catch (error) {
            console.error("Error Fetching Modal De Votação", error);
        }
    };

    return (
        <div className="container-searchPage">
            <ModalVotacao openModal={modalAberto} goClose={goClose} poll={pollOpen}/>
            <Navbar onSearchSubmit={fetchData} />
            <div className="c-content-searchPage">
                <div className='subnavbar'>
                    <div className="opcoesFiltro">
                        <button className={`${activeButton === 'pop' ? 'active button1' : 'button1'}`} onClick={() => handleButtonClick('pop')}>Populares</button>
                        <button className={`${activeButton === 'new' ? 'active button2' : 'button2'}`} onClick={() => handleButtonClick('new')}>Recentes</button>
                        <button className={`${activeButton === 'old' ? 'active button3' : 'button3'}`} onClick={() => handleButtonClick('old')}>Antigas</button>
                    </div>
                </div>
                <div className="resultado">
                    <div className="row row-eq-height row-cols-4 fileira">
                        {polls.map(poll => (
                            <div
                                className={`col mb-4 ${highlightedPoll === poll.id ? 'highlighted' : ''} ${expandedPoll === poll.id ? 'expanded' : ''}`}
                                onMouseEnter={() => setHighlightedPoll(poll.id)}
                                onMouseLeave={() => setHighlightedPoll(null)}
                                onClick={() => handleOpenModal(poll.id)} // Chamar handleOpenModal ao clicar
                                key={poll.id}
                            >
                                <div className='colunas'>
                                    <PollCard
                                        title={poll.title}
                                        description={""}
                                        creator={poll.creator}
                                        category={poll.category}
                                        expiry={new Date(poll.finish_date)}
                                        tags={poll.tags.split('#').filter(Boolean)}
                                        style={{ maxHeight: expandedPoll === poll.id ? 'none' : '350px' }}
                                        handleopenModal={() => handleOpenModal(poll.id)} // Passar handleopenModal como propriedade
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default SearchPage;
