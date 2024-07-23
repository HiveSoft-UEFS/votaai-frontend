import React, { useState, useEffect } from "react";
import './basePage.css';
import SideMenu from "../sideMenu";
import { getUserData } from "../../services/userServices"

interface BasePageProps {
    username: string;
    title: string;
    children?: React.ReactNode;
}

const BasePage = ({title, children}: BasePageProps) => {
    const [selectedMenuItem, setSelectedMenuItem] = useState(title);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await getUserData();
                setUsername(data.username);  
            } catch (error) {
                console.error('Failed to fetch user data', error);
            }
        };

        fetchUserData();
    }, []);


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
                        <div className="title-space">
                            <h1> { selectedMenuItem } </h1>
                        </div>

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