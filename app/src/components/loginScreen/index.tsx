import React, { useState } from "react";
import { Box, InputAdornment, Modal, TextField, Typography } from "@mui/material";
import { AlternateEmail } from "@mui/icons-material";
import Button from "@mui/material/Button";
import logo from "./logo-nome.png";
import hivesoft_inc from "./HiveSoft-Inc.png";
import HttpsIcon from '@mui/icons-material/Https';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EmailModal from '../forgotPasswordModal/emailModal';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import './LoginScreen.css';

// Removendo imports duplicados
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface LoginScreenProps {
  open: boolean;
  handleClose: () => void;
}

function LoginScreen({ open, handleClose }: LoginScreenProps) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSenha(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
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
      setErrorMessage('Falha na autenticação. Usuário ou senha inválidos.');
      setIsExpanded(true); // Expand modal on error
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
        <Box
          sx={{
            width: 400,
            minHeight: isExpanded ? 650 : 500, // Aumentar altura se necessário
            backgroundColor: 'white',
            padding: '16px',
            borderRadius: '8px',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <img src={logo}
              alt="logo.png"
              style={{ marginTop: '16px', maxWidth: '100%' }} />
          </Box>
          <TextField id="username" label="Username"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AlternateEmail />
                </InputAdornment>
              ),
            }}
            variant="outlined" fullWidth
            margin="normal"
            onChange={handleUsernameChange} />
          <TextField 
            id="senha" 
            label="Senha" 
            type={showPassword ? "text" : "password"}
            value={senha}
            onChange={handlePasswordChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <HttpsIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end" onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </InputAdornment>
              ),
            }}
            variant="outlined" 
            fullWidth 
            margin="normal" 
          />
          {errorMessage && (
            <Typography color="error" sx={{ marginTop: '16px' }}>
              {errorMessage}
            </Typography>
          )}
          <Box sx={{
            textAlign: "center",
            flexDirection: 'column',
            display: 'flex'
          }}>
            <Button variant="contained" onClick={handleLoginClick}>Login</Button>
            <EmailModal />
            <Box sx={{ width: '200px', height: '20px', marginTop: '16px', display: 'flex', justifyContent: 'center' }}>
              <img src={hivesoft_inc} alt="hivesoft-inc" style={{ width: '100%', height: '100%', objectFit: 'fill' }} />
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default LoginScreen;
