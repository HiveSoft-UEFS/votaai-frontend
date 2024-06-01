import React from 'react';
import './SideMenu.css'

interface SideMenuProps{
    userName: string,
    selectedMenuItem: string;
    onMenuItemClick: (menuItem: string) => void;
}

function SideMenu({ userName, selectedMenuItem, onMenuItemClick }:SideMenuProps){
    const options = ['HOME','PERFIL','CRIAR VOTAÇÃO','AUDITORIA', 'HISTÓRICO', 'SAIR']
    return(
        <section className='sideMenu'>
            <div className='profile'>
                <div className="profile-picture">
                    <span className="profile-initial">{userName.charAt(0)}</span>
                </div>
                <h4 className="profile-name">{userName}</h4>
                <hr className="divider" />
            </div>
            
            <div className='menu'>
                {options.map(option =>
                    <div className={`menu-item ${selectedMenuItem === option ? 'selected' : ''}`} onClick={() => onMenuItemClick(option)}>{option}</div>
                )}
            </div>
        </section>
    )
}

export default SideMenu;

