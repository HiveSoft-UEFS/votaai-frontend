import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import "@fontsource/inter/600.css"; 
import { Card, CardContent, Typography, ThemeProvider, Box, Grid } from '@mui/material';
import './optionCard.css';
import CustomButton  from '../customButton';

interface OptionCardProps {
    title: string;
    description: string;
    textBtn: string;
    icon_componentBtn: React.ReactElement;
    bgcolorBtn: string;
    text_colorBtn: string;
    font_familyBtn: string;
    font_weightBtn?: string;
    callback: () => void;
}

export default function OptionCard({ title, description, textBtn, icon_componentBtn, bgcolorBtn, text_colorBtn, font_familyBtn, font_weightBtn, callback}:OptionCardProps) {
    const textTheme = createTheme({
        typography: {
          fontFamily: ['Inter'].join(','),
          allVariants: {color:"white"}
        },
    });
    return (
        <Card className="OptionCard" sx={{borderRadius:3,backgroundColor: "#04345C",display:'flex'}}>
            <CardContent className="OptionCardBody">
                <ThemeProvider theme={textTheme}>
                    <Typography fontSize={26} component="div" className="OptionCardTitle">{title}</Typography>
                    <Typography fontSize={20} className="OptionCardDescription">{description}</Typography>
                </ThemeProvider>
                <Grid container justifyContent={'flex-end'}>
                    <CustomButton
                        text={textBtn}
                        icon_component={icon_componentBtn}
                        bgcolor={bgcolorBtn}
                        text_color={text_colorBtn}
                        font_family={font_familyBtn}
                        font_weight={font_weightBtn}
                        callback={callback}
                    ></CustomButton>
                </Grid>
            </CardContent>
        </Card>
    );
};