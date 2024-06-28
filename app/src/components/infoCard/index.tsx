import * as React from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import './InfoCard.css';



interface InfoCardProps {
    title: string;
    description: string;
    icon: string;

}

const InfoCard: React.FC<InfoCardProps> = ({ title, description, icon}) => {
    return (
        <div className="infoContent">
            <img src={icon} alt=""/>
            <h2 className="InfoTitle">{title}</h2>
            <p>
                {description} </p>
        </div>
    );
};

export default InfoCard;
