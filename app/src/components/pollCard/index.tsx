import React, { useState } from "react";
import "./pollCard.css";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

interface PollCardProps {
    title: string;
    description: string;
    creator: string;
    category: string;
    expiry: Date;
    tags: string[];
    style?: React.CSSProperties;
    handleopenModal: () => void; // Propriedade requerida
}

const PollCard: React.FC<PollCardProps> = ({ title, description, creator, category, expiry, tags, style, handleopenModal }) => {
    const [isHovered, setIsHovered] = useState(false);

    const category_colors: { [key: string]: string } = {
        "entertainment": "#b20dff",
        "science": "#03dfaf",
        "fashion": "#fc92e1",
        "art": "#ff1b1b",
        "politics": "#2f0283",
        "sports": "#258b0c",
        "technology": "#0432ff",
        "culture": "#3e8a97",
        "tourism": "#49c24f",
        "food": "#d8910d",
        "curiosities": "#610359",
        "random": "#808080"
    };

    const get_category_color = (category: string): string => {
        return category_colors[category] || "#000000";
    }

    const get_expiration_date = (date: Date): string => {
        const now = new Date();
        const diff = date.getTime() - now.getTime();
        
        if (diff <= 0) return "Expirado";
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        return `${days}d ${hours}h ${minutes}min`;
    }

    const handleCardClick = () => {
        try {
            handleopenModal();
        } catch (error) {
            console.error("Error in handleopenModal:", error);
        }
    };

    return (
        <>
            <Card
                className={`poll-card ${isHovered ? 'poll-card-hovered' : ''}`}
                style={style}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleCardClick}
            >
                <CardContent>
                    <div className="poll-card-header">
                        <span className="poll-card-expiry">
                            Expira em: {get_expiration_date(expiry)}
                        </span>
                    </div>
                    <h2 className="poll-card-title">
                        {title}
                    </h2>
                    <hr className="poll-card-divider" style={{ opacity: 0.7, backgroundColor: get_category_color(category) }} />
                    <Typography variant="body2" component="p" className="poll-card-description">
                        {description}
                    </Typography>
                    <Typography variant="body2" component="p" className="poll-card-creator">
                        Criado por: {creator}
                    </Typography>
                    <div className="poll-card-tags">
                        {tags.map((tag, index) => (
                            <span key={index} className="poll-card-tag">#{tag}</span>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </>
    );
};

export default PollCard;
