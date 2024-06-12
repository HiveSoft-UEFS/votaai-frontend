import React, {useState, useEffect} from "react";
import Box from "@mui/material/Box";
import {IconButton} from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import Card from "./card"

function Carousel() {
    const [cards, setCards] = useState<React.ReactElement[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [slideDirection, setSlideDirection] = useState<
        "right" | "left" | undefined
    >("left");
    const cardsPerPage = 5;
    const duplicateCards: React.ReactElement[] = Array.from({length: 10}, (_,i) => <Card key={i}/>
    );
    const handleNextPage = () => {
        setSlideDirection("left");
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePrevPage = () => {
        setSlideDirection("right");
        setCurrentPage((prevPage) => prevPage - 1);
    }

    useEffect(() => {
        // define os cartões iniciais
        setCards(duplicateCards);
    }, []);

    // largura do container baseada na quantidade de cartões por página
    const containerWidth = cardsPerPage * 250; // 250px per card
    return (
        //  container externo que contém o carrossel e os botões
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                alignContent: "center",
                justifyContent: "center",
                height: "400px",
                width: "100%",
                marginTop: "40px",
            }}
        >
            <IconButton
                onClick={handlePrevPage}
                sx={{ margin: 5 }}
                disabled={currentPage === 0}
            >
                {/* botão para ir para a página anterior*/}
                <NavigateBeforeIcon />
            </IconButton>
            <Box sx={{ width: `${containerWidth}px`, height: "100%" }}>
                {/* container que contém os cartões e a animação de slide*/}
                {cards.map((card, index) => (
                    <Box
                        key={`card-${index}`}
                        sx={{
                            width: "100%",
                            height: "100%",
                            display: currentPage === index ? "block" : "none",
                        }}
                    >
                        {/* animação de slide para 'deslizar' os cartões*/}
                        <Slide direction={slideDirection} in={currentPage === index}>
                            <Stack
                                spacing={2}
                                direction="row"
                                alignContent="center"
                                justifyContent="center"
                                sx={{ width: "100%", height: "100%" }}
                            >
                                {/* exibir os cards na pagina atual*/}
                                {cards.slice(
                                    index * cardsPerPage,
                                    index * cardsPerPage + cardsPerPage
                                )}
                            </Stack>
                        </Slide>
                    </Box>
                ))}
            </Box>
            <IconButton
                onClick={handleNextPage}
                sx={{
                    margin: 5,
                }}
                disabled={
                    currentPage >= Math.ceil((cards.length || 0) / cardsPerPage) - 1
                }
            >
                <NavigateNextIcon />
            </IconButton>
        </Box>
    );
}
export default Carousel;

