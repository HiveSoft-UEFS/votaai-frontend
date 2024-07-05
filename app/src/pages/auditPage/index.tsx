import React, { useState } from 'react';
import './auditPage.css';
import BasePage from "../../components/basePage";
import questionIcon from '../../assets/img/question.png';
import confirmIcon from '../../assets/img/confirm.png'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import logo from "./logo-nome.png";
import hivesoft_inc from "./HiveSoft-Inc.png";
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

interface AuditResult {
  creator_name: string;
  creation_date: string;
  finish_date: string;
  status: string;
  title: string;
  description: string;
  questions: {
    title: string;
    options: {
      text: string;
      img: string[];
    }[];
  }[];
}

const modalStyleAuditePage = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)', 
};

const contentStyleAuditPage = {
  width: 400,
  maxHeight: 'calc(100vh - 100px)', 
  overflowY: 'auto', 
  backgroundColor: 'white',
  padding: '16px',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 2
};

const AuditPage = () => {
  const [auditCode, setAuditCode] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [activeStep, setActiveStep] = React.useState(0);
  const [errorOccurred, setErrorOccurred] = React.useState(false);

  const handleAudit = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`http://localhost:8000/votes/${auditCode}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Adiciona o token no header
        }
      });
      if (!response.ok) {
        throw new Error('Erro ao auditar');
      }
      const data = await response.json();
      setAuditResult(data); 
      setModalIsOpen(true); 
    } catch (error) {
      setErrorOccurred(true)
      console.error('Erro ao auditar:', error);
      
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuditCode(event.target.value);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setAuditResult(null); 
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCloseErrorAlert = () => {
    setErrorOccurred(false); 
  };

  return (
    <BasePage username="NomeUsuário" title="AUDITORIA">
      <div className="audit-content">
        <div className="audit-form">
            <input
            type="text"
            placeholder="Digite o código de participação"
            className="audit-input"
            value={auditCode}
            onChange={handleChange}
            />
            <button className="audit-button" onClick={handleAudit}>Auditar</button>

        </div>
        {errorOccurred && (
                    <Stack sx={{ 
                      width: '50%',
                      borderRadius: '5px',
                      position: 'absolute', 
                      marginTop: '32%',
                      zIndex: 1
                    }} spacing={2}>
          <Alert severity="error" onClose={handleCloseErrorAlert}>Erro ao auditar. Tente novamente.</Alert>
        </Stack>
      )}
       
        <div className="audit-info">
          <div className="audit-info-section">
            <img src={questionIcon} alt="" />
            <h2 className="audit-info-title">O que é?</h2>
            <p>
              Na auditoria do Votaai, você pode verificar como seu voto foi computado. Após votar, o usuário recebe um código por e-mail para realizar a auditoria nesta página.            </p>
          </div>
          <div className="audit-info-section">
            <img src={confirmIcon} alt="" />
            <h2 className="audit-info-title">São confiáveis?</h2>
            <p>
              No votaai os resultados são 100% confiáveis pois conta com uma tecnologia que não permite alteração de um voto já computado.
            </p>
          </div>
        </div>
      </div>
      
      <Modal
        open={modalIsOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...modalStyleAuditePage }}>
          <Box sx={{ ...contentStyleAuditPage }}>
          <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2}}>
                        <img src={logo}
                             alt="logo.png"
                             style={{marginTop: '16px', maxWidth: '100%'}}/>
                    </Box>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Informações da Auditoria
            </Typography>

            {auditResult && (
              <div>
                {activeStep === 0 && (
                  <div>
                    <Typography id="modal-modal-description">
                      Creator Name: {auditResult.creator_name}
                    </Typography>
                    <Typography id="modal-modal-description">
                      Creation Date: {auditResult.creation_date}
                    </Typography>
                    <Typography id="modal-modal-description">
                      Finish Date: {auditResult.finish_date}
                    </Typography>
                    <Typography id="modal-modal-description">
                      Status: {auditResult.status}
                    </Typography>
                    <Typography id="modal-modal-description">
                      Title: {auditResult.title}
                    </Typography>
                    <Typography id="modal-modal-description">
                      Description: {auditResult.description}
                    </Typography>
                  </div>
                )}

                {activeStep > 0 && (
                  <div>
                    <Typography id="modal-modal-description">
                      {auditResult.questions[activeStep - 1].title}
                    </Typography>
                    <ul>
                      {auditResult.questions[activeStep - 1].options.map((option, idx) => (
                        <li key={idx}>
                          Text: {option.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <MobileStepper
                  variant="dots"
                  steps={auditResult.questions.length + 1} 
                  position="static"
                  activeStep={activeStep}
                  sx={{ maxWidth: 400, flexGrow: 1 }}
                  nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === auditResult.questions.length}>
                      Next
                      <KeyboardArrowRight />
                    </Button>
                  }
                  backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                      <KeyboardArrowLeft />
                      Back
                    </Button>
                  }
                />
              </div>
            )}

            <Button variant="contained" onClick={closeModal}>Fechar</Button>
            <Box sx={{ width: '200px', height: '20px', marginTop: '16px' }}>
              <img src={hivesoft_inc} alt="hivesoft-inc" style={{ width: '100%', height: '100%', objectFit: 'fill' }} />
            </Box>
          </Box>
        </Box>
      </Modal>      
    </BasePage>
  );
};

export default AuditPage;
