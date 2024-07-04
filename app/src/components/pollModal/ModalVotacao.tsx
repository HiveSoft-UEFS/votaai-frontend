
import React, { useState, useEffect } from 'react';
import { Modal, Box, IconButton, Pagination } from '@mui/material';
import { CheckCircleOutline, ArrowCircleUp, Close, ArrowBack } from '@mui/icons-material';
{/*import Options from './options';*/}

import '@fontsource/poppins';
import { centerModal, elaboracao, fontDescription, fontTitle, infoModal, modalStyle, tracoTela } from './styleModal';
import { text } from 'stream/consumers';




interface OptionItens{
  id: number;
  text: string;
  //img: number[];
  question_id: number;

}

interface ListQuestion{
  id: number;
  title: string;
  max_qtd_choices: number;
  poll_id: number;
  options: OptionItens[];
  
  
}

interface poll{
  id: number;
  criation_date: Date;
  finish_date: Date;
  //status: enum;
  title: string;
  description: string;
  creator_id: number;
  //privacy: enum;
  question_field: ListQuestion[];
}



interface PollModalProps {
  openModal: boolean;
  goClose: () => void;
  poll: poll | null;

}


const ModalVotacao = ({openModal,goClose,poll}:PollModalProps) => {
  
  






  
  


  const [currentIndex, setCurrentIndex] = useState(0);


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


  const postSelectedOptions = async (url: string, data: any) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        throw new Error('Erro na requisição');
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      throw error;
    }
  };
  




  const goToFinalize = () => {
  

    //postSelectedOptions('http://127.0.0.1:8000/votes/',{'questions': selectedOptions})

    
    //logica para enviar para backend
    goClose();
    };
  





  


  const [selectedOptions, setSelectedOptions] = useState({});

  type SelectedOptionsType = {
    [key: number]: number[];
  };
  
  const handleSelectionChange = (id: number, selected: number[]) => {
    setSelectedOptions((prevState: SelectedOptionsType) => {
      const nextState = {
        ...prevState,
        [id]: selected
      };
  
      if (selected.length === 0) {
        delete nextState[id];
      }

    
  
      return nextState;
    });
  };

    return( 
    <Modal
    open = {openModal} 
    onClose={goClose}>
      {poll ? (
      <Box sx={centerModal}>
        <Box sx = {modalStyle}>
          <Box sx={infoModal}>
            <div style={tracoTela}></div>
            <Pagination count={poll.question_field.length} variant="outlined" page={currentIndex+1} onChange={goToPage} hideNextButton= {true} hidePrevButton = {true}  style={{position: 'absolute', left: '50%', top: '92%', transform: 'translate(-50%, -50%)',}}/>


              <Box sx={elaboracao}>
                <div style={fontTitle}>{poll.title}</div>
                <div style={fontDescription}>{poll.description}</div>
              

              </Box>

              {/*
              {poll.question_field.map((src, index) => (
                index === currentIndex ? <Options  question={poll.question_field[index]} onSelectionChange={handleSelectionChange}/> : null
                

              ))}*/}
              
              




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
            
            {currentIndex !== poll.question_field.length-1 &&
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
              left: '2%',}
              }>
            <ArrowBack sx={{fontSize: '150%'}}/>
          </IconButton>)}

          {currentIndex === poll.question_field.length-1 &&
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
      ) : (<div style={fontTitle}>Nenhuma Enquete Encontrada</div>)}
    </Modal>
    

    );


}
  

export default ModalVotacao;
