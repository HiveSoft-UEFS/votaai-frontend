import React, {useState} from "react";
import {Box, InputAdornment, Modal, TextField} from "@mui/material";
import HttpsIcon from '@mui/icons-material/Https';
import Button from "@mui/material/Button";
import logo_nome from "./votaaiLogo.png";
import hivesoft_inc from "./HiveSoft-Inc.png";
import ClearIcon from '@mui/icons-material/Clear';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

function NewPasswordModal() {
    const [open, setOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };
    return(
        <div>
            <Button
                variant="text"
                color="primary"
                onClick={handleOpen}
                style={{ color: 'black', backgroundColor: 'transparent' }}
            >
                Recuperar a senha
            </Button>
            <Modal
                open={open}
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
                        height: 400,
                        backgroundColor: '#E7E7E7',
                        padding: '16px',
                        borderRadius: '8px',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2
                    }}
                >
                    <Box sx={{display: 'flex', justifyContent: 'flex-end', width: '100%'}}>
                        <ClearIcon onClick={handleClose} style={{ cursor: 'pointer', color: 'grey'}} />
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1}}>
                        <img src={logo_nome}
                             alt="votaaiLogo.png"
                             style={{marginTop: '-3px', maxWidth: '30%'}}/>

                    </Box>
                    <TextField id="confirm-code" label="Confirme o código"
                               variant="outlined"
                               fullWidth
                               margin="normal"/>
                    <TextField id="password" label="Nova senha"
                               type={showPassword ? "text" : "password"}
                               InputProps={{
                                   startAdornment: (
                                       <InputAdornment position="start">
                                           <HttpsIcon/>
                                       </InputAdornment>

                                   ),
                                   endAdornment: (
                                       <InputAdornment position="end" onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                                           {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                       </InputAdornment>
                                   ),
                               }} variant="outlined"
                               fullWidth
                               margin="normal"/>
                    <Box sx={{
                        textAlign: "center",
                        flexDirection: 'column',
                        display: 'flex'
                    }}>
                        <Button variant="contained">Redefinir</Button>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: '20px'
                    }}>
                        <img src={hivesoft_inc} alt="hivesoft-inc" style={{ width: '50%', height: '20%', objectFit: 'fill'}} />
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

export default NewPasswordModal;