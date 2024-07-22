import React from "react";
import { Box, Button, Divider, Grow, InputAdornment, Modal } from "@mui/material";
import LogoHivesoft from "../../assets/img/logoHivesoft.png";
import ClearIcon from '@mui/icons-material/Clear';
import "./aboutModal.css";
import hivesoft_inc from "../../assets/img/HiveSoft-Inc.png";

function AboutModal ({open, handleClose} : { open: boolean, handleClose: () => void }) {
    return (
        <Modal id = 'modal'
            open={open}
            onClose = {handleClose}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Grow in = {open}>
                <Box id = 'about-mo' sx = 
                    {{
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        height: 450,
                        padding: '16px',
                        flexDirection: 'column',
                        alignItems: 'center',
                      
                    }}
                >
                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>                            
                        <img style = {{width: 400}} src={LogoHivesoft} alt="logo.png"/>
                    </Box>
                    <h3 style = {{color: 'black', fontFamily: 'Roboto', textShadow: '0 5px 6px rgba(0, 0, 0, 0.5)', textAlign: 'center', fontSize: 30, paddingTop: 20, marginLeft: 10}}>
                        Mensagem enviada 🐝✉️
                    </h3>

                    <footer style={{width: '200px', height: '20px', marginTop: "50px", marginLeft: 80, alignItems: 'center'}}>
                        <img src={hivesoft_inc} alt="hivesoft-inc" style={{ width: '200px', mixBlendMode:'multiply'}}/>
                    </footer>
                </Box>
            </Grow>          
        </Modal>

    )
}

export default AboutModal;