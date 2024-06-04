import { useState } from 'react';
import React from 'react'
import PageTitle from './components/pageTitle';
import SideMenu from './components/sideMenu'

import PersonIcon from '@mui/icons-material/Person';
import CustomButton from './components/customButton';



function App() {
  const [selectedMenuItem, setSelectedMenuItem] = useState('PERFIL')
  const handleMenuItemClick = (menuItem: string) => {
    setSelectedMenuItem(menuItem);
  };
  return (
    <div className="App">

      <CustomButton 
      text="Fazer Login" 
      icon_component={<PersonIcon/>} 
      bgcolor="#EBE5FC"
      text_color="#295478" 
      font_family="Nunito, sans-serif"
      font_weight="Bold"
      callback={() => alert('Button clicked!')}
      /> 

      <h1>Hello, world!</h1> 
      <PageTitle
        text='Histórico'
        color='black'
      />       

      <SideMenu 
        userName='Cláudia' 
        selectedMenuItem={selectedMenuItem}
        onMenuItemClick={handleMenuItemClick}
      />



    </div>
  );
}


export default App;
