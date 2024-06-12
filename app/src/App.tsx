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
      <PageTitle
        text='Histórico'
        color='black' />

      <SideMenu
        userName='Cláudia'
        selectedMenuItem={selectedMenuItem}
        onMenuItemClick={handleMenuItemClick} />

      <InfoCard
        title="Elaboração"
        description="Crie, gerencie, compartilhe enquetes com quem quiser, de forma online, segura e confiável."
        icon={<HowToVoteRoundedIcon style={{ fontSize: 50 }} />} //mudando icone e texto que se torna outros infocards
    />



    </div>
    <Footer /></>
    
  );
}


export default App;
