
import { RadioButtonUnchecked, RadioButtonChecked} from '@mui/icons-material';
import { Checkbox, Box} from '@mui/material';
import { useEffect, useState } from 'react';
import { fontTitle } from './styleModal';
import { fontText } from './styleOption';









  const bytesToImageUrl = (bytes: number[]) => {
    const blob = new Blob([new Uint8Array(bytes)], { type: 'image/png' }); // Assumindo que as imagens são PNG
    return URL.createObjectURL(blob);
  };



  
  





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
    options: OptionItens[];
    poll_id: number;
    
    
}



interface OptionsProps{
  question: ListQuestion;
  onSelectionChange: (id: number,selectedOptions: number[]) => void;

}


const Options: React.FC< OptionsProps > = ({question, onSelectionChange }) => { 
  
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const { id, title, options } = question;


  const handleCheckboxChange = (optionId: number) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(optionId)
        ? prevSelected.filter((id) => id !== optionId) 
        : [...prevSelected, optionId]
    );
  };

  useEffect(() => {
    onSelectionChange(id , selectedOptions);
  }, [id, selectedOptions, onSelectionChange]);

    return(
        <Box sx = {{ display:'flex', alignItems: 'center',flexDirection: 'column', position: 'absolute', right:'5%', top:'25%', bgcolor: '',width: '40%', }  }>
            <div style= {fontTitle} >{question.title}</div>
             {question.options.map((OptionItem) => (
                <Box key={OptionItem.id} sx={{bgcolor: '', display: 'flex', alignItems: "center",width: '90%',}}>
                    <Checkbox icon = {<RadioButtonUnchecked sx={{color: 'gray'}}/>}  checkedIcon= {<RadioButtonChecked sx={{color: 'gray'}}/>} onChange={() => handleCheckboxChange(OptionItem.id)} checked={selectedOptions.includes(OptionItem.id)}></Checkbox>
                    <div style={fontText}>{OptionItem.text}</div>
                    </Box>

             ))}
              </Box>
    )

};


export default Options;