import * as React from 'react';             // Importa a biblioteca React
import Button from '@mui/material/Button';  // Importa o componente Button do Material-UI
import Stack from '@mui/material/Stack';    // Importa o componente Stack do Material-UI
import PropTypes from "prop-types";         // Importa PropTypes para validação de propriedades

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
export default function CustomButton({text, icon_component, bgcolor, text_color, font_family, font_weight, callback}) {
  
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

// Define os tipos de propriedades esperadas e se são obrigatórias
CustomButton.propTypes = {
  text: PropTypes.string.isRequired,      // text é obrigatório e deve ser uma string
  icon_component: PropTypes.elementType,  // icon_component deve ser um componente de ícone
  bgcolor: PropTypes.string,              // bgcolor deve ser uma string (representando uma cor)
  text_color: PropTypes.string,           // text_color deve ser uma string (representando uma cor)
  fontFamily: PropTypes.string,           // fontFamily deve ser uma string (representando a fonte)
  font_weight: PropTypes.string,          // font_weight deve ser uma string (representando o peso da fonte)
  callback: PropTypes.func,               // callback deve ser uma função
};

// Define valores padrão para as propriedades que não são obrigatórias
CustomButton.defaultProps = {
  icon_component: null,               // O ícone padrão é null (nenhum ícone)
  bgcolor: "#EBE5FC",                 // A cor de fundo padrão é roxo claro
  text_color: "#295478",              // A cor do texto padrão é azul escuro
  fontFamily: "Nunito, sans-serif",   // A fonte padrão é Nunito, seguida por fontes sans-serif genéricas
  font_weight: "normal",              // O peso da fonte padrão é normal
  callback: () => {},                 // A função padrão para onClick é uma função vazia
};