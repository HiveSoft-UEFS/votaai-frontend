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




const HomePage = () => {

    const categories_filter: [string, string, string][] = [
        ["TODOS", "all", "#000000"],      // Black
        ["TECNOLOGIA", "technology", "#FF4500"], // OrangeRed
        ["ENTRETENIMENTO", "entertainment", "#1E90FF"], // DodgerBlue
        ["ESPORTES", "sports", "#32CD32"],    // LimeGreen
        ["COMIDA", "food", "#8A2BE2"],        // BlueViolet
        ["TURISMO", "tourism", "#FF6347"],    // Tomato
        ["CULTURA", "culture", "#FFD700"],    // Gold
        ["ARTE", "art", "#FF8C00"],           // DarkOrange
        ["POLÍTICA", "politics", "#00CED1"],  // DarkTurquoise
        ["CIÊNCIA", "science", "#8B0000"],    // DarkRed
        ["MODA", "fashion", "#FF69B4"],       // HotPink
        ["CURIOSIDADES", "curiosities", "#4B0082"], // Indigo
    ];

    const [currentFilter, setCurrentFilter] = useState(categories_filter[0]);
    
    const handleFilterChange = (newFilter: [string, string, string]) => {
        setCurrentFilter(newFilter);
    };

    const navigate = useNavigate();
    const fetchData = async (searchTerm: string) => {
    };
    return (
        <div className="container-homePage"> 
            
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
                        />
                    </div>
                    <Carousel current_filter={currentFilter} />
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
