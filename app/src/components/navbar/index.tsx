import React, { useState } from 'react';
import './navbar.css';
import logo_navbar from '../../assets/img/votaaiLogo.png';
import PersonIcon from '@mui/icons-material/Person';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import SearchIcon from '@mui/icons-material/Search';
import CustomButton from '../customButton/index';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TaskIcon from '@mui/icons-material/Task';
import { useNavigate } from 'react-router-dom';
import Logo_1 from "../../assets/img/logo_1.svg";
import Logo_2 from "../../assets/img/logo_2.svg";
import ProfileImg from "../../assets/img/ProfileIcon.svg";
import { Link } from 'react-router-dom';

interface NavbarProps {
    onSearchSubmit: (searchTerm: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearchSubmit }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showMenu, setShowMenu] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false); // Estado para o menu do perfil
    const navigate = useNavigate();

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSearchSubmit(searchTerm.trim());
    };

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const handleMenuItemClick = (route: string) => {
        navigate(route);
        setShowMenu(false);
    };

    const toggleProfileMenu = () => {
        setShowProfileMenu(!showProfileMenu);
    };

    const handleProfileMenuClick = (route: string) => {
        navigate(route);
        setShowProfileMenu(false);
    };

    return (
        <div className='navbar-navbar'>
            <div className='c-logo-navbar'>
                <img src={Logo_1} alt="Logo 1" />
                <img src={Logo_2} alt="Logo 2" />
            </div>

            <form onSubmit={handleSearchSubmit} className='c-search-navbar'>
                <input 
                    type="text" 
                    placeholder='Digite um código ou uma tag'
                    value={searchTerm}
                    onChange={handleSearchChange}
                    aria-label="Search"
                />
                <div className='search-icon-navbar'>
                    <Link to="/search"><SearchIcon aria-label="Search Icon" /></Link>
                </div>
            </form>

            <div className='c-buttons-navbar'>
                <CustomButton
                    callback={() => navigate('/criar-enquete')}
                    text="Votação"
                    icon_component={<AddIcon />}
                    bgcolor="#EBE5FC"
                    text_color="#295478"
                    font_family="Arial, sans-serif"
                    font_weight="bold"
                />
                <CustomButton
                    text="Histórico"
                    icon_component={<VisibilityIcon />}
                    bgcolor="#EBE5FC"
                    text_color="#295478"
                    font_family="Arial, sans-serif"
                    font_weight="bold"
                    callback={() => navigate('/historico')}
                />
                <CustomButton
                    text="Auditoria"
                    icon_component={<TaskIcon />}
                    bgcolor="#EBE5FC"
                    text_color="#295478"
                    font_family="Arial, sans-serif"
                    font_weight="bold"
                    callback={() => navigate('/auditoria')}
                />
            </div>

            <div className='c-iconProfile-navbar' onClick={toggleProfileMenu}>
                <img src={ProfileImg} alt="Profile" />
                {showProfileMenu && (
                    <div className='profile-menu'>
                        <div onClick={() => handleProfileMenuClick('/home')}>Inicio</div>
                        <div onClick={() => handleProfileMenuClick('/perfil')}>Perfil</div>
                        <div onClick={() => handleProfileMenuClick('/sobre')}>Sobre</div>
                        <div onClick={() => handleProfileMenuClick('/')}>Sair</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
