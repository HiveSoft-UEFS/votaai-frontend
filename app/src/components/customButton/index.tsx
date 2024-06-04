import * as React from 'react';             // Importa a biblioteca React
import Button from '@mui/material/Button';  // Importa o componente Button do Material-UI
import Stack from '@mui/material/Stack';    // Importa o componente Stack do Material-UI


/**
 * CustomButton component.
 * 
 * @param {Object} props - Component properties.
 * @param {string} props.text - Texto a ser exibido no botão.
 * @param {React.ElementType} [props.icon_component] - Componente de ícone a ser exibido no botão.
 * @param {string} [props.bgcolor] - Cor de fundo do botão.
 * @param {string} [props.text_color] - Cor do texto do botão.
 * @param {string} [props.font_family] - Fonte do texto do botão.
 * @param {string} [props.font_weight] - Peso da fonte do texto do botão.
 * @param {Function} [props.callback] - Função a ser chamada quando o botão é clicado.
 * @returns {JSX.Element} The rendered button component.
 */

interface CustomButtonProps {
    text: string;
    icon_component: React.ReactElement;
    bgcolor: string;
    text_color: string;
    font_family: string;
    font_weight?: string;
    callback: () => void;
  }

function CustomButton({text, icon_component, bgcolor, text_color, font_family, font_weight, callback}: CustomButtonProps) {
  return (
    <Stack direction="row" spacing={2}>   {/* Usa Stack para alinhar os elementos em uma linha com espaçamento entre eles */}
      <Button 
        variant="contained"               // Define o tipo do botão como 'contained'
        endIcon={icon_component}          // Adiciona o ícone no final do botão, se fornecido
        onClick={callback}                // Define a função a ser chamada quando o botão é clicado
        style={{
          backgroundColor: bgcolor,       // Define a cor de fundo do botão
          color: text_color,              // Define a cor do texto do botão
          fontFamily: font_family,        // Define a fonte do texto do botão
          fontWeight: font_weight,        // Define o peso da fonte do texto do botão
          textTransform: 'none'           // Garante que o texto não será transformado (por exemplo, não ficará todo em maiúsculas)
        }}>
        {text}                            {/* Renderiza o texto do botão */}
      </Button>
      
    </Stack>
  );
}

export default CustomButton