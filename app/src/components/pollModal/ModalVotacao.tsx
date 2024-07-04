
import React, { useState } from 'react';
import { Modal, Box, IconButton, Pagination } from '@mui/material';
import { CheckCircleOutline, ArrowCircleUp, Close, ArrowBack } from '@mui/icons-material';
import Options from './options';

import '@fontsource/poppins';
import { centerModal, elaboracao, fontDescription, fontTitle, infoModal, modalStyle, tracoTela } from './styleModal';


const ModalVotacao = () => {
  
  const dicat = {
  title : "Micareta",
  description : 'Às vésperas do micareta, a cidade se agita com uma pergunta que ecoa em todos os cantos: qual será a atração mais imperdível deste ano? Os foliões aguardam ansiosamente pelos artistas mais comentados. Quanto às cervejas, as preferências são variadas. Em meio a tantas opções tentadoras, a energia vibrante e alegria contagiante do micareta prometem momentos de pura diversão para todos os foliões, qual será a sua escolha para viver intensamente a folia?',
  options	: ['','',''],
  questions: {id: 1 , title: "Atracoes", max_qtd_choices: 2, options: [ {id: 4, text: 'oiedadadaada', question_id: 1}, {id: 1, text: 'leo', question_id: 1}], poll_id:  2},
  question_field: [{id: 1 , title: "Atracoes", max_qtd_choices: 2, options: [ {id: 4, text: 'oiedadadaada', question_id: 1}, {id: 1, text: 'leo', question_id: 1}], poll_id:  2}, {id: 2 , title: "Atracoes", max_qtd_choices: 2, options: [ {id: 1, text: 'Pedro', question_id: 1}, {id: 2, text: 'Gab', question_id: 1},{id: 3, text: 'lucas', question_id: 1}], poll_id:  2}, ]
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const [mod, setModalStatus] = useState(true);


  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? 0 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex);
    };


  const goToPage = (event: React.ChangeEvent<unknown>,page: number)=> {
    setCurrentIndex(page-1)

  }


  const goClose = () => {
    setModalStatus(false);
  }


  const goOpen = () => {
    setModalStatus(true);
  }


  const goToFinalize = () => {
    //logica para enviar para backend
    setModalStatus(false);
    };
  





  


  const [selectedOptions, setSelectedOptions] = useState({});

  const handleSelectionChange = (id: number, selected: number[]) => {
    setSelectedOptions(prevState => ({
      ...prevState,
      [id]: selected
    }));
  };

    return(
    <div>
    <Modal
    open = {mod} 
    onClose={goClose}>

      <Box sx={centerModal}>
        <Box sx = {modalStyle}>
          <Box sx={infoModal}>
            <div style={tracoTela}></div>
            <Pagination count={dicat.question_field.length} variant="outlined" page={currentIndex+1} onChange={goToPage} hideNextButton= {true} hidePrevButton = {true}  style={{position: 'absolute', left: '50%', top: '92%', transform: 'translate(-50%, -50%)',}}/>


              <Box sx={elaboracao}>
                <div style={fontTitle}>{dicat.title}</div>
                <div style={fontDescription}>{dicat.description}</div>
                

              </Box>

              {dicat.question_field.map((src, index) => (
                index === currentIndex ? <Options  question={dicat.question_field[index]} onSelectionChange={handleSelectionChange}/> : null
                

              ))}
              
              




            <IconButton onClick={goClose}
              sx={{
                color: '6D6D6D',
                position: 'absolute',
                top: '3%',
                right: '2.1%',
                height: '40px',
                
                
              }
              }
              >
            <Close sx={{fontSize: '100%'}}/>
          </IconButton>
            
            {currentIndex !== dicat.question_field.length-1 &&
            (<IconButton onClick={goToNext}
            sx={{
              color: '6D6D6D',
              position: 'absolute',
              height: '7%',
              width: '4%',
              top: '87%',
              right: '2%',
              transform: 'rotate(90deg)',
              
              
            }
            }>
            <ArrowCircleUp sx={{fontSize: '250%'}}/>
          </IconButton>)}


          {currentIndex !== 0 && (<IconButton onClick={goToPrevious}
            sx={{
              color: '6D6D6D',
              position: 'absolute',
              height: '7%',
              width: '4%',
              top: '4%',
              left: '2%',
              
              
            }
            }>
            <ArrowBack sx={{fontSize: '150%'}}/>
          </IconButton>)}

          {currentIndex === dicat.question_field.length-1 &&
            (<IconButton onClick={goToFinalize}
            sx={{
              color: 'green',
              position: 'absolute',
              height: '7%',
              width: '4%',
              top: '87%',
              right: '2%',
              
              
            }
            }>
            <CheckCircleOutline sx={{fontSize: '250%'}}/>
          </IconButton>)}
          

          </Box>


        </Box>
      </Box>

    </Modal>
    </div>


    );


}
  

export default ModalVotacao;