import React, { useState } from "react";
import './homePage.css';
import backgroundHome from '../../assets/img/backgroundHome2.svg';
import Navbar from "../../components/navbar";
import Carousel from "../../components/carousel";
import OptionCard from "../../components/optionCard";
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TaskIcon from '@mui/icons-material/Task';
import Footer from "../../components/footer";
import { useNavigate } from 'react-router-dom';
import Filter from "../../components/filter";
import ModalVotacao from "../../components/pollModal/ModalVotacao";




const HomePage = () => {

    const categories_filter: [string, string, string][] = [
        ["TODOS", "all", "#000000"],      // Black
        ["TECNOLOGIA", "technology", "#0432ff"], // OrangeRed
        ["ENTRETENIMENTO", "entertainment", "#b20dff"], // DodgerBlue
        ["ESPORTES", "sports", "#258b0c"],    // LimeGreen
        ["COMIDA", "food", "#d8910d"],        // BlueViolet
        ["TURISMO", "tourism", "#49c24f"],    // Tomato
        ["CULTURA", "culture", "#3e8a97"],    // Gold
        ["ARTE", "art", "#ff1b1b"],           // DarkOrange
        ["POLÍTICA", "politics", "#2f0283"],  // DarkTurquoise
        ["CIÊNCIA", "science", "#03dfaf"],    // DarkRed
        ["MODA", "fashion", "#fc92e1"],       // HotPink
        ["CURIOSIDADES", "curiosities", "#610359"], // Indigo
    ];

    const [currentFilter, setCurrentFilter] = useState(categories_filter[0]);
    
    const handleFilterChange = (newFilter: [string, string, string]) => {
        setCurrentFilter(newFilter);
    };

    const navigate = useNavigate();
    const fetchData = async (searchTerm: string) => {
    };

    const goClose =() => {
        setModalAberto(false);
    };

    const[pollOpen, setPoll] = useState(null);

    const [modalAberto, setModalAberto] = useState(false);

    const handleOpenModal = (pollId:number) => {
        getPoll(pollId);
        setModalAberto(true); //verificar se o usuario não estiver participado, verificar pelo id do user.
    };

    const getPoll = (id:number) => {
        fetch(`http://localhost:8000/polls/${id}/`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Sem net');
            }
            return response.json();
        })
        .then(data => {
            setPoll(data);
        })
        .catch(error => {
            console.error("Error Fetching Modal De Votação", error);
        });
    };


    return (
        <div className="container-homePage"> 
           <ModalVotacao openModal={modalAberto} goClose={goClose} poll={pollOpen}/>
            <Navbar onSearchSubmit={fetchData} />
            

            <div className="c-content-homePage">

                <div className="c-title-homePage">
                    <h1>Participe de</h1>
                    <h1>Votações Públicas</h1>
                </div>

                <div className="c-carousel-homePage">
                    <div className="c-filter-homePage">
                        <Filter 
                            categories={categories_filter} 
                            current_filter={currentFilter} 
                            onFilterChange={handleFilterChange} 
                            isVertical={false}
                        />
                    </div>
                    <Carousel current_filter={currentFilter} 
                    handleopenModal={(pollId)=>handleOpenModal(pollId)}
                    /> 
                </div>

                <div className="c-cards-homePage">
                    <OptionCard
                            callback={() => navigate('/criar-enquete')}
                            title="Compartilhe Pensamentos"
                            description="Seja parte de uma comunidade cada vez maior"
                            font_familyBtn="Arial, sans-serif"
                            font_weightBtn="bold"
                            text_colorBtn="#295478"
                            icon_componentBtn={<AddIcon/>}
                            bgcolorBtn="#EBE5FC"
                            textBtn="CRIAR VOTAÇÃO"                            
                        />
                        <OptionCard 
                            title="Visualize cada Mudança"
                            description="Você sempre pode acompanhar suas votações"
                            font_familyBtn="Arial, sans-serif"
                            font_weightBtn="bold"
                            text_colorBtn="#295478"
                            icon_componentBtn={<VisibilityIcon/>}
                            bgcolorBtn="#EBE5FC"
                            textBtn="VER HISTÓRICO"
                            callback={() => navigate('/historico')}
                        />     
                        <OptionCard 
                            title="Vote com Segurança"
                            description="Nosso sistema disponibiliza um meio confiável de auditoria"
                            font_familyBtn="Arial, sans-serif"
                            font_weightBtn="bold"
                            text_colorBtn="#295478"
                            icon_componentBtn={<TaskIcon/>}
                            bgcolorBtn="#EBE5FC"
                            textBtn="AUDITAR VOTO"
                            callback={() => navigate('/auditoria')}
                        />
                </div>

            </div>

            <Footer/>

        </div>
 
        
    );
}

export default HomePage;
