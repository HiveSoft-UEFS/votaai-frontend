import React, { useState } from "react";
import { Box, InputAdornment, Modal, TextField, Button } from "@mui/material";
import HttpsIcon from '@mui/icons-material/Https';
import ClearIcon from '@mui/icons-material/Clear';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import logo_nome from "./votaaiLogo.png";
import hivesoft_inc from "./HiveSoft-Inc.png";
import { updatePassword } from '../../services/userServices';

interface UpdatePasswordModalProps {
    open: boolean;
    onClose: () => void;
    userId: number; // Adiciona o ID do usuário como prop
}

function UpdatePasswordModal({ open, onClose, userId }: UpdatePasswordModalProps) {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const toggleCurrentPasswordVisibility = () => {
        setShowCurrentPassword(prev => !prev);
    };

    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(prev => !prev);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(prev => !prev);
    };

    const handleUpdate = async () => {
        if (newPassword === confirmPassword) {
            try {
                await updatePassword({ userId, currentPassword, newPassword }); // Passa o userId
                console.log("Senha atualizada com sucesso");
            } catch (error) {
                console.error("Erro ao atualizar a senha:", error);
            } finally {
                onClose(); // Fecha o modal após a tentativa de atualização
            }
        } else {
            console.error("As senhas não coincidem");
        }
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
            <Box sx={{ width: 400, backgroundColor: '#E7E7E7', padding: '16px', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                    <ClearIcon onClick={onClose} style={{ cursor: 'pointer', color: 'grey' }} />
                </Box>
                <img src={logo_nome} alt="Logo" style={{ marginTop: '-3px', maxWidth: '30%' }} />
                <TextField
                    label="Senha Atual"
                    type={showCurrentPassword ? "text" : "password"}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><HttpsIcon /></InputAdornment>,
                        endAdornment: <InputAdornment position="end" onClick={toggleCurrentPasswordVisibility} style={{ cursor: 'pointer' }}>
                            {showCurrentPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </InputAdornment>,
                    }}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Nova Senha"
                    type={showNewPassword ? "text" : "password"}
                    onChange={(e) => setNewPassword(e.target.value)}
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><HttpsIcon /></InputAdornment>,
                        endAdornment: <InputAdornment position="end" onClick={toggleNewPasswordVisibility} style={{ cursor: 'pointer' }}>
                            {showNewPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </InputAdornment>,
                    }}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Confirmação da Nova Senha"
                    type={showConfirmPassword ? "text" : "password"}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><HttpsIcon /></InputAdornment>,
                        endAdornment: <InputAdornment position="end" onClick={toggleConfirmPasswordVisibility} style={{ cursor: 'pointer' }}>
                            {showConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </InputAdornment>,
                    }}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                />
                <Button variant="contained" onClick={handleUpdate} fullWidth>
                    Redefinir
                </Button>
                <img src={hivesoft_inc} alt="HiveSoft Inc" style={{ width: '50%', height: '20%', objectFit: 'fill', marginTop: '20px' }} />
            </Box>
        </Modal>
    );
}

export default UpdatePasswordModal;