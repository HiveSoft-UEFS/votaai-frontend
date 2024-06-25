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

const Navbar: React.FC = () => {
    return (
        <div className='navbar'>
            <div className= 'icon'>
            <PersonIcon style={{ fontSize: '30px' }} /> 
            </div>
            <div className= 'circle'>
                <PanoramaFishEyeIcon style={{ fontSize: '50px' }} />  
            </div>
            <img src={logo_navbar} alt="" className='logo'/>
            <div className= 'search-box'>
                <input type="text" placeholder='Digite um código ou uma tag'/>
                <div className='search-icon'>
                    <SearchIcon />
                </div>

        
    
            </div>
            <CustomButton
                text="Votação"
                icon_component={<AddIcon />}
                bgcolor="#EBE5FC"
                text_color= "#295478"
                font_family="Arial, sans-serif"
                font_weight="bold"
                callback={() => console.log("")}
            />

            <CustomButton
                text="Histórico"
                icon_component={<VisibilityIcon />}
                bgcolor="#EBE5FC"
                text_color="#295478"
                font_family="Arial, sans-serif"
                font_weight="bold"
                callback={() => console.log("")}
            />
            <CustomButton
                text="Auditoria"
                icon_component={<TaskIcon />}
                bgcolor="#EBE5FC"
                text_color="#295478"
                font_family="Arial, sans-serif"
                font_weight="bold"
                callback={() => console.log("")}
            />
        </div>
    );
};

export default Navbar;
