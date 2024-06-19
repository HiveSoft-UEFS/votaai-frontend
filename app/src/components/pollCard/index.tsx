import React from "react";
import "./pollCard.css";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";

interface PollCardProps {
    title: string;
    description: string;
    creator: string;
    category: string;
    expiry: Date;
    tags: string[];
}

export default function PollCard({title, description, creator, category, expiry, tags}: PollCardProps){

    const category_colors: { [key: string]: string } = {
        "Entretenimento": "#FFD700",
        "Ciência": "#FF6347",
        "Ficção": "#4169E1",
        "Cinema": "#c00a41",
        "Música": "#FF69B4",
        "Esportes": "#32CD32",
        "Tecnologia": "#00BFFF",
        "Política": "#FF1493",
        "Educação": "#FF8C00",
        "Outros": "#808080"
    };

    const get_category_color = (category: string): string => {
        return category_colors[category] || "#000000";
    }

    const get_expiration_date = (date: Date): string => {
        const now = new Date();
        const diff = date.getTime() - now.getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        return `${days}d ${hours}h ${minutes}min`;
    }

    return (
        <Card className="poll-card">
            <CardContent>
                <div className="poll-card-header">
                    <span className="poll-card-expiry">
                        Expira em: {get_expiration_date(expiry)}
                    </span>
                </div>
                <h2 className="poll-card-title">
                    {title}
                </h2>
                <hr className="poll-card-divider" style={{backgroundColor: get_category_color(category)}}/>
                <Typography variant="body2" component="p" className="poll-card-description">
                    {description}
                </Typography>
                <Typography variant="body2" component="p" className="poll-card-creator">
                    Criado por: {creator}
                </Typography>
                <div className="poll-card-tags">
                    {tags.map((tag) => (
                        <span className="poll-card-tag">#{tag}</span>
                    ))}
                </div>
            </CardContent>
        </Card>
);
}
