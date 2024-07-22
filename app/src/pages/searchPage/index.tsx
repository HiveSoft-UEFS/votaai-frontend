import React, { useState, useEffect } from 'react';
import './TelaPesquisa.css';
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import PollCard from "../../components/pollCard";
import { useNavigate } from 'react-router-dom';
import { getPollSearch } from '../../services/pollServices';

const SearchPage = () => {
    const [activeButton, setActiveButton] = useState<string>('pop');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [polls, setPolls] = useState<any[]>([]);
    const [highlightedPoll, setHighlightedPoll] = useState<number | null>(null);
    const [expandedPoll, setExpandedPoll] = useState<number | null>(null);

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

    const handleOpenModal = () => {
        // Lógica para abrir o modal
    };

    return (
        <div className="container-searchPage">
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
                                onClick={() => setExpandedPoll(expandedPoll === poll.id ? null : poll.id)}
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
                                        handleopenModal={handleOpenModal} // Propriedade adicionada
                                    ></PollCard>
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
