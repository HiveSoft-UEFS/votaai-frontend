import * as React from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import './InfoCard.css';


interface InfoCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;

}

const InfoCard: React.FC<InfoCardProps> = ({ title, description, icon}) => {
    const svgBackground = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 125 120" width="55" height="50">
      <circle cx="57" cy="60" r="55" fill="#D9D9D9" />
    </svg>
  `;
    return (
        <Card className="customCard" >
            <CardContent>
                <div className="iconContainer">
                    <div dangerouslySetInnerHTML={{ __html: svgBackground }} className="background" />
                    <div className="icon">{icon}</div>
                </div>
                <Typography variant="h5" component="div" className="title">{title}</Typography>
                <Typography variant="body2" className="description">{description}</Typography>
            </CardContent>
        </Card>
    );
};

export default InfoCard;
