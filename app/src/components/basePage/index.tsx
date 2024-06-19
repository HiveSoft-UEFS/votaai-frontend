import React, { useState } from "react";
import './basePage.css';
import SideMenu from "../sideMenu";

interface BasePageProps {
    username: string;
    title: string;
}

const BasePage = ({username, title}: BasePageProps) => {
    const [selectedMenuItem, setSelectedMenuItem] = useState(title);
    const handleMenuItemClick = (menuItem: string) => {
        setSelectedMenuItem(menuItem);
    };

        return (
            <div className="container">
                <div className="c-menu">
                    <SideMenu 
                        userName={username}
                        selectedMenuItem={selectedMenuItem}
                        onMenuItemClick={handleMenuItemClick}  
                    />
                </div>
                <div className="c-content">
                    <div className="c-title">
                        <div className="line"></div>
                        <div className="title-space">
                            <h1> { selectedMenuItem } </h1>
                        </div>
                        <div className="line"></div>
                    </div>
                </div>
            </div>
        );
};

export default BasePage;