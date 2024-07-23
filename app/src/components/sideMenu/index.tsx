import React, { useEffect } from 'react';
import './SideMenu.css';
import { useNavigate, useLocation } from 'react-router-dom';

interface SideMenuProps {
    userName: string,
    selectedMenuItem: string;
    onMenuItemClick: (menuItem: string) => void;
}

function SideMenu({ userName, selectedMenuItem, onMenuItemClick }: SideMenuProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const options = ['HOME', 'PERFIL', 'CRIAR ENQUETE', 'AUDITORIA', 'HISTORICO', 'SAIR'];

    useEffect(() => {
        const currentPath = location.pathname.substring(1).replace('-', ' ').toUpperCase();
          if (options.includes(currentPath) && currentPath !== selectedMenuItem) {
            onMenuItemClick(currentPath);
        }
    }, [location.pathname, selectedMenuItem, onMenuItemClick]);

    return (
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
                    <div className={`menu-item ${selectedMenuItem === option ? 'selected' : ''}`} key={option} onClick={() => {
                        navigate(`/${option.toLowerCase().replace(' ', '-')}`);
                        onMenuItemClick(option);
                    }}>{option}</div>
                )}
            </div>
        </section>
    );
}

export default SideMenu;
