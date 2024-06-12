import React from 'react'
import Carousels from "./components/carousel";
import PageTitle from './components/pageTitle';
import SideMenu from './components/sideMenu'
function App() {
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
