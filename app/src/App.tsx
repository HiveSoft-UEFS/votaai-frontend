import React from 'react'
import Carousels from "./components/carousel";
import PageTitle from './components/pageTitle';
import SideMenu from './components/sideMenu'
import Footer from './components/footer'
function App() {
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
