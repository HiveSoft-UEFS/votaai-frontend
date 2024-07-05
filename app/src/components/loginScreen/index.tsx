import React, {useState} from "react";
import {Box, InputAdornment, Modal, TextField} from "@mui/material";
import {AccountCircle, AlternateEmail} from "@mui/icons-material";
import Button from "@mui/material/Button";
import logo from "./logo-nome.png";
import hivesoft_inc from "./HiveSoft-Inc.png";
import HttpsIcon from '@mui/icons-material/Https';
import ListAltIcon from '@mui/icons-material/ListAlt';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

interface LoginScreenProps {
    open: boolean;
    handleClose: () => void;
}

function LoginScreen({open, handleClose}: LoginScreenProps) {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [senha, setSenha] = useState('');
  
    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setUsername(event.target.value);
    };
  
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSenha(event.target.value);
    };
  
    const handleLoginClick = async () => {
      try {
        console.log(username)
        console.log(senha)
        const response = await axios.post('http://127.0.0.1:8000/api/token/', {
          username: username,
          password: senha,
        });
  
        console.log('Login successful:', response.data);      
        localStorage.setItem('accessToken', response.data.access);
        console.log(localStorage.getItem('accessToken'))  
        navigate('/home');
      } catch (error) {
        //TODO: Exibir erro ao logar
        console.error('Login failed:', error);        
      }
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

    return(
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
                <Box
                    sx={{
                        width: 400,
                        height: 500,
                        backgroundColor: 'white',
                        padding: '16px',
                        borderRadius: '8px',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2
                    }}
                >
                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2}}>
                        <img src={logo}
                             alt="logo.png"
                             style={{marginTop: '16px', maxWidth: '100%'}}/>
                    </Box>
                    <TextField id="username" label="Username"
                               InputProps={{
                                   startAdornment: (
                                       <InputAdornment position="start">
                                           <AlternateEmail/>
                                       </InputAdornment>
                                   ),
                               }}
                               variant="outlined" fullWidth
                               margin="normal"
                               onChange={handleUsernameChange}/>
                    <TextField id="senha" label="Senha"
                               InputProps={{
                                   startAdornment: (
                                       <InputAdornment position="start">
                                           <HttpsIcon/>
                                       </InputAdornment>
                                   ),
                               }}
                               variant="outlined" fullWidth
                               margin="normal"
                               onChange={handlePasswordChange}/>
                    <Box sx={{
                        textAlign: "center",
                        flexDirection: 'column',
                        display: 'flex'
                    }}>
                        <Button variant="contained" onClick={handleLoginClick}>Login</Button>
                        <Button variant="text">Esqueci a senha</Button>
                        <Box sx={{width: '200px', height: '20px', marginTop: '16px'}}>
                            <img src={hivesoft_inc} alt="hivesoft-inc" style={{ width: '100%', height: '100%', objectFit: 'fill' }} />
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}





export default LoginScreen;