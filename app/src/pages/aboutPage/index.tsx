import "./about.css";
import telaLinhaDoTempo from "../../assets/img/backgroundInicialLinhaDoTempo.png";
import telaMissaoVisao from "../../assets/img/backgroundMissaoVisiao.png";
import { Button, Grid, InputAdornment, TextField} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import React, { ChangeEvent, useEffect, useState } from "react";
import imagemSobre from "../../assets/img/figuraSobre.png"
import SubjectIcon from '@mui/icons-material/Subject';
import vector from '../../assets/img/vetorSobre.png';
import { AlternateEmail } from "@mui/icons-material";
import MessageIcon from '@mui/icons-material/Message';
import Footer from "../../components/footer";
import AboutModal from "../../components/aboutModal";
import axios from "axios";
import texto from "../../assets/img/textoInicioSobre.png";
import hivesoftLogo from "../../assets/img/hivesoftLogo.png";
import ComputerIcon from '@mui/icons-material/Computer';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


interface AboutPageProps {
    local: string;
}

function AboutPage({ local }: AboutPageProps){
    const [openModalAbout, setOpenModalAbout] = useState(false);

    useEffect(() => {
        if (local === "start"){
            {scrollToSection("about-page")}
        }else if(local === "contact"){
            scrollToSection("contato")
        }
    }, []);

    const scrollToSection = (section : any) => {
        const contatoElement = document.getElementById(section);
        if (contatoElement) {
            contatoElement.scrollIntoView({ behavior: 'smooth' });
        }
    }

    const [data, setData] = useState({
        email: '',
        subject: '',
        message: '',
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setData({
            ...data,
            [name]: value
        });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
          const response = await axios.post('http://localhost:8000/api/contact/',{email: data.email,
            subject: data.subject,
            message: data.message});
          console.log('Dados enviados com sucesso!', response.data);
          setOpenModalAbout(true)
        } catch (error) {
          console.error('Erro ao enviar os dados:', error);
        }
    };
    return(
        <>
            <section id = "about-page">
                <Grid container justifyContent="center" alignItems="center" sx = {{paddingY: 20}}>
                    <Grid item xs={5.7} sx = {{marginLeft: 20}}>
                        <img style={{ width: '100%', mixBlendMode: 'multiply'}} src={texto} alt='Tela inicial Sobre' />
                        <Button style={{
                            width: 250,
                            height: 50,
                            background: 'rgba(255, 255, 255, 0.5)',
                            boxShadow: '0 7px 6px rgba(0, 0, 0, 0.8)',
                            color: 'rgba(0, 0, 0, 0.8)',             
                            }}
                            variant="contained" onClick = {()=>scrollToSection('about-vision-mission')}> Saber mais
                            <InputAdornment position="start">
                                <ExpandMoreIcon style = {{color: 'rgba(0, 0, 0, 0.8)'}}/>
                            </InputAdornment>
                        </Button>
                        <Button style={{
                            width: 250,
                            height: 50,
                            backgroundColor : 'black',
                            marginLeft: 20,
                            background: 'rgba(255, 255, 255, 0.5)',
                            boxShadow: '0 7px 6px rgba(0, 0, 0, 0.8)',
                            color: 'rgba(0, 0, 0, 0.8)'                  
                            }}
                            variant="contained" onClick = {()=>scrollToSection('contato')}> Contato
                            <InputAdornment position="start">
                                <ComputerIcon style = {{color: 'rgba(0, 0, 0, 0.8)'}}/>
                            </InputAdornment>
                        </Button>
                    </Grid>
                    <Grid item xs={5}>
                        <img style={{ width: '80%'}} src={hivesoftLogo} />
                    </Grid>
                </Grid>
            </section>
            <section id = 'about-vision-mission'>
                <img style={{ width: '100%', height: '100%'}} src={telaMissaoVisao} alt='Tela inicial Sobre' />
            </section>
            <section id = 'line-temp'>
                <img style={{ width: '100%', height: '100%'}} src={telaLinhaDoTempo} alt='Tela inicial Sobre' />
            </section>
            <section id = "contato" className="contato">
                <Grid container justifyContent="center" alignItems="center">
                    <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
                        <img style={{width: 800, paddingTop: 95, margin: '10px'}} src={imagemSobre} alt = 'Linha do tempo'/>
                    </Grid> 
                    <Grid item xs={12} md={6} sx={{ textAlign: 'center', paddingY: 2 }}>
                        <form style = {{alignItems: 'center', justifyContent: "center", width: 629, marginLeft: 80, height: 522, marginTop: 47}} onSubmit={handleSubmit} id = "form">
                            <TextField style={{ height: 56, 
                                                width: 350, 
                                                background: 'white',
                                                marginTop: 126,
                                                marginLeft: 30,
                                                boxShadow: '0 5px 6px rgba(0, 0, 0, 0.5)'
                                            }}  id="email" label="E-MAIL" type="email" name = "email"
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AlternateEmail />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="outlined" 
                                fullWidth
                                onChange={handleChange}
                                value = {data.email}
                                margin="normal" />
                            <TextField style={{ height: 56, 
                                                width: 350,
                                                background: "white", 
                                                boxShadow: '0 5px 6px rgba(0, 0, 0, 0.5)',
                                                marginLeft: 30,
                                                marginTop: 0
                                            }} id="subject" label="ASSUNTO" type="text" name = 'subject'
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SubjectIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="outlined" 
                                fullWidth
                                onChange={handleChange}
                                value = {data.subject}
                                margin="normal" required/>
                            <TextField style={{ height: 125, 
                                                width: 350, 
                                                textAlign: 'justify',
                                                background: 'white',
                                                marginLeft: 30,
                                                marginTop: 0,
                                                boxShadow: '0 5px 6px rgba(0, 0, 0, 0.5)'
                                            }} id="message" label="MENSAGEM" type="text" name = "message"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <MessageIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                multiline
                                rows={4}
                                onChange={handleChange}
                                value = {data.message}
                                required/>
                            <Button style={{
                                backgroundColor: '#2C2B2B', 
                                height: 50,
                                fontSize: 18,
                                marginLeft: 35,
                                marginTop: 10,
                                width: 300, 
                                color: '#FFD006',
                                boxShadow: '0 7px 6px rgba(0, 0, 0, 0.5)',                          
                            }}
                                variant="contained" type="submit">Enviar
                                <InputAdornment position="end">
                                    <SendIcon style={{ color: '#FFD006' }} />
                                </InputAdornment>
                            </Button>
                        </form>
                    </Grid>
                </Grid>
            </section>
            <Footer />
            <AboutModal open={openModalAbout} handleClose={() => {
                setOpenModalAbout(false)
            }}/>
        </>
    )


}

export default AboutPage;
