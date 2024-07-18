import React, { useState } from 'react';
import './navbar.css';
import logo_navbar from '../../assets/img/votaaiLogo.png'
import PersonIcon from '@mui/icons-material/Person';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import SearchIcon from '@mui/icons-material/Search';
import CustomButton from '../customButton/index';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TaskIcon from '@mui/icons-material/Task';
import {useNavigate} from 'react-router-dom';
import Logo_1 from "../../assets/img/logo_1.svg";
import Logo_2 from "../../assets/img/logo_2.svg";
import ProfileImg from  "../../assets/img/ProfileIcon.svg";
import { Link } from 'react-router-dom';

interface NavbarProps {
    onSearchSubmit: (searchTerm: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearchSubmit }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSearchSubmit(searchTerm.trim()); // Envia o termo de pesquisa para o componente pai
    };

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const handleMenuItemClick = (route: string) => {
        navigate(route);
        setShowMenu(false); // Fecha o menu ao clicar em um item
    };

    return (
        <div className='navbar-navbar'>

            <div className='c-logo-navbar'>
                <img src={Logo_1} alt="" />
                <img src={Logo_2} alt="" />
            </div>

            <form onSubmit={handleSearchSubmit} className='c-search-navbar'>
                <input 
                    type="text" 
                    placeholder='Digite um código ou uma tag'
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <div className='search-icon-navbar'>
                    <Link to="/search"><SearchIcon/></Link>
                </div>
            </form>

            <div className='c-buttons-navbar'>
                <CustomButton
                    callback={() => navigate('/criar-enquete')}
                    text="Votação"
                    icon_component={<AddIcon/>}
                    bgcolor="#EBE5FC"
                    text_color="#295478"
                    font_family="Arial, sans-serif"
                    font_weight="bold"                    
                />
                <CustomButton
                    text="Histórico"
                    icon_component={<VisibilityIcon/>}
                    bgcolor="#EBE5FC"
                    text_color="#295478"
                    font_family="Arial, sans-serif"
                    font_weight="bold"
                    callback={() => navigate('/historico')}
                />
                <CustomButton
                    text="Auditoria"
                    icon_component={<TaskIcon/>}
                    bgcolor="#EBE5FC"
                    text_color="#295478"
                    font_family="Arial, sans-serif"
                    font_weight="bold"
                    callback={() => navigate('/auditoria')}
                />
            </div>
            
            <div className='c-iconProfile-navbar' onClick={toggleMenu}>
                <img src={ProfileImg} alt="Profile" />
              {/*showMenu && (
                    <ul className='menu'>
                        <li onClick={() => handleMenuItemClick('/home')}>Início</li>
                        <li onClick={() => handleMenuItemClick('/auditoria')}>Auditoria</li>
                        <li onClick={() => handleMenuItemClick('/sobre')}>Sobre</li>
                        <li onClick={() => handleMenuItemClick('/')}>Sair</li>
                    </ul>
                )*/}
            </div>
        </div>
    );
};

export default Navbar;
