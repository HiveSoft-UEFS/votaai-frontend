import React, {useState} from "react";
import {Box, InputAdornment, Modal, TextField} from "@mui/material";
import {AccountCircle, AlternateEmail} from "@mui/icons-material";
import Button from "@mui/material/Button";
import logo_nome from "./votaaiLogo.png";
import hivesoft_inc from "./HiveSoft-Inc.png";
import ClearIcon from '@mui/icons-material/Clear';

function EmailModal() {
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
                             style={{marginTop: '16px', maxWidth: '30%'}}/>

                    </Box>
                    <TextField id="name" label="Email" InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AlternateEmail/>
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
                        <Button variant="contained">Enviar</Button>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: '30px'
                    }}>
                        <img src={hivesoft_inc} alt="hivesoft-inc" style={{ width: '50%', height: '20%', objectFit: 'fill'}} />
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

export default EmailModal;