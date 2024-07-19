import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { IconButton } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import PollCard from "../pollCard";
import { getPollSearch } from "../../services/pollServices.js";

interface CarouselProps {
    current_filter: [string, string, string];
}

interface Poll {
    title: string;
    description: string;
    creator: string;
    category: string;
    finish_date: string;
    tags: string;
}

function Carousel({ current_filter }: CarouselProps) {
    const [polls, setPolls] = useState<Poll[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [slideDirection, setSlideDirection] = useState<"right" | "left" | undefined>("left");
    const cardsPerPage = 5;

    const fetchPolls = async () => {
        try {
            const fetchedPolls = await getPollSearch('', '', current_filter[1], false, false);
            setPolls(fetchedPolls);
            console.log(fetchedPolls);
            console.log(polls)
        } catch (error) {
            console.error("Failed to fetch polls:", error);
        }
    };

    useEffect(() => {
        fetchPolls();
    }, [current_filter]);

    const handleNextPage = () => {
        setSlideDirection("left");
        setCurrentPage((prevPage) => (prevPage + 1) % Math.ceil(polls.length / cardsPerPage));
    };

    const handlePrevPage = () => {
        setSlideDirection("right");
        setCurrentPage((prevPage) =>
            prevPage === 0 ? Math.ceil(polls.length / cardsPerPage) - 1 : prevPage - 1
        );
    };

    const containerWidth = cardsPerPage * 250; // 250px per card

    return (
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
            <IconButton onClick={handlePrevPage} sx={{ margin: 5 }}>
                <NavigateBeforeIcon />
            </IconButton>
            <Box sx={{ width: `${containerWidth}px`, height: "100%" }}>
                {Array.from({ length: Math.ceil(polls.length / cardsPerPage) }, (_, index) => (
                    <Box
                        key={`card-${index}`}
                        sx={{
                            width: "100%",
                            height: "100%",
                            display: currentPage === index ? "block" : "none",
                        }}
                    >
                        <Slide direction={slideDirection} in={currentPage === index}>
                            <Stack
                                spacing={2}
                                direction="row"
                                alignContent="center"
                                justifyContent="center"
                                sx={{ width: "100%", height: "100%" }}
                            >
                                {polls.slice(
                                    index * cardsPerPage,
                                    index * cardsPerPage + cardsPerPage
                                ).map((poll, idx) => (
                                    <PollCard
                                        key={idx}
                                        title={poll.title}
                                        description=""
                                        creator={poll.creator}
                                        category={poll.category}
                                        expiry={new Date(poll.finish_date)}
                                        tags={poll.tags.split('#').filter(Boolean)}
                                        style={{ maxHeight: '350px' }}
                                    />
                                ))}
                            </Stack>
                        </Slide>
                    </Box>
                ))}
            </Box>
            <IconButton onClick={handleNextPage} sx={{ margin: 5 }}>
                <NavigateNextIcon />
            </IconButton>
        </Box>
    );
}

export default Carousel;
