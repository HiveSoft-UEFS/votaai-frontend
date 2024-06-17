import React, {useState} from "react";
import {Box, InputAdornment, Modal, TextField} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";
import Button from "@mui/material/Button";
import logo from "./logo.png";
import logo_nome from "./logo-nome.png";
import hivesoft_inc from "./HiveSoft-Inc.png";
function RegistrationModal() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return(
        <div>
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Open Modal
            </Button>
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
                    height: 800,
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
                    <img src={logo_nome}
                         alt="logo_nome.png"
                         style={{marginTop: '16px', maxWidth: '100%'}}/>
                </Box>
                <TextField id="name" label="Nome Completo" InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <AccountCircle/>
                        </InputAdornment>
                    ),
                }} variant="outlined"
                           fullWidth
                           margin="normal"/>
                <TextField id="nickname" label="Nickname" InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <AccountCircle/>
                        </InputAdornment>
                    ),
                }} variant="outlined"
                           fullWidth
                           margin="normal"/>
                <TextField id="cpf" label="CPF" variant="outlined" fullWidth
                           margin="normal"/>
                <TextField id="email" label="Email" variant="outlined" fullWidth
                           margin="normal"/>
                <TextField id="password" label="Senha" variant="outlined" fullWidth
                           margin="normal"/>
                <TextField id="passwordCheck" label="Confirmar senha" variant="outlined" fullWidth
                           margin="normal"/>
                <Box sx={{
                    textAlign: "center",
                    flexDirection: 'column',
                    display: 'flex'
                }}>
                    <Button variant="contained">Cadastrar</Button>
                    <Button variant="text">já possui cadastro</Button>
                    <Box sx={{width: '200px', height: '20px', marginTop: '16px'}}>
                        <img src={hivesoft_inc} alt="hivesoft-inc" style={{ width: '100%', height: '100%', objectFit: 'fill' }} />
                    </Box>
                </Box>
            </Box>
        </Modal>
        </div>
    );
}

export default RegistrationModal;