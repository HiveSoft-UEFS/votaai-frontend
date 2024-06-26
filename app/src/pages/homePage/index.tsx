import React from "react";
import './homePage.css';
import backgroundHome from '../../assets/img/backgroundHome.svg';
import Navbar from "../../components/navbar/navbar";
import Carousel from "../../components/carousel";
import OptionCard from "../../components/optionCard";
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TaskIcon from '@mui/icons-material/Task';
import Footer from "../../components/footer";
import { useNavigate } from 'react-router-dom';


const HomePage = () => {
    const navigate = useNavigate();
    return (
        <div className="container">
            <div className="container-content">
                <img src={backgroundHome} alt="Imagem de Fundo da Página" />
                
                <Navbar />

                <div className="titles">
                    <h1 className="title-1">Participe de</h1>
                    <h1 className="title-2">Votações Públicas</h1>
                </div>

                <div className="carousel">
                    <Carousel/>
                </div>

                <div className="cards">
                    <OptionCard 
                        title="Compartilhe Pensamentos"
                        description="Seja parte de uma comunidade cada vez maior"
                        font_familyBtn="Arial, sans-serif"
                        font_weightBtn="bold"
                        text_colorBtn="#295478"
                        icon_componentBtn={<AddIcon/>}
                        bgcolorBtn="#EBE5FC"
                        textBtn="CRIAR VOTAÇÃO"
                        callback={() => navigate('#')}
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

            
            <div className="container-footer">
                <Footer/>      
            </div>
        </div>
    );
}

export default HomePage;