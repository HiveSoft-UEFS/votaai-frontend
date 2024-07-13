import React from "react";
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


const HomePage = () => {
    const navigate = useNavigate();
    return (
        <div className="container-homePage"> 
            
            <Navbar/>

            <div className="c-content-homePage">

                <div className="c-title-homePage">
                    <h1>Participe de</h1>
                    <h1>Votações Públicas</h1>
                </div>

                <div className="c-carousel-homePage">
                    <Carousel/>
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



           {/*
            <div className="container-content-homePage">
                

                
                <Navbar />

                <div className="titles-homePage">
                    <h1 className="title-1">Participe de</h1>
                    <h1 className="title-2">Votações Públicas</h1>
                </div>

                <div className="carousel-homePage">
                    <Carousel/>
                </div>

                <div className="cards-homePage">
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
            
            
            <div className="container-footer-homePage">
                <Footer/>      
            </div>

            */}