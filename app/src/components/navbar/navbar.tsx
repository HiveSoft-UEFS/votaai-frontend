import React from 'react';
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


const Navbar: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className='navbar-navbar'>

            <div className='icon-navbar'>
                <PersonIcon style={{fontSize: '30px'}}/>
            </div>
            <div className='circle-navbar' onClick={() => navigate('/perfil')}>
                <PanoramaFishEyeIcon style={{fontSize: '50px'}}/>
            </div>

            <img src={logo_navbar} alt="" className='logo-navbar'/>


            <div className='search-box-navbar'>
                <input type="text" placeholder='Digite um código ou uma tag'/>
                <div className='search-icon-navbar'>
                    <SearchIcon/>
                </div>
            </div>


            <div className='button_container1-navbar'>
                <CustomButton
                    text="Votação"
                    icon_component={<AddIcon/>}
                    bgcolor="#EBE5FC"
                    text_color="#295478"
                    font_family="Arial, sans-serif"
                    font_weight="bold"
                    callback={() => navigate('/votacao')}
                />
            </div>

            <div className='button_container2-navbar'>
                <CustomButton
                    text="Histórico"
                    icon_component={<VisibilityIcon/>}
                    bgcolor="#EBE5FC"
                    text_color="#295478"
                    font_family="Arial, sans-serif"
                    font_weight="bold"
                    callback={() => navigate('/historico')}
                />
            </div>

            <div className='button_container3-navbar'>
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
        </div>


    );
};

export default Navbar;
