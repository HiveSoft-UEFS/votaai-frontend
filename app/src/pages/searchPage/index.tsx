import React, { useState } from 'react';
import PollCard from "../../components/pollCard";
import "./TelaPesquisa.css";
import background from './background2.svg';
import NavBar from "../../components/navbar";
import Footer from "../../components/footer";
import 'bootstrap/dist/css/bootstrap.min.css';

const poll = [
    {
        id: 1,
        title: "Melhor passarinho por país",
        description: "Escolha o melhor passarinho por país",
        creator: "EdmiasAraujo",
        tags: ["passaro", "ornitologia"],
        pollCreation: new Date('May 02, 2024 23:15:30'),
        pollClosing: new Date('July 03, 2024, 12:00:00'),
        category: "Ciência",
        question: [
            {
                title: "Brasil",
                option: [
                    { title: "pitiguari", image: "####" },
                    { title: "tucano", image: "####" },
                    { title: "canario", image: "####" },
                    { title: "arara azul", image: "####" }
                ]
            },
            {
                title: "Estados Unidos",
                option: [
                    { title: "garça cinzenta", image: "####" },
                    { title: "blue heron", image: "####" },
                    { title: "kestrel", image: "####" }
                ]
            },
            {
                title: "Colombia",
                option: [
                    { title: "apuim", image: "####" },
                    { title: "anhuma", image: "####" },
                    { title: "andorinhao", image: "####" },
                    { title: "arredio-do-rio", image: "####" }
                ]
            },
        ]
    },
    // Outros objetos de enquete omitidos para brevidade
];

function TelaPesquisa() {
    const [activeButton, setActiveButton] = useState<number | null>(1);
    const [sortedPolls, setSortedPolls] = useState(poll);
    const handleButtonClick = (index: number) => {
        setActiveButton(index);
        if (index === 3) {
            setSortedPolls([...poll].sort((a, b) => b.pollCreation.getTime() - a.pollCreation.getTime()));
        } else {
            setSortedPolls(poll);
        }
    };

    function PollCardWithHeight(props: {
        title: string;
        description: string;
        creator: string;
        category: string;
        expiry: Date;
        tags: string[];
        height: string;
    }) {
        const { title, description, creator, category, expiry, tags, height } = props;

        return (
            <div style={{ height: height }}>
                <PollCard
                    title={title}
                    description={description}
                    creator={creator}
                    category={category}
                    expiry={expiry}
                    tags={tags}
                />
            </div>
        );
    }

    return (
        <>
            <div className="main">
                {/*<img src={background} alt="Imagem de Fundo da Página" />*/}
                {/*<div className='navbar'>*/}
                    <NavBar />
                {/*</div>*/}
                
                <div className='subnavbar'>
                    <div className="opcoesFiltro">
                        <button className={`${activeButton === 1 ? 'active button1' : 'button1'}`} onClick={() => handleButtonClick(1)}>Tudo</button>
                        <button className={`${activeButton === 2 ? 'active button2' : 'button2'}`} onClick={() => handleButtonClick(2)}>Populares</button>
                        <button className={`${activeButton === 3 ? 'active button3' : 'button3'}`} onClick={() => handleButtonClick(3)}>Recentes</button>
                    </div>
                </div>
                <div className="resultado">
                    <div className="row row-cols-1 fileira">
                        {sortedPolls.map(poll => (
                            <div key={poll.id} className="col mb-4" style={{ width: '297.14px', maxHeight: '338px', justifyContent: 'end', alignItems: 'end', padding: '0%', display: 'table' }}>
                                <PollCard
                                    title={poll.title}
                                    description=""
                                    creator={poll.creator}
                                    category={poll.category}
                                    expiry={poll.pollClosing}
                                    tags={poll.tags}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="row row-eq-height row-cols-4 fileira">
                        {sortedPolls.map(poll => (
                            <div key={poll.id} className="col mb-4">
                                <div className='colunas'>
                                    <PollCardWithHeight
                                        title={poll.title}
                                        description=""
                                        creator={poll.creator}
                                        category={poll.category}
                                        expiry={poll.pollClosing}
                                        tags={poll.tags}
                                        height="247px"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="footer">
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default TelaPesquisa;
