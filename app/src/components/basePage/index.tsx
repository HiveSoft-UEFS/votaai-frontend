import React, { useState } from "react";
import './basePage.css';
import SideMenu from "../sideMenu";

interface BasePageProps {
    username: string;
    title: string;
    children?: React.ReactNode;
}

const BasePage = ({username, title, children}: BasePageProps) => {
    const [selectedMenuItem, setSelectedMenuItem] = useState(title);
    const handleMenuItemClick = (menuItem: string) => {
        setSelectedMenuItem(menuItem);
    };

        return (
            <div className="container-base-page">
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
                    <div className="c-Img"></div>
                    <div className="page-content">
                        {children}
                    </div>
                </div>
            </div>
        );
};

export default BasePage;