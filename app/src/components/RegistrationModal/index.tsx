import React, { useState, ChangeEvent } from "react";
import { Box, Divider, Grow, InputAdornment, Modal, TextField } from "@mui/material";
import { AccountCircle, AlternateEmail } from "@mui/icons-material";
import Button from "@mui/material/Button";
import logo from "./logo-nome.png";
import hivesoft_inc from "./HiveSoft-Inc.png";
import HttpsIcon from '@mui/icons-material/Https';
import ListAltIcon from '@mui/icons-material/ListAlt';
import axios from 'axios';
import { create } from '../../services/userServices';
import ClearIcon from '@mui/icons-material/Clear';
import LoginScreen from "../loginScreen";

interface RegistrationModalProps {
    open: boolean;
    handleClose: () => void;
}

function RegistrationModal({ open, handleClose }: RegistrationModalProps) {

    const [userData, setUserData] = useState({
        cpf: "",
        email: "",
        name: "",
        lname: "",
        username: "",
        status: "ACTIVE",
        role: "USER",
        password: "",
        is_active: true,
        is_staff: true,
        is_admin: true
    });

    const [openModalLogin, setOpenModalLogin] = useState(false)

    const handleOpenModalLogin = () => {
        handleClose();
        setOpenModalLogin(true);
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const data = {
            username: (document.getElementById('name') as HTMLInputElement).value,
            nickname: (document.getElementById('nickname') as HTMLInputElement).value,
            cpf: (document.getElementById('cpf') as HTMLInputElement).value,
            email: (document.getElementById('email') as HTMLInputElement).value,
            password: (document.getElementById('password') as HTMLInputElement).value,
            passwordCheck: (document.getElementById('passwordCheck') as HTMLInputElement).value,
        };

        try {
            const response = await axios.post('http://localhost:8000/api/register/', data);
            console.log('Registration successful', response.data);
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Cor de fundo do modal
                }}
            >   
                <Grow in = {open}>
                    <Box
                        sx={{
                            width: 400,
                            height: 800,
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            padding: '16px',
                            borderRadius: '10px',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 2
                        }}
                    >
                        <ClearIcon onClick={handleClose} style={{ cursor: 'pointer', color: 'grey', marginLeft: 346}}/>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                            <img src={logo}
                                alt="logo.png"
                                style={{ marginTop: '16px', maxWidth: '100%' }} />
                        </Box>
                        <TextField
                            id="name"
                            label="Nome"
                            name="name"
                            onChange={handleChange}
                            value={userData.name}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            }} variant="outlined"
                            fullWidth
                            margin="normal" />

                        <TextField
                            sx = {{marginTop: 0}}
                            id="lname"
                            label="Sobrenome"
                            name="lname"
                            onChange={handleChange}
                            value={userData.lname}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            }} variant="outlined"
                            fullWidth
                            margin="normal" />
                        <TextField
                            sx = {{marginTop: 0}}
                            id="nickname"
                            label="Nickname"
                            name="username"
                            onChange={handleChange}
                            value={userData.username}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            }} variant="outlined"
                            fullWidth
                            margin="normal" />
                        <TextField
                            sx = {{marginTop: 0}}
                            id="cpf"
                            label="CPF"
                            name="cpf"
                            onChange={handleChange}
                            value={userData.cpf}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <ListAltIcon />
                                    </InputAdornment>
                                ),
                            }}
                            variant="outlined" fullWidth
                            margin="normal" />
                        <TextField
                            sx = {{marginTop: 0}}
                            id="email"
                            label="Email"
                            name="email"
                            onChange={handleChange}
                            value={userData.email}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AlternateEmail />
                                    </InputAdornment>
                                ),
                            }}
                            variant="outlined" fullWidth
                            margin="normal" />
                        <TextField
                            sx = {{marginTop: 0}}
                            id="password"
                            label="Senha"
                            name="password"
                            onChange={handleChange}
                            value={userData.password}
                            type="password"

                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <HttpsIcon />
                                    </InputAdornment>
                                ),
                            }}
                            variant="outlined" fullWidth
                            margin="normal" />
                        <TextField
                            sx = {{marginTop: 0}}
                            id="passwordCheck"
                            label="Confirmar senha"
                            type="password"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <HttpsIcon />
                                    </InputAdornment>
                                ),
                            }} variant="outlined" fullWidth
                            margin="normal" />
                        <Box sx={{
                            textAlign: "center",
                            flexDirection: 'column',
                            display: 'flex'
                        }}>
                            <Button onClick={() => {
                                create(userData).then(() => {
                                    handleClose()
                                })
                            }} variant="contained">Cadastrar</Button>
                            <Button variant="text" onClick={handleOpenModalLogin}>já possuo cadastro</Button>
                            <Divider component="li" sx = {{height: '7px', color: 'rgba(255, 255, 255, 0.1)'}}/>
                            <footer style={{ width: '200px', height: '20px', marginTop: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: 81}}>
                                <img src={hivesoft_inc}  alt="hivesoft-inc" style={{width: '100%', height: '100%', objectFit: 'fill' }} />
                            </footer>
                        </Box>
                    </Box>
                </Grow>
            </Modal>
            <LoginScreen open={openModalLogin} handleClose={() => {
                setOpenModalLogin(false)
            }}/>
        </div>
    );
}

export default RegistrationModal;