import Footer from "../../components/footer";
import telaIncialSobre from "../../assets/img/telaInicialSobre.png";
import telaLinhaDoTempo from "../../assets/img/telaLinhaDoTempo.png";
import telaMissaoVisao from "../../assets/img/telaMissaoVisao.png";
import telaEntreEmContato from "../../assets/img/telaEntreEmContato.png";
import { Button, InputAdornment, TextField } from "@mui/material";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';
import React from "react";

function AboutPage(){
    return(
            <>
            <section style={{ background: '#FFD006', display: "flex", alignItems: "center"}}>
                <img style={{width: '100%', paddingTop: 207}} src={telaIncialSobre} alt='Tela inicial Sobre' />
                <Button style = {{background: "#E9D495", 
                                width: 250, left: 140, 
                                top: 550, 
                                position: "absolute", 
                                height: 50, 
                                color: "#343A40", 
                                fontSize: 18}} variant = "text" ><InputAdornment position="start">
                                                                    <KeyboardReturnIcon/>
                                                                </InputAdornment>Voltar</Button>
            </section>
            <section style={{display: "flex", alignItems: "center"}}>
                <img style={{ width: '100%' }} src={telaMissaoVisao} alt='Tela inicial Sobre' />
            </section>
            <section style={{ background: '#FFD006', display: "flex", alignItems: "center" }}>
                <img style={{ width: '100%' }} src={telaLinhaDoTempo} alt='Tela inicial Sobre' />
            </section>
            <section style={{display: "flex", alignItems: "center"}}>
                <div> 
                    <img style={{ width: '100%' }} src={telaEntreEmContato} alt='Tela inicial Sobre' />
                    <div style={{width: "100%"}}>
                        <TextField style = {{background: "white", bottom: 338, left: 980, width: 300, color: "ADB5BD"}} label="Email"/>
                        <TextField style = {{background: "white", bottom: 280, left: 680, width: 300, color: "ADB5BD"}} label="Assunto"/>
                        <TextField style = {{background: "white", bottom: 220, left: 380, width: 300, color: "ADB5BD"}} label="Escreva sua mensagem"/>
                        <Button style = {{background: "#2C2B2B", 
                                        width: 200, 
                                        height: 50, 
                                        color: "#FFD006", 
                                        fontSize: 18,
                                        bottom: 150,
                                        left: 132
                                        }} variant = "text" > Enviar <InputAdornment position="end">
                                                                        <SendTwoToneIcon style={{color: "#FFD006"}}/>
                                                                    </InputAdornment></Button>
                    </div>
                </div>
            </section>
            <section>
                <Footer/>
            </section>
        </>
    )
}

export default AboutPage;