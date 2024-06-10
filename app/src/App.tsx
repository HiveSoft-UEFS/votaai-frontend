import { useState } from 'react';
import React from 'react'
import PageTitle from './components/pageTitle';
import SideMenu from './components/sideMenu'
import Footer from './components/footer'

function App() {
  const [selectedMenuItem, setSelectedMenuItem] = useState('PERFIL')
  const handleMenuItemClick = (menuItem: string) => {
    setSelectedMenuItem(menuItem);
  };
  return (
    <><div className="App">
      <h1>Hello, world!</h1>
      <PageTitle
        text='Histórico'
        color='black' />

      <SideMenu
        userName='Cláudia'
        selectedMenuItem={selectedMenuItem}
        onMenuItemClick={handleMenuItemClick} />

    </div>
    <Footer /></>
    
  );
}


export default App;
