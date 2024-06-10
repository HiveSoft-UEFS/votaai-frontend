import { useState } from 'react';
import React from 'react'
import PageTitle from './components/pageTitle';
import SideMenu from './components/sideMenu';
import Carousels from "./components/carousel";

function App() {
  const [selectedMenuItem, setSelectedMenuItem] = useState('PERFIL')
  const handleMenuItemClick = (menuItem: string) => {
    setSelectedMenuItem(menuItem);
  };
  return (
          <div>
              <h1>Meu Carrossel</h1>
              <Carousels/>
          </div>
  );
}


export default App;
